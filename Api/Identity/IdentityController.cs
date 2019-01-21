using System.Threading.Tasks;
using AutoMapper;
using Machete.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Machete.Api.Identity // Not part of Controllers namespace; we don't want default route requests to end up here 
{
    // https://fullstackmark.com/post/13/jwt-authentication-with-aspnet-core-2-web-api-angular-5-net-core-identity-and-facebook-login
    // https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Controllers/AccountsController.cs
    [Route("id")]
    public class IdentityController : Controller
    {
        private readonly MacheteContext _appDbContext;
        private readonly UserManager<MacheteUser> _userManager;
        private readonly IMapper _mapper;
            
        public IdentityController(UserManager<MacheteUser> userManager, IMapper mapper, MacheteContext appDbContext)
        {
            _appDbContext = appDbContext;
            _userManager = userManager;
            _mapper = mapper;
        }
        
        // POST id/accounts
        [HttpPost("accounts")]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<RegistrationViewModel, MacheteUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            // This doesn't make any sense to me, it's already created the user above, and this just errors out.
//            await _appDbContext.Users.AddAsync(new MacheteUser { Id = userIdentity.Id });
//            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }
    }    
}
