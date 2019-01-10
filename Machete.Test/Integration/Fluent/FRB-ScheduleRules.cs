﻿using Machete.Domain;
using Machete.Service;
using System;
using Microsoft.Extensions.DependencyInjection;

namespace Machete.Test.Integration
{
    public partial class FluentRecordBase
    {
        private IScheduleRuleService _servSR;
        private ScheduleRule _sr;

        public void AddScheduleRule()
        {
            // DEPENDENCIES
            _servSR = container.GetRequiredService<IScheduleRuleService>();

            // ARRANGE
            _sr = (ScheduleRule)Records.scheduleRule.Clone();

            // ACT
            _servSR.Create(_sr, _user);
        }
    }
}
