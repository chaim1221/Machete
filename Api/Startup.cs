using System;
using System.Linq;
using System.Reflection;
using System.Text;
using Machete.Api.Identity;
using Machete.Api.Identity.Helpers;
using Machete.Api.Maps;
using Machete.Data;
using Machete.Data.Infrastructure;
using Machete.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Machete.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
        public static string SecretKey = "7XbQdx9DceB8wjtNqa8dHkc4rbnTPsqg"; // just a silly value for development

        // This method gets called by the runtime. Use this method to add services to the container.
        // JWT: https://github.com/mmacneil/AngularASPNETCore2WebApiAuth/blob/master/src/Startup.cs
        public void ConfigureServices(IServiceCollection services)
        {
            var connString = Configuration.GetConnectionString("DefaultConnection");
            
            services.AddDbContext<MacheteContext>(builder => {
                builder
                    .UseLazyLoadingProxies()
                    .UseSqlServer(connString, with =>
                        with.MigrationsAssembly("Machete.Data"));
            });
            
            services.AddSingleton<IJwtFactory, JwtFactory>();
            
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
            
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
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
                    policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Role, Constants.Strings.JwtClaims.ApiAccess));
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
            //app.UseDefaultFiles(); //?
            app.UseStaticFiles();
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
