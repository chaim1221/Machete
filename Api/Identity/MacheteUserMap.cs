using AutoMapper;
using Machete.Data;

namespace Machete.Api.Identity {
    public class MacheteUserMap : Profile
    {
        public MacheteUserMap()
        {
            CreateMap<RegistrationViewModel, MacheteUser>()
                .ForMember(mu => mu.UserName, map => map.MapFrom(vm => vm.FirstName + "." + vm.LastName))
                .ForMember(mu => mu.FirstName, map => map.MapFrom(vm => vm.FirstName))
                .ForMember(mu => mu.LastName, map => map.MapFrom(vm => vm.LastName))
                .ForMember(mu => mu.Email, map => map.MapFrom(vm => vm.Email))
                ;
        }
    }
}