using System;
using System.Threading.Tasks;
using AutoMapper;
using Machete.Data;
using Machete.Web.Helpers.Api;
using Machete.Web.ViewModel.Api.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
        private readonly SignInManager<MacheteUser> _signinManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;

        public IdentityController(UserManager<MacheteUser> userManager,
            SignInManager<MacheteUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IMapper mapper
        )
        {
            _userManager = userManager;
            _signinManager = signInManager;
            _roleManager = roleManager;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Route("authorize")]
        public async Task<IActionResult> Authorize([FromQuery(Name = "redirect_uri")] string redirectUri)
        {
            if (User.Identity.IsAuthenticated) // move along
                return await Task.FromResult<IActionResult>(
                    new OkObjectResult(new { data = redirectUri })
                );            
            // no dice
            return await Task.FromResult(new UnauthorizedResult());
        }

        // POST id/accounts
        [HttpPost("accounts")] // TODO remove; for testing only
        public async Task<IActionResult> Accounts([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userIdentity = _mapper.Map<RegistrationViewModel, MacheteUser>(model);
            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            return new JsonResult("Account created");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] CredentialsViewModel model)
        {
            // Validation logic
            if (!ValidateLogin(model)) return BadRequest(ModelState);

            var result = await _signinManager.PasswordSignInAsync(model.UserName, model.Password, model.Remember, false);

            if (result?.Succeeded != true)
            {
                ModelState.TryAddModelError("login_failure", "Invalid username or password.");
                return BadRequest(ModelState);
            }

            // just trying to login
            var v2AuthEndpoint = Routes.GetHostFrom(Request).V2AuthorizationEndpoint();
            if (model.Redirect == v2AuthEndpoint) return await Task.FromResult(new OkObjectResult(model.Redirect));

            // trying to hit another page and need to go back there; Angular will handle that
            var redirectUri = $"{v2AuthEndpoint}?redirect_url={model.Redirect}";
            return await Task.FromResult(new OkObjectResult(redirectUri));
        }

        private bool ValidateLogin(CredentialsViewModel creds)
        {
            if (!ModelState.IsValid)
                ModelState.TryAddModelError("invalid_request", "Invalid request.");
            if (string.IsNullOrEmpty(creds.UserName) || string.IsNullOrEmpty(creds.Password))
                ModelState.TryAddModelError("login_failure", "Invalid username or password.");
            return ModelState.ErrorCount == 0;
        }
        
        // GET: /id/logoff
        [AllowAnonymous]
        [HttpGet]
        [Route("logoff")]
        public async Task<IActionResult> LogOff()
        {
            await _signinManager.SignOutAsync();
            return await Task.FromResult<IActionResult>(
                new OkObjectResult(new { data = Routes.GetHostFrom(Request).V2AuthorizationEndpoint() })
            );
        }
    }
}
