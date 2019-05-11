#region COPYRIGHT
// File:     MacheteInitializer.cs
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
using System.Linq;

namespace Machete.Data.Initialize
{
    /// <summary>
    /// <para>Machete.Data.Initialize.MacheteConfiguration class.</para>
    /// <para>This class is responsible for ensuring the presence of the Seed data needed to run the application.</para>
    /// </summary>
    public static class MacheteConfiguration
    {
        public static void Seed(MacheteContext db, IServiceProvider services)
        {
            if (!db.Lookups.Any()) MacheteLookups.Initialize(db);
            if (!db.TransportProviders.Any() || !db.TransportProvidersAvailability.Any()) MacheteTransports.Initialize(db);
            if (!db.Users.Any()) MacheteUsers.Initialize(services);
            // assume Configs table has been populated by script
            if (!db.Configs.Any()) MacheteConfigs.Initialize(db);
            if (!db.TransportRules.Any()) MacheteRules.Initialize(db);
            if (db.ReportDefinitions.Count() != MacheteReportDefinitions.Cache.Count) MacheteReportDefinitions.Initialize(db);
        }
    }   
}
