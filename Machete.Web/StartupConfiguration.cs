using System.Linq;
using System.Reflection;
using Machete.Data;
using Machete.Web.Helpers.Api;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Machete.Web
{
    /// <summary>
    /// A class containing builder pattern extension methods for the IServiceCollection and IApplicationBuilder
    /// classes, which are 
    /// </summary>
    public static class StartupConfiguration
    {
        public static IWebHost CreateOrMigrateDatabase(this IWebHost webhost)
        {
            using (var scope = webhost.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<MacheteContext>();
                context.Database.Migrate();
                MacheteConfiguration.Seed(context, webhost.Services);
            }

            return webhost;
        }

        private static string GetControllerNames()
        {
            var controllerNames = Assembly.GetCallingAssembly()
                .GetTypes()
                .Where(x =>
                    x.IsSubclassOf(typeof(ControllerBase)) &&
                    x.FullName.StartsWith(MethodBase.GetCurrentMethod().DeclaringType.Namespace + ".Controllers"))
                .ToList()
                .Select(x => x.Name.Replace("Controller", ""));

            return string.Join("|", controllerNames);
        }
       
        public static void MapLegacyMvcRoutes(this IRouteBuilder routes)
        {
            routes.MapRoute(
                name: "default",
                template: "{controller=Account}/{action=Login}/{id?}");
            routes.MapRoute(
                name: "V2",
                template: "V2/{*url}",
                defaults: new { controller = "V2", action = "Index" }
            );
        }
        
        public static void MapApiRoutes(this IRouteBuilder routes)
        {
            var host = string.Empty;

            routes.MapRoute(
                name: "DefaultApi",
                template: "api/{controller}/{id?}", // id? == legacy RouteParameter.Optional
                defaults: new { controller = "Home" },
                constraints: new { controller = GetControllerNames() }
            );
            routes.MapRoute(
                name: "LoginApi",
                template: $"{host.IdentityRoute()}{{action}}",
                defaults: new { controller = "Identity" },
                constraints: new { action = "accounts" }
            );
            routes.MapRoute(
                name: "IdentityApi",
                template: $"{host.ConnectRoute()}{{action}}",
                defaults: new { controller = "Identity" }, // To disable routes, remove them from the following line.
                constraints: new { action = "authorize" }
            );
            routes.MapRoute(
                name: "WellKnownToken",
                template: $"{host.WellKnownRoute()}{{action}}",
                defaults: new { controller = "Identity" },
                constraints: new { action = "openid-configuration|jwks" }
            );
            routes.MapRoute(
                name: "NotFound",
                template: "{*path}",
                defaults: new { controller = "Error", action = "NotFound" }
            );
        }
    }
}
