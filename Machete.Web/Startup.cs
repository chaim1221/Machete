using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using Machete.Data;
using Machete.Data.Infrastructure;
using Machete.Data.Repositories;
using Machete.Service;
using Machete.Web.Helpers;
using Machete.Web.Maps;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace Machete.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // ReSharper disable once MemberCanBePrivate.Global
        public IConfiguration Configuration { get; }

        // This method is for the FluentRecordBase test harness.
        public void ConfigureServicesMock(IServiceCollection services)
        {
            services.ConfigureMvcServices(Configuration);
        }
        
        // This method gets called by the runtime.
        public void ConfigureServices(IServiceCollection services)
        {
//            services.ConfigureMvcServices(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder builder, IHostingEnvironment env)
        {
//            builder.Map(StaticConfiguration.RootPath, mvc => { mvc.ConfigureMvcBuilder(env); });
            builder.CreateServiceBranch(StaticConfiguration.RootPath,
                services => { services.ConfigureMvcServices(Configuration); },
                app => { app.ConfigureMvcBuilder(env); }
            );
        }
    }
    
    /// <summary>
    /// A shim to help facilitate running multiple pipelines. Required by StaticConfiguration.
    /// </summary>
    public sealed class StartupHarness
    {
        public void ConfigureServices(IServiceCollection services) { }
        public void Configure(IApplicationBuilder app) { }
    }

    static class StaticConfiguration
    {
        public static PathString RootPath = PathString.Empty;
        public static void ConfigureMvcBuilder(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization?view=aspnetcore-2.2 (Ibid.)
            var supportedCultures = new[]
            {
                // Ibid. #globalization-and-localization-terms
                // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
                // https://en.wikipedia.org/wiki/ISO_3166-1
                new CultureInfo("en-US"),
                new CultureInfo("es-US"),
                // we use es-US because we are not fully equipped to support international dates.
            };
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("en-US"),
                // Formatting numbers, dates, etc.
                SupportedCultures = supportedCultures,
                // UI strings that we have localized.
                SupportedUICultures = supportedCultures
            });
            // the preceding will attempt to guess the user's culture. For several reasons that's not what we want.
            // Ibid. #set-the-culture-programmatically

            app.UseCors("AllowAllOrigins"); // TODO

            app.UseHttpsRedirection();

            //app.UseStaticFiles(); // ?
            app.UseStaticFiles("/Content");
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Content")),
                RequestPath = "/Content"
            });

            app.UseCookiePolicy();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Account}/{action=Login}/{id?}");
                routes.MapRoute(
                    name: "V2",
                    template: "V2/{*url}",
                    defaults: new {controller = "V2", action = "Index"}
                );
            });

            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Content")),
                RequestPath = "/Content"
            });

            app.UseMvcWithDefaultRoute();
        }
        
        public static void ConfigureMvcServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connString = configuration.GetConnectionString("DefaultConnection");

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme) //;
                .AddCookie(options =>
                    options.LoginPath = "/Account/Login"
                );

            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization?view=aspnetcore-2.2#configure-localization
            services.AddLocalization(options => options.ResourcesPath = "Resources");

            services.AddDbContext<MacheteContext>(builder =>
            {
                builder
                    .UseLazyLoadingProxies()
                    .UseSqlServer(connString, with =>
                        with.MigrationsAssembly("Machete.Data"));
            });

            services.AddIdentity<MacheteUser, IdentityRole>()
                .AddEntityFrameworkStores<MacheteContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings; we are relying on validation
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

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.Cookie.Expiration = TimeSpan.FromDays(150);
                // these paths are the default, declared explicitly
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
            });

            services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); // TODO
                })
            );

            var mapperConfig = new MvcMapperConfiguration().Config;
            var mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddMvc( /*config => { config.Filters.Add(new AuthorizeFilter()); }*/)
                // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization?view=aspnetcore-2.2#configure-localization
                .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
                .AddDataAnnotationsLocalization()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddScoped<IDatabaseFactory, DatabaseFactory>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IActivityRepository, ActivityRepository>();
            services.AddScoped<IActivitySigninRepository, ActivitySigninRepository>();
            services.AddScoped<IConfigRepository, ConfigRepository>();
            services.AddScoped<IEmailConfig, EmailConfig>();
            services.AddScoped<IEmailRepository, EmailRepository>();
            services.AddScoped<IEmployerRepository, EmployerRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<ILookupRepository, LookupRepository>();
            services.AddScoped<IPersonRepository, PersonRepository>();
            services.AddScoped<IReportsRepository, ReportsRepository>();
            services.AddScoped<IWorkAssignmentRepository, WorkAssignmentRepository>();
            services.AddScoped<IWorkerRepository, WorkerRepository>();
            services.AddScoped<IWorkerRequestRepository, WorkerRequestRepository>();
            services.AddScoped<IWorkerSigninRepository, WorkerSigninRepository>();
            services.AddScoped<IWorkOrderRepository, WorkOrderRepository>();
            services.AddScoped<ITransportRuleRepository, TransportRuleRepository>();
            services.AddScoped<ITransportProvidersRepository, TransportProvidersRepository>();
            services.AddScoped<ITransportProvidersAvailabilityRepository, TransportProvidersAvailabilityRepository>();

            services.AddScoped<IActivityService, ActivityService>();
            services.AddScoped<IActivitySigninService, ActivitySigninService>();
            services.AddScoped<IConfigService, ConfigService>();
            services.AddScoped<IEmployerService, EmployerService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<ILookupService, LookupService>();
            services.AddScoped<IOnlineOrdersService, OnlineOrdersService>();
            services.AddScoped<IPersonService, PersonService>();
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IReportsV2Service, ReportsV2Service>();
            services.AddScoped<ITransportRuleService, TransportRuleService>();
            services.AddScoped<ITransportProvidersService, TransportProvidersService>();
            services.AddScoped<ITransportProvidersAvailabilityService, TransportProvidersAvailabilityService>();
            services.AddScoped<IWorkAssignmentService, WorkAssignmentService>();
            services.AddScoped<IWorkerRequestService, WorkerRequestService>();
            services.AddScoped<IWorkerSigninService, WorkerSigninService>();
            services.AddScoped<IWorkerService, WorkerService>();
            services.AddScoped<IWorkOrderService, WorkOrderService>();

            services.AddScoped<IDefaults, Defaults>();
            services.AddScoped<IModelBindingAdaptor, ModelBindingAdaptor>();

            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization?view=aspnetcore-2.2#use-a-custom-provider
            // They imply that this is only for "custom" providers but the RequestLocalizationOptions in Configure aren't populated
            // unless you use this.
            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new List<CultureInfo>
                {
                    new CultureInfo("en-US"),
                    new CultureInfo("es-US")
                    // we use es-US because we are not fully equipped to support international dates.
                };

                options.DefaultRequestCulture = new RequestCulture("en-US");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
            });
        }

        // https://www.strathweb.com/2017/04/running-multiple-independent-asp-net-core-pipelines-side-by-side-in-the-same-application/
        // https://github.com/filipw/aspnetcore-parallel-pipelines/blob/master/WebApplication2/ApplicationBuilderExtensions.cs#L12
        public static IApplicationBuilder CreateServiceBranch(this IApplicationBuilder app,
            PathString path, Action<IServiceCollection> servicesConfiguration,
            Action<IApplicationBuilder> appBuilderConfiguration)
        {
            var webhost = new WebHostBuilder()
                .UseKestrel()
                .ConfigureServices(servicesConfiguration)
                .UseStartup<StartupHarness>()
                .Build()
      /* ojO */ .CreateOrMigrateDatabase(); /* Ojo */
            
            var serviceProvider = webhost.Services;
            var featureCollection = webhost.ServerFeatures;
            var appFactory = serviceProvider.GetRequiredService<IApplicationBuilderFactory>();
            var branchBuilder = appFactory.CreateBuilder(featureCollection);
            var factory = serviceProvider.GetRequiredService<IServiceScopeFactory>();

            branchBuilder.Use(async (context, next) => {
                using (var scope = factory.CreateScope()) {
                    context.RequestServices = scope.ServiceProvider;
                    await next();
                }
            });

            appBuilderConfiguration(branchBuilder);

            var branchDelegate = branchBuilder.Build();

            return app.Map(path, builder => { builder.Use(async (context, next) => {
                await branchDelegate(context);
              });
            });
        }
    }
}
