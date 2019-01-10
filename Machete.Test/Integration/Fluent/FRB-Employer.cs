using Machete.Domain;
using Machete.Service;
using System;
using Microsoft.Extensions.DependencyInjection;

namespace Machete.Test.Integration
{
    public partial class FluentRecordBase
    {
        private IEmployerService _servE;
        private Employer _emp;

        public void AddEmployer(DateTime? datecreated = null,
            DateTime? dateupdated = null)
        {
            //
            // DEPENDENCIES
            _servE = container.GetRequiredService<IEmployerService>();
            //
            // ARRANGE
            _emp = (Employer)Records.employer.Clone();
            if (datecreated != null) _emp.datecreated = (DateTime)datecreated;
            if (dateupdated != null) _emp.dateupdated = (DateTime)dateupdated;
            //
            // ACT
            _servE.Create(_emp, _user);
        }

        public Employer ToEmployer()
        {
            if (_emp == null) AddEmployer();
            return _emp;
        }

        public Web.ViewModel.Employer CloneEmployer()
        {
            AddMapper();
            var e = _webMap.Map<Machete.Domain.Employer, Web.ViewModel.Employer>((Employer)Records.employer.Clone());
            e.name = RandomString(10);
            e.email = "changeme@gmail.com";
            return e;
        }

    }
}
