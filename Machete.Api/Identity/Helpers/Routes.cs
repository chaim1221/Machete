using System;
using Microsoft.AspNetCore.Http;

namespace Machete.Api.Identity.Helpers
{
    /// <summary>
    /// A static class containing the route values, capable of determining the hostname from a request.
    /// Trailing slashes are in base values for concatenation so that they can be used in pipeline declaration.
    /// Routes themselves can be obtained by passing an empty string. Routes end in a trailing slash. Endpoints do not.
    /// </summary>
    /// <exception cref="NullReferenceException">
    /// Methods will throw this exception if "null" is passed as `host` instead of string.Empty. This is rare.
    /// </exception>
    public static class Routes
    {
        public static string GetHostFrom(HttpRequest Request)
        {
            return $"{Request.Scheme}://{Request.Host}{Request.PathBase}/";
        }

        public static string ApiRoute(this string host) => $"{host}api/";
        public static string IdentityRoute(this string host) => $"{host}id/";
        public static string ConnectRoute(this string host) => $"{host.IdentityRoute()}connect/";
        public static string WellKnownRoute(this string host) => $"{host.IdentityRoute()}.well-known/";
        public static string WellKnownConfigurationEndpoint(this string host) => $"{host.WellKnownRoute()}openid-configuration";
        public static string JsonWebKeySetEndpoint(this string host) => $"{host.WellKnownRoute()}jwks";
        public static string AuthorizationEndpoint(this string host) => $"{host.ConnectRoute()}authorize";
        public static string TokenEndpoint(this string host) => $"{host.ConnectRoute()}token";
        public static string UserInfoEndpoint(this string host) => $"{host.ConnectRoute()}userinfo";
        public static string EndSessionEndpoint(this string host) => $"{host.ConnectRoute()}endsession";
        public static string CheckSessionEndpoint(this string host) => $"{host.ConnectRoute()}checksession";
        public static string RevocationEndpoint(this string host) => $"{host.ConnectRoute()}revocation";
        public static string IntrospectionEndpoint(this string host) => $"{host.ConnectRoute()}introspection";
    }
}