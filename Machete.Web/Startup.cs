using System.Security.Cryptography;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Machete.Web
{
    public class Startup
    {
        private SecurityKey _signingKey;
        //private IServiceCollection _services;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            
            using (RSA rsa = RSA.Create()) {
                rsa.KeySize = 4096;                
                _signingKey = new RsaSecurityKey(rsa);
            }
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
            services.ConfigureMvcServices(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.ConfigureMvcBuilder(env);             
        }
    }
}
