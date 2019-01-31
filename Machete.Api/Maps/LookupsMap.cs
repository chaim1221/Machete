using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Machete.Api.ViewModels;

namespace Machete.Api.Maps
{
    public class LookupsMap : MacheteProfile
    {
        public LookupsMap()
        {
            CreateMap<Domain.Lookup, Lookup>()
                .ForMember(v => v.id, opt => opt.MapFrom(d => d.ID))
                ;
        }
    }
}