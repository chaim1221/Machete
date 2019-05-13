using System.Collections.Generic;
using FluentAssertions;
using Machete.Web.Tenancy;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Machete.Test.UnitTests.Web.Tenancy
{
    [TestClass]
    public class TenantMappingTests
    {
        [TestMethod]
        public void TenantMappingDefinition()
        {
            var @default = "noaccess";
            var tenants = new Dictionary<string, string>
            {
                { "key", "value" }
            };

            var mapping = new TenantMapping
            {
                Default = @default,
                Tenants = tenants
            };

            mapping.Should().NotBeNull();
            mapping.Should().BeOfType(typeof(TenantMapping));
        }
    }
}
