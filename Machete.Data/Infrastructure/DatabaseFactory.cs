#region COPYRIGHT
// File:     DatabaseFactory.cs
// Author:   Savage Learning, LLC.
// Created:  2012/06/17 
// License:  GPL v3
// Project:  Machete.Data
// Contact:  savagelearning
// 
// Copyright 2011 Savage Learning, LLC., all rights reserved.
// 
// This source file is free software, under either the GPL v3 license or a
// BSD style license, as supplied with this software.
// 
// This source file is distributed in the hope that it will be useful, but 
// WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
// or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
//  
// For details please refer to: 
// http://www.savagelearning.com/ 
//    or
// http://www.github.com/jcii/machete/
// 
#endregion
using System;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Reflection;
using System.Text;
using Machete.Data.Tenancy;
using Microsoft.EntityFrameworkCore;

namespace Machete.Data.Infrastructure
{
    public interface IDatabaseFactory
    {
        MacheteContext Get();
        MacheteContext Get(Tenant tenant);
    }

    public class DatabaseFactory : IDatabaseFactory
    {
        readonly DbContextOptions<MacheteContext> options;
        // ReSharper disable once InconsistentNaming
        private MacheteContext macheteContext;
        private readonly ITenantService _tenantService;

        private const BindingFlags BindFlags = BindingFlags.Instance 
                                             | BindingFlags.Public
                                             | BindingFlags.NonPublic
                                             | BindingFlags.Static;

        public DatabaseFactory(DbContextOptions<MacheteContext> options, ITenantService tenantService)
        {
            typeof(SqlConnection).GetField("ObjectID", BindFlags);
            this.options = options;
            _tenantService = tenantService;
        }

        public MacheteContext Get()
        {
            return Get(_tenantService.GetCurrentTenant());
        }

        public MacheteContext Get(Tenant tenant)
        {
            macheteContext = new MacheteContext(options, tenant);
            log_connection_count("DatabaseFactory.Get {tenant}");
            return macheteContext;
        }

        private void log_connection_count(string prefix)
        {
            var sb = new StringBuilder();
            var dbConnection = macheteContext.Database.GetDbConnection();
            var objectID = dbConnection.GetType().GetField("Object ID", BindFlags);
            sb.AppendFormat("-----------{0} # [{1}], Conn: {2}",
                prefix,
                objectID,
                dbConnection.ConnectionString);
            Debug.WriteLine(sb.ToString());
        }
    }
}
