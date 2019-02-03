using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using Machete.Api.Identity;
using Machete.Api.Identity.Helpers;
using Machete.Data;
using Machete.Data.Infrastructure;
using Machete.Data.Repositories;
using Machete.Service;
using Machete.Web.Helpers;
using Machete.Web.Maps;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

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

        // JWT: https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Startup.cs
        public static void JwtCrapToDelete(this IServiceCollection services,
            IConfiguration configuration, SecurityKey signingKey)
        {
            var jwtAppSettingOptions = configuration.GetSection(nameof(JwtIssuerOptions));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.RsaSha256); // mmacneil was HS256

            services.AddSingleton<IJwtFactory, JwtFactory>();

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = credentials;
            });

            services.AddScoped<JwtIssuerOptions>();
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
                constraints: new
                {
                    action =
                        "authorize|token|userinfo|discovery|logout|revocation|introspection|accesstokenvalidation|identitytokenvalidation"
                }
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
