using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Machete.Api.Identity
{
    [Route("id/connect")]
    public class AuthorizationController : Controller
    {
        public AuthorizationController() { }

        [HttpGet]
        [Route("authorize")]
        public async Task<IActionResult> GetAuthorize(
            [FromQuery(Name = "client_id")]
            string clientId,
            
            [FromQuery(Name = "redirect_uri")]
            string redirectUri,
            
            [FromQuery(Name = "response_type")]
            string responseType,
            
            [FromQuery(Name = "scope")]
            string scope,
            
            [FromQuery(Name = "state")]
            string state,
            
            [FromQuery(Name = "nonce")]
            string nonce
        )
        {
            // TODO: DRY
            var pathBase = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            var root = $"{pathBase}/id";
            var login = $"{root}/login";
            
            // IS3 cached these and provided a cookie equal to the GUID of the authorization request. We pass them on.
            var builder = new StringBuilder();
            builder.Append(login);
            builder.Append($"&client_id={clientId}");
            builder.Append($"&redirect_uri={redirectUri}");
            builder.Append($"&response_type={responseType}");
            builder.Append($"&scope={scope}");
            builder.Append($"&state={state}");
            builder.Append($"&nonce={nonce}");
            
            return await Task.FromResult(new RedirectResult(builder.ToString()));
        }
    }
}
