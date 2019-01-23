using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Machete.Api.Identity.Helpers {
    public static class Tokens {
        public static async Task<object> GenerateJwt(ClaimsIdentity identity,
            IJwtFactory jwtFactory,
            string userName,
            JwtIssuerOptions jwtOptions,
            JsonSerializerSettings jsonSerializerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            return JsonConvert.SerializeObject(response, jsonSerializerSettings);
        }
    }
}