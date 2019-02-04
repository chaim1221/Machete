using System;
using Microsoft.AspNetCore.Http;

namespace Machete.Web.Helpers.Api
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
        public static string GetHostFrom(HttpRequest Request) => $"{Request.Scheme}://{Request.Host}{Request.PathBase}/";
        public static string IdentityRoute(this string host) => $"{host}id/";
        public static string ConnectRoute(this string host) => $"{host.IdentityRoute()}connect/";
        public static string V2Route(this string host) => $"{host}V2/";
        public static string WellKnownRoute(this string host) => $"{host.IdentityRoute()}.well-known/";
        public static string LoginEndpoint(this string host) => $"{host.IdentityRoute()}login";
        public static string V2AuthorizationEndpoint(this string host) => $"{host.V2Route()}authorize";
    }
}