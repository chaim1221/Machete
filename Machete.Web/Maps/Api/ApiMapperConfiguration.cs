using AutoMapper;
using Machete.Web.Maps.Api.Identity;

namespace Machete.Web.Maps.Api
{
    public class ApiMapperConfiguration
    {
        public MapperConfiguration Config { get; }

        public ApiMapperConfiguration()
        {
            Config = new MapperConfiguration(c =>
            {
                c.AddProfile<EmployersMap>();
                c.AddProfile<LookupsMap>();
                c.AddProfile<ReportDefinitionsMap>();
                c.AddProfile<WorkAssignmentsMap>();
                c.AddProfile<WorkOrdersMap>();
                c.AddProfile<Service.WorkOrderMap>();
                c.AddProfile<Service.EmployersMap>();
                c.AddProfile<TransportRulesMap>();
                c.AddProfile<TransportProvidersMap>();
                c.AddProfile<ScheduleRulesMap>();
                
                c.AddProfile<MacheteUserMap>();
            });
        }
    }
}
