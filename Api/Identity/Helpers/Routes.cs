using Microsoft.AspNetCore.Http;

namespace Machete.Api.Identity.Helpers
{
    public static class Routes
    {
        public static string GetHostFrom(HttpRequest Request)
        {
            return $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
        }
        
        public static string Identity(this string host) => $"{host}/id";
        public static string WellKnownRoute(this string host) => $"{host.Identity()}/.well-known";
        public static string WellKnownConfiguration(this string host) => $"{host.WellKnownRoute()}/openid-configuration";
        public static string JsonWebKeySet(this string host) => $"{host.WellKnownRoute()}/jwks";
        public static string ConnectRoute(this string host) => $"{host.Identity()}/connect";
        public static string AuthorizationEndpoint(this string host) => $"{host.ConnectRoute()}/authorize";
        public static string TokenEndpoint(this string host) => $"{host.ConnectRoute()}/token";
        public static string UserInfoEndpoint(this string host) => $"{host.ConnectRoute()}/userinfo";
        public static string EndSessionEndpoint(this string host) => $"{host.ConnectRoute()}/endsession";
        public static string CheckSessionEndpoint(this string host) => $"{host.ConnectRoute()}/checksession";
        public static string RevocationEndpoint(this string host) => $"{host.ConnectRoute()}/revocation";
        public static string IntrospectionEndpoint(this string host) => $"{host.ConnectRoute()}/introspection";
    }
}