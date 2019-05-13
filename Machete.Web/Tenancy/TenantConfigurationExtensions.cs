using Microsoft.Extensions.Configuration;

namespace Machete.Web.Tenancy
{
    public static class TenantConfigurationExtensions
    {
        public static TenantMapping GetTenantMapping(this IConfiguration configuration)
        {
            return configuration.GetSection("Tenants").Get<TenantMapping>();
        }
    }
}
