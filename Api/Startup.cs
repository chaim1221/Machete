using System.Linq;
using System.Reflection;
using Machete.Api.Maps;
using Machete.Data;
using Machete.Data.Infrastructure;
using Machete.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Machete.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connString = Configuration.GetConnectionString("DefaultConnection");
            
            services.AddDbContext<MacheteContext>(builder => {
                builder
                    .UseLazyLoadingProxies()
                    .UseSqlServer(connString, with =>
                        with.MigrationsAssembly("Machete.Data"));
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

            //app.UseHttpsRedirection(); // also TODO
            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "DefaultApi",
                    template: "api/{controller}/{id?}", // id? == legacy RouteParameter.Optional
                    defaults: new { controller = "Home" },
                    constraints: new { controller = GetControllerNames() }
                );
                routes.MapRoute(
                    name: "NotFound",
                    template: "{*path}",
                    defaults: new { controller = "Error", action = "NotFound" });
            });
            app.UseStaticFiles();
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
