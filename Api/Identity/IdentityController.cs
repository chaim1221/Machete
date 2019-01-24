using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AutoMapper;
using Machete.Api.Identity.Helpers;
using Machete.Api.Identity.ViewModels;
using Machete.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Machete.Api.
    Identity // Not part of Controllers namespace; we don't want default route requests to end up here 
{
    // https://fullstackmark.com/post/13/jwt-authentication-with-aspnet-core-2-web-api-angular-5-net-core-identity-and-facebook-login
    // https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Controllers/AccountsController.cs
    // https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Controllers/AuthController.cs
    [Route("id")]
    public class IdentityController : Controller
    {
        private readonly UserManager<MacheteUser> _userManager;
        private readonly IMapper _mapper;

        private readonly IJwtFactory _jwtFactory;
        //private readonly JwtIssuerOptions _jwtOptions;

        public IdentityController(
            UserManager<MacheteUser> userManager,
            IMapper mapper,
            IJwtFactory jwtFactory //,
            //JwtIssuerOptions jwtOptions
        )
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtFactory = jwtFactory;
            //_jwtOptions = jwtOptions;
        }

        // POST id/accounts
        [HttpPost("accounts")] // TODO determine if we want to handle account creation this way
        public async Task<IActionResult> Accounts([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userIdentity = _mapper.Map<RegistrationViewModel, MacheteUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            // This doesn't make any sense to me, it's already created the user above, and this just errors out.
//            await _appDbContext.Users.AddAsync(new MacheteUser { Id = userIdentity.Id });
//            await _appDbContext.SaveChangesAsync();

            return new JsonResult("Account created");
        }

        [HttpPost("login")]
        public async Task<IActionResult>
            Login(string signin, [FromBody] CredentialsViewModel creds) // "signin" is from IS3, TODO
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var identity = await GetClaimsIdentity(creds.UserName, creds.Password); // IS3: "Username" (should be fine)

            if (identity == null)
                return BadRequest(
                    Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState)
                );

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, creds.UserName,
                _jwtFactory.JwtOptions, // _jwtOptions, // bug?
                new JsonSerializerSettings {Formatting = Formatting.Indented});

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

        //https://github.com/IdentityServer/IdentityServer3/blob/master/source/Core/Endpoints/Connect/DiscoveryEndpointController.cs
        [HttpGet]
        [Route(".well-known/openid-configuration")]
        public async Task<IActionResult> OpenIdConfiguration()
        {
            // These are brittle. A better way to do this would be to have a static class that both the configuration
            // and this endpoint utilize.

            var pathBase = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            var root = $"{pathBase}/id";
            var wellKnown = $"{root}/.well-known";
            var connect = $"{root}/connect";

            var viewModel = new WellKnownViewModel();
            viewModel.issuer = root;
            viewModel.jwks_uri = $"{wellKnown}/jwks";
            viewModel.authorization_endpoint = $"{connect}/authorize";
            viewModel.token_endpoint = $"{connect}/token";
            viewModel.userinfo_endpoint = $"{connect}/userinfo";
            viewModel.end_session_endpoint = $"{connect}/endsession";
            viewModel.check_session_iframe = $"{connect}/checksession";
            viewModel.revocation_endpoint = $"{connect}/revocation";
            viewModel.introspection_endpoint = $"{connect}/introspection";
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
        [HttpGet]
        [Route(".well-known/jwks")]
        public async Task<IActionResult> JsonWebKeySet()
        {
            JwksViewModel webKey = new JwksViewModel();
            var key = _jwtFactory.JwtOptions.SigningCredentials.Key;

            // this should not work
//            if (key is X509SecurityKey x509Key) {
//                var cert64 = Convert.ToBase64String(x509Key.Certificate.RawData);
//                var thumbprint = Base64UrlEncoder.Encode(x509Key.Certificate.GetCertHash());
//
//                var pubKey = x509Key.PublicKey as RSA;
//                var parameters = pubKey.ExportParameters(false);
//                var exponent = Base64UrlEncoder.Encode(parameters.Exponent);
//                var modulus = Base64UrlEncoder.Encode(parameters.Modulus);
//
//                webKey = new JwksViewModel {
//                    kty = "RSA",
//                    use = "sig",
//                    kid = x509Key.KeyId,
//                    x5t = thumbprint,
//                    e = exponent,
//                    n = modulus,
//                    x5c = new List<string> { cert64 },
////                    alg = algorithm
//                };
//            }

//            // test, not used
//            if (key is SymmetricSecurityKey symm) {
//                webKey = null;
//            }

            // this should work
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

//            if (key is JsonWebKey jsonWebKey) {
//                webKey = new JwksViewModel {
//                    kty = jsonWebKey.Kty,
//                    use = jsonWebKey.Use ?? "sig",
//                    kid = jsonWebKey.Kid,
//                    x5t = jsonWebKey.X5t,
//                    e = jsonWebKey.E,
//                    n = jsonWebKey.N,
//                    x5c = jsonWebKey.X5c?.Count == 0 ? null : jsonWebKey.X5c.ToList(),
////                    alg = jsonWebKey.Alg
//                };
//            }

            return await Task.FromResult(new JsonResult(new {
                    keys = new List<JwksViewModel> { webKey }
                })
            );
        }
    }
}
