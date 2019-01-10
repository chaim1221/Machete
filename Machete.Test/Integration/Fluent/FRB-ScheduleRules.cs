using Machete.Domain;
using Machete.Service;
using System;

namespace Machete.Test.Integration
{
    public partial class FluentRecordBase : IDisposable
    {
        private IScheduleRuleService _servSR;
        private ScheduleRule _sr;



        public FluentRecordBase AddScheduleRule(
    )
        {
            //
            // DEPENDENCIES
            //_servSR = container.Resolve<IScheduleRuleService>();

            //
            // ARRANGE
            _sr = (ScheduleRule)Records.scheduleRule.Clone();

            //
            // ACT
            _servSR.Create(_sr, _user);
            return this;
        }

        public ScheduleRule ToScheduleRule()
        {
            if (_sr == null) AddScheduleRule();
            return _sr;
        }
    }
}
