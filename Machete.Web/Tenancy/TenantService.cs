using Microsoft.AspNetCore.Http;

namespace Machete.Web.Tenancy
{
    public interface ITenantService
    {
        string GetCurrentTenant();
    }

    public class TenantService : ITenantService
    {
        private readonly HttpContext _httpContext;
        private readonly ITenantIdentificationService _service;
    
        public TenantService(IHttpContextAccessor accessor, ITenantIdentificationService service)
        {
            _httpContext = accessor.HttpContext;
            _service = service;
        }
    
        public string GetCurrentTenant()
        {
            return _service.GetCurrentTenant(_httpContext);
        }
    }
}
