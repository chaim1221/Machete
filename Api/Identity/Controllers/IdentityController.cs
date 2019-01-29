using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Machete.Api.Identity.Helpers;
using Machete.Api.Identity.ViewModels;
using Machete.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Machete.Api.Identity
{
    #region [Summary]
    ///<summary>
    /// 
    /// This controller exists outside the Machete.Api.Controllers because it serves a different purpose and because the
    /// routes are defined separately. Its fields and dependencies were created to replicate the functionality of
    /// IdentityServer3 without having to modify the https://github.com/SavageLearning/machete-ui project beyond port
    /// mappings and domain names. As such, the namespace division exists to call out that this could be (and once was)
    /// a separate project.
    ///
    /// Sources used:
    /// https://fullstackmark.com/post/13/jwt-authentication-with-aspnet-core-2-web-api-angular-5-net-core-identity-and-facebook-login
    /// https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Controllers/AccountsController.cs (MIT)
    /// https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Controllers/AuthController.cs (MIT)
    /// https://github.com/IdentityServer/IdentityServer3 (Apache-2.0)
    /// https://github.com/IdentityServer/IdentityServer4 (Apache-2.0)
    /// 
    /// </summary>
    #endregion [Summary]
    [Route("id")]
    public class IdentityController : Controller
    {
        private readonly UserManager<MacheteUser> _userManager;
        private readonly IMapper _mapper;

        private readonly IJwtFactory _jwtFactory;

        public IdentityController(
            UserManager<MacheteUser> userManager,
            IMapper mapper,
            IJwtFactory jwtFactory
        )
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtFactory = jwtFactory;
        }

        // POST id/accounts
        [HttpPost("accounts")] // TODO determine if we want to handle account creation this way
        public async Task<IActionResult> Accounts([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userIdentity = _mapper.Map<RegistrationViewModel, MacheteUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            return new JsonResult("Account created");
        }

        [HttpPost("login")]                       // "signin" is from IS3, TODO see if we can remove this param
        public async Task<IActionResult> Login(string signin, [FromBody]CredentialsViewModel creds)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var identity = await GetClaimsIdentity(creds.UserName, creds.Password);

            if (identity == null)
                return BadRequest(
                    Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState)
                );

            var host = Routes.GetHostFrom(Request);
            var jwt = await _jwtFactory.GenerateEncodedToken(host, creds, identity);

            if (creds.Remember) {
                // remember them fondly?
            }

            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verify
            var userToVerify = await _userManager.FindByNameAsync(username);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password)) {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(username, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
       
        [HttpGet]
        [Route(".well-known/openid-configuration")]
        public async Task<IActionResult> OpenIdConfiguration()
        {
            var host = Routes.GetHostFrom(Request);

            var viewModel = new WellKnownViewModel();
            viewModel.issuer = host.Identity();
            viewModel.jwks_uri = host.JsonWebKeySet();
            viewModel.authorization_endpoint = host.AuthorizationEndpoint();
            viewModel.token_endpoint = host.TokenEndpoint();
            viewModel.userinfo_endpoint = host.UserInfoEndpoint();
            viewModel.end_session_endpoint = host.EndSessionEndpoint();
            viewModel.check_session_iframe = host.CheckSessionEndpoint();
            viewModel.revocation_endpoint = host.RevocationEndpoint();
            viewModel.introspection_endpoint = host.IntrospectionEndpoint();
            viewModel.frontchannel_logout_supported = true;
            viewModel.frontchannel_logout_session_supported = true;
            viewModel.scopes_supported =
                new List<string> {"openid", "profile", "email", "roles", "offline_access", "api"};
            viewModel.claims_supported =
                new List<string> {
                    "sub", "name", "family_name", "given_name", "middle_name", "nickname",
                    "preferred_username", "profile", "picture", "website", "gender", "birthdate",
                    "zoneinfo", "locale", "updated_at", "email", "email_verified", "role"
                };
            viewModel.response_types_supported =
                new List<string> {
                    "code", "token", "id_token", "id_token token", "code id_token", "code token",
                    "code id_token token"
                };
            viewModel.response_modes_supported = new List<string> {"form_post", "query", "fragment"};
            viewModel.grant_types_supported =
                new List<string> {"authorization_code", "client_credentials", "password", "refresh_token", "implicit"};
            viewModel.subject_types_supported = new List<string> {"public"};
            viewModel.id_token_signing_alg_values_supported = new List<string> {"RS256"};
            viewModel.code_challenge_methods_supported = new List<string> {"plain", "S256"};
            viewModel.token_endpoint_auth_methods_supported =
                new List<string> {"client_secret_post", "client_secret_basic"};

            return await Task.FromResult(new JsonResult(viewModel));
        }

        // Surprisingly little documentation exists on how to make one of these
        // https://github.com/IdentityServer/IdentityServer4/blob/63a50d7838af25896fbf836ea4e4f37b5e179cd8/src/ResponseHandling/Default/DiscoveryResponseGenerator.cs
        [HttpGet]
        [Route(".well-known/jwks")]
        public async Task<IActionResult> JsonWebKeySet()
        {
            JwksViewModel webKey = new JwksViewModel();
            var key = _jwtFactory.JwtOptions.SigningCredentials.Key;

            if (key is RsaSecurityKey rsaKey) {
                var parameters = rsaKey.Rsa?.ExportParameters(false) ?? rsaKey.Parameters;
                var exponent = Base64UrlEncoder.Encode(parameters.Exponent);
                var modulus = Base64UrlEncoder.Encode(parameters.Modulus);

                webKey = new JwksViewModel {
                    kty = "RSA",
                    use = "sig",
                    kid = rsaKey.KeyId,
                    e = exponent,
                    n = modulus,
//                    alg = algorithm
                };
            }

            return await Task.FromResult(new JsonResult(new {
                    keys = new List<JwksViewModel> { webKey }
                })
            );
        }
    }
}
