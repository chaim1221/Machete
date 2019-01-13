﻿#region COPYRIGHT
// File:     MacheteContext.cs
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

using Machete.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Activity = Machete.Domain.Activity;

#region SHUTUP RESHARPER
// The purpose of suppressing so many inspections in this case is so that I can
// visually verify the integrity of the file when there are changes.
//
// ReSharper disable RedundantArgumentDefaultValue
// ReSharper disable UnusedMember.Global
// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable ClassWithVirtualMembersNeverInherited.Global
// ReSharper disable SuggestBaseTypeForParameter
// ReSharper disable PossibleMultipleEnumeration
// ReSharper disable InvertIf
// ReSharper disable AssignNullToNotNullAttribute
#endregion

namespace Machete.Data

{
    // http://stackoverflow.com/questions/22105583/why-is-asp-net-identity-identitydbcontext-a-black-box
    public class MacheteContext : IdentityDbContext<MacheteUser>
    {
        public MacheteContext(DbContextOptions<MacheteContext> options) : base(options)
        {
            
        }
        //Machete here defines the database to use, by convention.
        public DbSet<Person> Persons { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<WorkAssignment> WorkAssignments { get; set; }
        public virtual DbSet<Lookup> Lookups { get; set; }
        public DbSet<WorkerSignin> WorkerSignins { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<WorkerRequest> WorkerRequests { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivitySignin> ActivitySignins { get; set; }
        public DbSet<Config> Configs { get; set; }
        public DbSet<ReportDefinition> ReportDefinitions { get; set; }
        public DbSet<TransportProvider> TransportProviders { get; set; }
        public DbSet<TransportProviderAvailability> TransportProvidersAvailability { get; set; }
        public DbSet<TransportRule> TransportRules { get; set; }
        public DbSet<TransportCostRule> TransportCostRules { get; set; }
        public DbSet<ScheduleRule> ScheduleRules { get; set; }
        
        public override int SaveChanges()
        {
            // https://github.com/aspnet/EntityFrameworkCore/issues/3680#issuecomment-155502539
            var validationErrors = ChangeTracker
                .Entries<IValidatableObject>()
                .SelectMany(entities => entities.Entity.Validate(null))
                .Where(result => result != ValidationResult.Success);
            
            if (validationErrors.Any()) {
                var details = new StringBuilder();
                var preface = "DbEntityValidation Error: ";
                Trace.TraceInformation(preface);
                details.AppendLine(preface);

                foreach (var validationError in validationErrors) {
                    var line = $"Property: {validationError.MemberNames} Error: {validationError.ErrorMessage}";
                    details.AppendLine(line);
                    Trace.TraceInformation(line);
                }

                throw new Exception(details.ToString());
            }

            return base.SaveChanges();
        }

        public bool IsDead { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // call the other builders (below):
            
            // ENTITIES //
            modelBuilder.ApplyConfiguration(new PersonBuilder());
            modelBuilder.ApplyConfiguration(new WorkerBuilder());
            modelBuilder.Configurations<WorkerSignin>().Add(typeof(WorkerSigninBuilder));
            modelBuilder.Configurations<Event>().Add(typeof(EventBuilder));
            modelBuilder.Configurations<JoinEventImage>().Add(typeof(JoinEventImageBuilder));
            modelBuilder.Configurations<JoinWorkOrderEmail>().Add(typeof(JoinWorkOrderEmailBuilder));
            modelBuilder.Configurations<ActivitySignin>().Add(typeof(ActivitySigninBuilder));
            modelBuilder.Configurations<Activity>().Add(typeof(ActivityBuilder));
            modelBuilder.Configurations<Email>().Add(typeof(EmailBuilder));
            modelBuilder.Configurations<TransportProvider>().Add(typeof(TransportProviderBuilder));
            modelBuilder.Configurations<TransportProviderAvailability>()
                        .Add(typeof(TransportProvidersAvailabilityBuilder));
            modelBuilder.Configurations<TransportRule>().Add(typeof(TransportRuleBuilder));
            modelBuilder.Configurations<TransportCostRule>().Add(typeof(TransportCostRuleBuilder));
            modelBuilder.Configurations<ScheduleRule>().Add(typeof(ScheduleRuleBuilder));
            modelBuilder.Configurations<Employer>().Add(typeof(EmployerBuilder));
            modelBuilder.Configurations<WorkOrder>().Add(typeof(WorkOrderBuilder));
            modelBuilder.Configurations<WorkAssignment>().Add(typeof(WorkAssignmentBuilder));
            modelBuilder.Configurations<ReportDefinition>().Add(typeof(ReportDefinitionBuilder));
            
            // VIEWS //
            modelBuilder.Query<QueryMetadata>();
        }
    }

    public class JoinWorkOrderEmailBuilder : IEntityTypeConfiguration<JoinWorkOrderEmail>
    {
        public void Configure(EntityTypeBuilder<JoinWorkOrderEmail> builder)
        {
            builder.HasKey(k => new {k.EmailID, k.WorkOrderID});
        }
    }

    public class PersonBuilder : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasKey(k => k.ID);
            builder.Property(p => p.ID)
                .ValueGeneratedOnAdd();
            
// Microsoft.Data.Sqlite.SqliteException (0x80004005): SQLite Error 19: 'FOREIGN KEY constraint failed'.
            builder.HasOne(p => p.Worker)
                .WithOne(w => w.Person)
                .HasForeignKey<Worker>(w => w.ID) //main.Persons.FK_Persons_Workers_ID (wrong)
                .OnDelete(DeleteBehavior.Cascade);

//// The child/dependent side could not be determined for the one-to-one relationship ...configure the foreign key property.
//            builder.HasOne(p => p.Worker)
//                .WithOne(w => w.Person)
////                .IsRequired(false) // same
////              .HasForeignKey<Worker>(w => w.ID) //main.Persons.FK_Persons_Workers_ID
//                .OnDelete(DeleteBehavior.Cascade);
            
            //builder.ToTable("Persons");
        }
    }

    public class WorkerBuilder : IEntityTypeConfiguration<Worker>
    {
        public void Configure(EntityTypeBuilder<Worker> builder)
        {
//            builder.HasKey(k => k.ID);

//// FOREIGN KEY constraint failed
//            builder.HasOne(w => w.Person)
//                .WithOne(p => p.Worker)//.IsRequired(false);
//                .HasForeignKey<Person>(p => p.ID); //main.Persons.FK_Persons_Workers_ID
            builder.HasMany(s => s.workersignins)
                .WithOne(s => s.worker).IsRequired(false)
                .HasForeignKey(s => s.WorkerID);
            builder.HasMany(a => a.workAssignments)
                .WithOne(a => a.workerAssigned).IsRequired(false)
                .HasForeignKey(a => a.workerAssignedID);
        }
    }

    public class ReportDefinitionBuilder : IEntityTypeConfiguration<ReportDefinition>
    {
        public void Configure(EntityTypeBuilder<ReportDefinition> builder)
        {
            builder.HasKey(k => k.ID);
        }
    }

    public class WorkerSigninBuilder : IEntityTypeConfiguration<WorkerSignin>
    {
        public void Configure(EntityTypeBuilder<WorkerSignin> builder)
        {
            builder.HasKey(k => k.ID);
            builder.Property(x => x.ID);
            // EF6; see ActivitySignin class for EF7 decorator
            // https://stackoverflow.com/questions/36155429/auto-increment-on-partial-primary-key-with-entity-framework-core
            //entity.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity); 
            // Or try this:
            //entity.Property(x => x.ID)
            //    .ValueGeneratedOnAdd();

            // EF6; unnecessary, EF7
            // https://stackoverflow.com/questions/46290086/how-to-map-entities-with-inheritance-entity-framework-core-2-0
            //entity.Map(m =>
            //{
            //    m.MapInheritedProperties();
            //    m.ToTable("WorkerSignins");
            //});
        }
    }

    public class EmployerBuilder : IEntityTypeConfiguration<Employer>
    {
        public void Configure(EntityTypeBuilder<Employer> builder)
        {
            builder.HasKey(e => e.ID); //being explicit for EF
            builder.HasMany(e => e.WorkOrders) //define the parent
                .WithOne(w => w.Employer).IsRequired(true) //Virtual property definition
                .HasForeignKey(wo => wo.EmployerID) //DB foreign key definition
                .OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("Employers");
        }
    }

    public class EmailBuilder : IEntityTypeConfiguration<Email>
    {
        public void Configure(EntityTypeBuilder<Email> builder)
        {
            builder.HasKey(e => e.ID);
        }
    }

    public class WorkOrderBuilder : IEntityTypeConfiguration<WorkOrder>
    {
        public void Configure(EntityTypeBuilder<WorkOrder> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasOne(p => p.Employer)
                .WithMany(e => e.WorkOrders)
                .HasForeignKey(e => e.EmployerID)
                .IsRequired(true);
            builder.ToTable("WorkOrders");
        }
    }

    public class WorkAssignmentBuilder : IEntityTypeConfiguration<WorkAssignment>
    {
        public void Configure(EntityTypeBuilder<WorkAssignment> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasOne(k => k.workOrder)
                .WithMany(a => a.workAssignments)
                .HasForeignKey(a => a.workOrderID)
                .IsRequired(true);
            builder.ToTable("WorkAssignments");
        }
    }

    public class EventBuilder : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasOne(k => k.Person)
                .WithMany(e => e.Events)
                .HasForeignKey(k => k.PersonID)
                .IsRequired(true);
        }
    }

    public class JoinEventImageBuilder : IEntityTypeConfiguration<JoinEventImage>
    {
        public void Configure(EntityTypeBuilder<JoinEventImage> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasOne(k => k.Event)
                //.HasRequired(k => k.event)
                .WithMany(d => d.JoinEventImages)
                .HasForeignKey(k => k.EventID)
                .IsRequired(true);
            builder.HasOne(k => k.Image).WithOne().IsRequired(true);
                //.HasRequired(k => k.image);
        }
    }

    public class ActivityBuilder : IEntityTypeConfiguration<Activity>
    {
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasMany(e => e.Signins)
                .WithOne(w => w.Activity)
                .IsRequired(true)
                .HasForeignKey(k => k.activityID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class ActivitySigninBuilder : IEntityTypeConfiguration<ActivitySignin>
    {
        public void Configure(EntityTypeBuilder<ActivitySignin> builder)
        {
            builder.HasKey(k => k.ID);
            builder.Property(x => x.ID);
            // EF6; see ActivitySignin class for EF7 decorator
            // https://stackoverflow.com/questions/36155429/auto-increment-on-partial-primary-key-with-entity-framework-core
            //entity.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity); 
            // Or try this:
            //entity.Property(x => x.ID)
            //    .ValueGeneratedOnAdd();

            // EF6; unnecessary, EF7
            // https://stackoverflow.com/questions/46290086/how-to-map-entities-with-inheritance-entity-framework-core-2-0
            //entity.Map(m =>
            //{
            //    m.MapInheritedProperties();
            //    m.ToTable("ActivitySignins");
            //});
        }
    }

    public class TransportProviderBuilder : IEntityTypeConfiguration<TransportProvider>
    {
        public void Configure(EntityTypeBuilder<TransportProvider> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasMany(e => e.AvailabilityRules)      // define the parent.
                .WithOne(w => w.Provider).IsRequired(true) // define the EF Core virtual property.
                .HasForeignKey(w => w.transportProviderID) // define the foreign key constraint.
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class TransportProvidersAvailabilityBuilder : IEntityTypeConfiguration<TransportProviderAvailability>
    {
        public void Configure(EntityTypeBuilder<TransportProviderAvailability> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasOne(p => p.Provider)
                .WithMany(e => e.AvailabilityRules)
                .HasForeignKey(e => e.transportProviderID);
        }
    }

    public class TransportRuleBuilder : IEntityTypeConfiguration<TransportRule>
    {
        public void Configure(EntityTypeBuilder<TransportRule> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasMany(c => c.costRules)
                .WithOne(r => r.transportRule).IsRequired(true)
                .HasForeignKey(k => k.transportRuleID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class TransportCostRuleBuilder : IEntityTypeConfiguration<TransportCostRule>
    {
        public void Configure(EntityTypeBuilder<TransportCostRule> builder)
        {
            builder.HasKey(k => k.ID);
            builder.HasOne(k => k.transportRule)
                .WithMany(c => c.costRules)
                .HasForeignKey(k => k.transportRuleID)
                .IsRequired(true);
        }
    }

    public class ScheduleRuleBuilder : IEntityTypeConfiguration<ScheduleRule>
    {
        public void Configure(EntityTypeBuilder<ScheduleRule> builder)
        {
            builder.HasKey(k => k.ID);
        }
    }

    public static class MacheteEntityTypeBuilder
    {
        public static EntityTypeBuilder<T> Configurations<T>(this ModelBuilder model) where T : Record
        {
            return model.Entity<T>();
        }

        public static void Add(this EntityTypeBuilder entity, Type type)
        {
            Activator.CreateInstance(type, entity);
        }
    }
}
