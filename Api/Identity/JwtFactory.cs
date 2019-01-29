using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Machete.Api.Identity.Helpers;
using Machete.Api.Identity.ViewModels;
using Machete.Service;
using Microsoft.Extensions.Options;

namespace Machete.Api.Identity
{
    // https://fullstackmark.com/post/13/jwt-authentication-with-aspnet-core-2-web-api-angular-5-net-core-identity-and-facebook-login
    // https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/tree/master/src/Auth (MIT)
    public interface IJwtFactory
    {
        JwtIssuerOptions JwtOptions { get; set; }
        Task<string> GenerateEncodedToken(string host, CredentialsViewModel creds, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
    }

    public class JwtFactory : IJwtFactory
    {
        public JwtFactory(IOptions<JwtIssuerOptions> jwtOptions)
        {
            JwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(JwtOptions);
        }

        public JwtIssuerOptions JwtOptions { get; set; }

        public async Task<string> GenerateEncodedToken(string host, CredentialsViewModel creds, ClaimsIdentity identity)
        {
            if (!string.Equals(creds.ClientId, JwtOptions.Audience))
                throw new MacheteValidationException("Could not verify audience. Potential environment/build mismatch.");
            if (!Guid.TryParse(creds.Nonce, out var unused))
                throw new MacheteValidationException("Could not verify nonce. Potential injection risk.");

            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Iss, host.Identity()),
                new Claim(JwtRegisteredClaimNames.Aud, JwtOptions.Audience),
                new Claim(JwtRegisteredClaimNames.Exp, UnixEpochDateFor(JwtOptions.Expiration)),
                new Claim(JwtRegisteredClaimNames.Nbf, UnixEpochDateFor(JwtOptions.NotBefore)),
                new Claim(JwtRegisteredClaimNames.Nonce, creds.Nonce), 
                new Claim(JwtRegisteredClaimNames.Jti, await JwtOptions.JtiGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, UnixEpochDateFor(JwtOptions.IssuedAt)),
                //new Claim(JwtRegisteredClaimNames.AtHash, ???),
                //new Claim(JwtRegisteredClaimNames.Sid, ???), 
                new Claim(JwtRegisteredClaimNames.Sub, identity.Claims.Single(c => c.Type == "id").Value),
                new Claim(JwtRegisteredClaimNames.AuthTime, UnixEpochDateFor(JwtOptions.IssuedAt))
            };
            claims.AddRange(identity.FindAll("role"));
            claims.Add(new Claim(JwtRegisteredClaimNames.Amr, "password"));

            // Create the JWT security token and encode it. You can add individual claims here, but that's confusing;
            // we just created all the claims that should be in the token, above.
            var jwt = new JwtSecurityToken(
                claims: claims,
                signingCredentials: JwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        public ClaimsIdentity GenerateClaimsIdentity(string userName, string id)
        {
            return new ClaimsIdentity(new GenericIdentity(userName, "Token"), new[] {
                new Claim("id", id),
                new Claim("role", "api_access")
            });
        }
        
        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static string UnixEpochDateFor(DateTime date)
            => ((long) Math.Round((date.ToUniversalTime() -
                                  new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                .TotalSeconds)).ToString(CultureInfo.InvariantCulture);

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
