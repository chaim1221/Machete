using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Machete.Api.Identity.Helpers;
using Machete.Api.Identity.ViewModels;
using Machete.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Machete.Api.Identity // Not part of Controllers namespace; we don't want default route requests to end up here 
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
        private readonly JwtIssuerOptions _jwtOptions;

        public IdentityController(
            UserManager<MacheteUser> userManager,
            IMapper mapper,
            IJwtFactory jwtFactory,
            JwtIssuerOptions jwtOptions
        )
        {
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions;
            _userManager = userManager;
            _mapper = mapper;
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

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, creds.UserName, _jwtOptions,
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
        [HttpGet(".well-known/openid-configuration")]
        private async Task<ActionResult> GetConfiguration()
        {
            return null;
        }
}
}
