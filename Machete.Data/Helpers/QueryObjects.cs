using System;
using System.Collections.Generic;

namespace Machete.Data.Helpers
{
    public class DynamicQueryObject
    {
        public Type type { get; set; }
        public dynamic @dynamic { get; set; }
    }
}
