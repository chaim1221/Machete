using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Machete.Data.Tenancy
{
    public interface ITenantService
    {
        Tenant GetCurrentTenant();
    }

    public class TenantService : ITenantService
    {
        private readonly HttpContext _httpContext;
        private readonly ITenantIdentificationService _service;
        private IConfiguration _configuration;

        public TenantService(IHttpContextAccessor accessor, ITenantIdentificationService service, IConfiguration configuration)
        {
            _httpContext = accessor.HttpContext;
            _service = service;
            _configuration = configuration;
        }
    
        public Tenant GetCurrentTenant()
        {
            var tenantName = _service.GetCurrentTenant(_httpContext);
            return _configuration.GetTenant(tenantName);
        }
    }
}
