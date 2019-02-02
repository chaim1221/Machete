using Machete.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Machete.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebHost
                .CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build()
      /* o.O    .CreateOrMigrateDatabase() // O.o */
                .Run();
        }
    }
}
