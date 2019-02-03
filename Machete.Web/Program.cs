using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Machete.Web
{
    public class Program
    {
        /// <summary>
        /// The program's Main method; entry point for the application.
        /// </summary>
        public static void Main(string[] args) => CreateWebHostBuilder(args).Build().Run();        

        /// <summary>
        /// A stripped down version of the default WebHost object configuration, this method gives just the absolute
        /// basics necessary to run an MVC app on POSIX. It does not contain configuration for IIS, instead using only
        /// the Kestrel development server; ideal for hosting with containers.
        /// </summary>
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            new WebHostBuilder()
                .UseKestrel()
                .ConfigureAppConfiguration((host, config) => {
                    config.SetBasePath(Directory.GetCurrentDirectory());
                    config.AddJsonFile("appsettings.json");
                })
                .UseStartup<Startup>();
    }
}
