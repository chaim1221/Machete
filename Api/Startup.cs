using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using Machete.Api.Identity;
using Machete.Api.Identity.Helpers;
using Machete.Api.Maps;
using Machete.Data;
using Machete.Data.Infrastructure;
using Machete.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private SecurityKey _signingKey;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            using (RSA rsa = RSA.Create()) {
                rsa.KeySize = 4096;                
                _signingKey = new RsaSecurityKey(rsa);
            }
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // JWT: https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Startup.cs
        public void ConfigureServices(IServiceCollection services)
        {
            var connString = Configuration.GetConnectionString("DefaultConnection");
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
            var credentials = new SigningCredentials(_signingKey, SecurityAlgorithms.RsaSha256); // mmacneil was HS256
            
            services.AddDbContext<MacheteContext>(builder => {
                builder
                    .UseLazyLoadingProxies()
                    .UseSqlServer(connString, with =>
                        with.MigrationsAssembly("Machete.Data"));
            });
            
            services.AddSingleton<IJwtFactory, JwtFactory>();

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = credentials;
            });
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
            
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions => {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });
            
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy =>
                    policy.RequireClaim("role", "api_access"));
            });
            
            services.AddIdentity<MacheteUser, IdentityRole>()
                .AddEntityFrameworkStores<MacheteContext>()
                .AddDefaultTokenProviders();
            
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings TODO uncomment
//                options.Password.RequireDigit = true;
//                options.Password.RequiredLength = 8;
//                options.Password.RequireNonAlphanumeric = false;
//                options.Password.RequireUppercase = true;
//                options.Password.RequireLowercase = false;
//                options.Password.RequiredUniqueChars = 6;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            });
            
            services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder => {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); // TODO
                })
            );
            
            var mapperConfig = new ApiMapperConfiguration().Config;
            var mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            
            services.AddDistributedMemoryCache();
            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromSeconds(10); // TODO
                options.Cookie.HttpOnly = true; // prevent JavaScript access
            });
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            
            services.AddScoped<IDatabaseFactory, DatabaseFactory>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            
            services.AddScoped<IConfigRepository, ConfigRepository>();
            
            services.AddScoped<IConfigService, ConfigService>();
            
            services.AddScoped<JwtIssuerOptions>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            
            app.UseCors("AllowAllOrigins"); // TODO

            app.UseHttpsRedirection(); // also TODO
            app.UseAuthentication();
            
            var fileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Identity", @"React"));
            var requestPath = new PathString("/id/login");
            app.UseDefaultFiles(new DefaultFilesOptions {
                FileProvider = fileProvider,
                RequestPath = requestPath,
                DefaultFileNames = new[] { "index.html" }
            });
            app.UseStaticFiles(new StaticFileOptions {
                FileProvider = fileProvider,
                RequestPath = requestPath
            });
            app.UseDefaultFiles();
            app.UseStaticFiles(); // wwwroot
            
            app.UseCookiePolicy();
            app.UseSession();
            
            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "DefaultApi",
                    template: "api/{controller}/{id?}", // id? == legacy RouteParameter.Optional
                    defaults: new { controller = "Home" },
                    constraints: new { controller = GetControllerNames() }
                );
                routes.MapRoute(
                    name: "LoginApi",
                    template: "id/{action}",
                    defaults: new { controller = "Identity" },
                    constraints: new { action = "accounts"}
                );
                routes.MapRoute(
                    name: "IdentityApi",
                    template: "id/connect/{action}",
                    defaults: new { controller = "Identity" },
                    constraints: new { action = "authorize|token|userinfo|discovery|logout|revocation|introspection|accesstokenvalidation|identitytokenvalidation" }
                );
                routes.MapRoute(
                    name: "WellKnownToken",
                    template: "id/.well-known/{action}",
                    defaults: new { controller = "Identity" },
                    constraints: new { action = "openid-configuration|jwks" }
                );
                routes.MapRoute(
                    name: "NotFound",
                    template: "{*path}",
                    defaults: new { controller = "Error", action = "NotFound" }
                );
            });
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
    }
}
