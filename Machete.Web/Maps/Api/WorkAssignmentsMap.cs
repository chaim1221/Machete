﻿using AutoMapper;
using WorkAssignmentViewModel = Machete.Web.ViewModel.Api.WorkAssignment;

namespace Machete.Web.Maps.Api
{
    public class WorkAssignmentsMap : Profile
    {
        public WorkAssignmentsMap()
        {
            CreateMap<Service.DTO.WorkAssignmentsList, WorkAssignmentViewModel>();
            CreateMap<Domain.WorkAssignment, WorkAssignmentViewModel>()
                .ForMember(v => v.skill, opt => opt.MapFrom(d => d.skillEN))
                .ForMember(v => v.requiresHeavyLifting, opt => opt.MapFrom(d => d.weightLifted));
            CreateMap<WorkAssignmentViewModel, Domain.WorkAssignment>()
                .ForMember(v => v.weightLifted, opt => opt.MapFrom(d => d.requiresHeavyLifting));
        }
    }
}
