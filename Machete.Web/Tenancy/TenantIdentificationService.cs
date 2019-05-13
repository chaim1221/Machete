using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Machete.Web.Tenancy
{
    public interface ITenantIdentificationService
    {
        string GetCurrentTenant(HttpContext httpContext);
    }

    public class TenantIdentificationService : ITenantIdentificationService
    {
        private readonly TenantMapping _tenants;

        public TenantIdentificationService(IConfiguration configuration)
        {
            _tenants = configuration.GetTenantMapping();
        }

        public string GetCurrentTenant(HttpContext context)
        {
            var host = context.Request.Host.Value;
            return _tenants.Tenants.FirstOrDefault(tenant => tenant.Key.Equals(host)).Value ?? _tenants.Default;
        }
    }
}
