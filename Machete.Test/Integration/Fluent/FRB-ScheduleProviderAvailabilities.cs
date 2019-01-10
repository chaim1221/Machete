using Machete.Domain;
using Machete.Service;
using System;

namespace Machete.Test.Integration
{
    public partial class FluentRecordBase : IDisposable
    {
        private ITransportProvidersAvailabilityService _servTPA;
        private TransportProviderAvailability _tpa;

        public FluentRecordBase AddTransportProviderAvailability(
    )
        {
            //
            // DEPENDENCIES
            //_servTPA = container.Resolve<ITransportProvidersAvailabilityService>();

            //
            // ARRANGE
            _tpa = (TransportProviderAvailability)Records.transportProviderAvailability.Clone();

            //
            // ACT
            _servTPA.Create(_tpa, _user);
            return this;
        }

        public TransportProviderAvailability ToTransportProviderAvailability()
        {
            if (_tpa == null) AddTransportProviderAvailability();
            return _tpa;
        }
    }
}
