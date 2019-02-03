namespace Machete.Api.ViewModels
{
    public class ReportDefinition : Domain.ReportDefinition
    {
        public int id { get; set; }
        public object columns { get; set; }
        public object inputs { get; set; }
    }
}