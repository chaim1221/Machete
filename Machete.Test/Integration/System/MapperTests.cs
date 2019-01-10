using System;
using Machete.Web.Maps;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Machete.Test
{
    [TestClass]
    public class MapperTests
    {
        [TestMethod]
        public void TestMethod1()
        {
            var mapperConfig = new MapperConfigurationFactory().Config;
            var mapper = mapperConfig.CreateMapper();
            mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
