using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
//using Machete.Api.Identity;
//using Machete.Api.Identity.Helpers;
//using Machete.Api.Maps;
using Machete.Data;
using Machete.Data.Infrastructure;
using Machete.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

namespace Machete.Api
{
    /// <summary>
    /// Configuration class for an API that serves information about Machete clients and jobs.
    /// Pipelines: API, static pages, Identity using JWT and RSA
    /// https://piotrgankiewicz.com/2017/07/24/jwt-rsa-hmac-asp-net-core/
    /// </summary>
    public class Startup
    {
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseMvc(routes => { MapApiRoutes(routes, host); });
        }

    }
    
    static class StaticConfiguration {
        public static string GetControllerNames()
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
    }
}
