﻿using Machete.Domain;

namespace Machete.Web.Maps.Api
{
    public class EmployersMap : MacheteProfile
    {
        public EmployersMap()
        {
            CreateMap<Service.DTO.EmployersList, Employer>();
            CreateMap<Domain.Employer, Employer>();
            CreateMap<Employer, Domain.Employer>()
                .ForMember(v => v.datecreated, opt => opt.Ignore())
                .ForMember(v => v.dateupdated, opt => opt.Ignore())
                .ForMember(v => v.createdby, opt => opt.Ignore())
                .ForMember(v => v.updatedby, opt => opt.Ignore())
                .ForMember(v => v.ID, opt => opt.Ignore())
                .ForMember(v => v.onlineSigninID, opt => opt.Ignore())
                .ForMember(v => v.licenseplate, opt => opt.Ignore())
                .ForMember(v => v.driverslicense, opt => opt.Ignore())
                .ForMember(v => v.isOnlineProfileComplete, opt => opt.Ignore())
                ;
        }

    }
}