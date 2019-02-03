using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Machete.Api.Identity;
using Machete.Api.Identity.Helpers;
using Machete.Api.Identity.ViewModels;
using Machete.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Machete.Web.Controllers.Api.Identity
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
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly List<IdentityRole> _roles;

        public IdentityController(
            UserManager<MacheteUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IMapper mapper,
            IJwtFactory jwtFactory,
            IOptions<JwtIssuerOptions> jwtOptions
        )
        {
            ThrowIfInvalidOptions(jwtOptions.Value);
            
            _userManager = userManager;
            _roles = roleManager.Roles.ToList();
            _mapper = mapper;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
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

        [HttpPost("login")] // "signin" is from IS3, TODO see if we can remove this param
        public async Task<IActionResult> Login(string signin, [FromBody] CredentialsViewModel creds)
        {
            // Validation logic
            if (!ValidateLogin(creds)) return BadRequest(ModelState);
            var userToVerify = await _userManager.FindByNameAsync(creds.UserName);
            if (userToVerify == null)
            {
                ModelState.TryAddModelError("invalid_request", "Could not find user.");
                return BadRequest(ModelState);
            }
            if (!await _userManager.CheckPasswordAsync(userToVerify, creds.Password))
            {
                ModelState.TryAddModelError("invalid_request", "Invalid username or password.");
                return BadRequest(ModelState);
            }

            // Token issuance
            foreach (var role in _roles) // TODO to complain to the EF Core crew; this is a hack because Roles was empty
            {
                var isInRole = await _userManager.IsInRoleAsync(userToVerify, role.Name);
                if (isInRole) userToVerify.Roles.Add(role);
            }
            _jwtOptions.Issuer = Routes.GetHostFrom(Request).IdentityRoute();
            _jwtOptions.Nonce = creds.Nonce;
            var claimsIdentity = await _jwtFactory.GenerateClaimsIdentity(userToVerify, _jwtOptions);
            var jwt = await _jwtFactory.GenerateEncodedToken(claimsIdentity, _jwtOptions);
            if (creds.Remember)
            {
                // TODO: remember them fondly?
            }
            return new OkObjectResult(jwt);
        }

        private bool ValidateLogin(CredentialsViewModel creds)
        {
            if (!ModelState.IsValid)
                ModelState.TryAddModelError("invalid_request", "Invalid request.");
            if (string.IsNullOrEmpty(creds.UserName) || string.IsNullOrEmpty(creds.Password))
                ModelState.TryAddModelError("login_failure", "Invalid username or password.");
            if (!string.Equals(creds.ClientId, _jwtOptions.Audience))
                ModelState.TryAddModelError("environment_mismatch", "Could not verify audience.");
            if (!Guid.TryParse(creds.Nonce, out var unused))
                ModelState.TryAddModelError("invalid_request", "Could not verify nonce.");
            return ModelState.ErrorCount == 0;
        }

        [HttpGet]
        [Route(".well-known/openid-configuration")]
        public async Task<IActionResult> OpenIdConfiguration()
        {
            var host = Routes.GetHostFrom(Request);

            var viewModel = new WellKnownViewModel();
            viewModel.issuer = host.IdentityRoute();
            viewModel.jwks_uri = host.JsonWebKeySetEndpoint();
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
            var key = _jwtOptions.SigningCredentials.Key;

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
        
        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= 0) {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null) {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null) {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }
    }
}
