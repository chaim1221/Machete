using Machete.Api.ViewModels;

namespace Machete.Test.Integration.Fluent
{
    public partial class FluentRecordBase
    {
        public WorkOrder CloneOnlineOrder()
        {
            var wo = (WorkOrder)Records.onlineOrder.Clone();
            wo.contactName = RandomString(10);
            return wo;
        }
    }
}
