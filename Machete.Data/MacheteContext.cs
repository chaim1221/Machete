#region COPYRIGHT
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
using Machete.Data.Dynamic;
using Machete.Data.Tenancy;
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Relational;
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

// If you add anything to this file, do it in alphabetical order so that if we have to do a schema compare it is easier
namespace Machete.Data
{
    // http://stackoverflow.com/questions/22105583/why-is-asp-net-identity-identitydbcontext-a-black-box
    public class MacheteContext : IdentityDbContext<MacheteUser>
    {
        private Tenant _tenant;

        public MacheteContext(DbContextOptions<MacheteContext> options, ITenantService tenantService) : base(options)
        {
            _tenant = tenantService.GetCurrentTenant();
        }

        public MacheteContext(DbContextOptions<MacheteContext> options, Tenant tenant) : base(options)
        {
            _tenant = tenant;
        }
        
        // Machete here defines the data context to use by EF Core convention.
        // Entity Framework will not retrieve or modify types not expressed here.
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivitySignin> ActivitySignins { get; set; }
        public DbSet<Config> Configs { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Image> Images { get; set; }
        public virtual DbSet<Lookup> Lookups { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<ReportDefinition> ReportDefinitions { get; set; }
        public DbSet<ScheduleRule> ScheduleRules { get; set; }
        public DbSet<TransportCostRule> TransportCostRules { get; set; }
        public DbSet<TransportProviderAvailability> TransportProvidersAvailability { get; set; }
        public DbSet<TransportProvider> TransportProviders { get; set; }
        public DbSet<TransportRule> TransportRules { get; set; }
        public DbSet<WorkAssignment> WorkAssignments { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<WorkerRequest> WorkerRequests { get; set; }
        public DbSet<WorkerSignin> WorkerSignins { get; set; }

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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_tenant.ConnectionString);
            
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Implement base OnModelCreating functionality before adding our own. Functionally, this does nothing.
            // https://stackoverflow.com/a/39577004/2496266
            base.OnModelCreating(modelBuilder);
            
            // ENTITIES //
            modelBuilder.ApplyConfiguration(new PersonBuilder());
            modelBuilder.ApplyConfiguration(new WorkerBuilder());
            modelBuilder.ApplyConfiguration(new WorkerSigninBuilder());
            modelBuilder.ApplyConfiguration(new ImageBuilder());
            modelBuilder.ApplyConfiguration(new JoinEventImageBuilder());
            modelBuilder.ApplyConfiguration(new EmailWorkOrdersBuilder());
            modelBuilder.ApplyConfiguration(new ActivitySigninBuilder());
            modelBuilder.ApplyConfiguration(new ActivityBuilder());
            modelBuilder.ApplyConfiguration(new ConfigBuilder());
            modelBuilder.ApplyConfiguration(new EmailBuilder());
            modelBuilder.ApplyConfiguration(new EventBuilder());
            modelBuilder.ApplyConfiguration(new TransportProviderBuilder());
            modelBuilder.ApplyConfiguration(new TransportProvidersAvailabilityBuilder());
            modelBuilder.ApplyConfiguration(new TransportRuleBuilder());
            modelBuilder.ApplyConfiguration(new TransportCostRuleBuilder());
            modelBuilder.ApplyConfiguration(new ScheduleRuleBuilder());
            modelBuilder.ApplyConfiguration(new EmployerBuilder());
            modelBuilder.ApplyConfiguration(new WorkOrderBuilder());
            modelBuilder.ApplyConfiguration(new WorkAssignmentBuilder());
            modelBuilder.ApplyConfiguration(new ReportDefinitionBuilder());
            
            // VIEWS //
            modelBuilder.Query<QueryMetadata>();
        }
    }
    
    public class ActivityBuilder : IEntityTypeConfiguration<Activity>
    {
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
            builder.HasKey(k => k.ID)
                .HasName("PK_dbo.Activities");

            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateEnd).HasColumnType("datetime");
            builder.Property(property => property.dateStart).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
            builder.Property(property => property.firstID).HasDefaultValue(0);
            builder.Property(property => property.recurring).HasDefaultValue(0);
            
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
            builder.HasKey(k => k.ID)
                .HasName("PK_dbo.ActivitySignins");
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateforsignin).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");

            builder.HasOne(fk => fk.Activity)
                .WithMany(activity => activity.Signins)
                .HasForeignKey(fk => fk.activityID)
                .HasConstraintName("FK_dbo.ActivitySignins_dbo.Activities.activityID");

            // WithMany (hopefully) just defines the relationship; there is no FK Persons -> ActivitySignins
            builder.HasOne(fk => fk.person)
                .WithMany()
                .HasForeignKey(fk => fk.activityID)
                .HasConstraintName("FK_dbo.ActivitySignins_dbo.Persons_personID");

            builder.HasIndex(index => index.activityID)
                .HasName("IX_activityID");
                
            builder.HasIndex(index => index.personID)
                .HasName("IX_personID");
        }
    }

    public class ConfigBuilder : IEntityTypeConfiguration<Config>
    {
        public void Configure(EntityTypeBuilder<Config> builder)
        {
            builder.HasKey(key => key.ID)
                .HasName("PK_dbo.Configs");

            //builder.Property(property => property.publicConfig).HasDefaultValue(true);
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
    
    public class EmailBuilder : IEntityTypeConfiguration<Email>
    {
        public void Configure(EntityTypeBuilder<Email> builder)
        {
            builder.HasKey(e => e.ID)
                .HasName("PK_dbo.Emails");

            builder.Property(property => property.body).HasColumnType("nvarchar(max)");
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
            builder.Property(property => property.lastAttempt).HasColumnType("datetime");
            builder.Property(property => property.RowVersion).IsRequired();
        }
    }    
    
    public class EmailWorkOrdersBuilder : IEntityTypeConfiguration<JoinWorkOrderEmail>
    {
        public void Configure(EntityTypeBuilder<JoinWorkOrderEmail> builder)
        {
            // This was part of the very first migration in old-Machete; a join table, but not meeting the reqs. of
            // join tables in EF Core; i.e., inheriting from record, and defining relationships. So, different.
            builder.ToTable("EmailWorkOrders");
            
//            builder.HasKey(key => key.EmailID)
//                .HasName("Email_ID");
//
//            builder.HasKey(key => key.WorkOrderID)
//                .HasName("WorkOrder_ID");
//
            builder.HasKey(key => new { key.EmailID, key.WorkOrderID })
                .HasName("PK_dbo.EmailWorkOrders");

            builder.HasOne(k => k.WorkOrder)
                .WithMany(d => d.JoinWorkOrderEmails)
                .HasForeignKey(k => k.EmailID)
                .HasConstraintName("FK_dbo.EmailWorkOrders_dbo.Emails_Email_ID")
                .IsRequired(true);
                
//            builder.HasOne(k => k.Email)
//                .WithOne()
//                .IsRequired(true);

            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class EmployerBuilder : IEntityTypeConfiguration<Employer>
    {
        public void Configure(EntityTypeBuilder<Employer> builder)
        {
            builder.HasKey(e => e.ID)
                .HasName("PK_dbo.Employers");
            
            builder.HasMany(e => e.WorkOrders)             //define the parent
                .WithOne(w => w.Employer).IsRequired(true) //define the virtual property
                .HasForeignKey(wo => wo.EmployerID)        //define the foreign key relationship
                .OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("Employers");
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
    
    public class EventBuilder : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(k => k.ID)
                .HasName("PK_dbo.Events");
            
            builder.HasOne(k => k.Person)
                .WithMany(e => e.Events)
                .HasForeignKey(k => k.PersonID)
                .HasConstraintName("FK_dbo.Events_dbo.Persons_PersonID")
                .IsRequired(true);

            builder.Property(property => property.dateFrom).HasColumnType("datetime");
            builder.Property(property => property.dateTo).HasColumnType("datetime");
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class ImageBuilder : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.HasKey(key => key.ID).HasName("PK_dbo.Images");
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
    
    public class JoinEventImageBuilder : IEntityTypeConfiguration<JoinEventImage>
    {
        public void Configure(EntityTypeBuilder<JoinEventImage> builder)
        {
            builder.ToTable("JoinEventImages");
            
            builder.HasKey(k => k.ID)
                .HasName("PK_dbo.JoinEventImages");
            
            builder.HasOne(k => k.Event)
                .WithMany(d => d.JoinEventImages)
                .HasForeignKey(k => k.EventID)
                .HasConstraintName("FK_dbo.JoinEventImages_dbo.Events_EventID")
                .IsRequired(true);
                
            builder.HasOne(k => k.Image)
                .WithOne() // TODO mistake? seems to work correctly....
                .HasConstraintName("FK_dbo.JoinEventImages_dbo.Images_ImageID")
                .IsRequired(true);
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class LookupsBuilder : IEntityTypeConfiguration<Lookup>
    {
        public void Configure(EntityTypeBuilder<Lookup> builder)
        {
            builder.HasKey(key => key.ID)
                .HasName("PK_dbo.Lookups");

            builder.Property(property => property.active)
                .HasDefaultValue(1)
                .IsRequired(true);
                
            builder.Property(property => property.emailTemplate).HasColumnType("nvarchar(max)");

            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
    
    
    public class PersonBuilder : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.Persons");

            builder.Property(p => p.ID)
                .ValueGeneratedOnAdd();
            
            builder.HasOne(p => p.Worker)
                .WithOne(w => w.Person)
                .HasForeignKey<Worker>(w => w.ID)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class ReportDefinitionBuilder : IEntityTypeConfiguration<ReportDefinition>
    {
        public void Configure(EntityTypeBuilder<ReportDefinition> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.ReportDefinitions");
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class ScheduleRuleBuilder : IEntityTypeConfiguration<ScheduleRule>
    {
        public void Configure(EntityTypeBuilder<ScheduleRule> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.ScheduleRules");
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
    
    public class TransportCostRuleBuilder : IEntityTypeConfiguration<TransportCostRule>
    {
        public void Configure(EntityTypeBuilder<TransportCostRule> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.TransportCostRules");

            builder.HasOne(k => k.transportRule)
                .WithMany(c => c.costRules)
                .HasForeignKey(k => k.transportRuleID)
                .HasConstraintName("FK_dbo.TransportCostRules_dbo.TransportRules_transportRuleID")
                .IsRequired(true);

            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class TransportProvidersAvailabilityBuilder : IEntityTypeConfiguration<TransportProviderAvailability>
    {
        public void Configure(EntityTypeBuilder<TransportProviderAvailability> builder)
        {
            //builder.ToTable("TransportProviderAvailabilities");
            
            builder.HasKey(k => k.ID).HasName("PK_dbo.TransportProviderAvailabilities");
            
            builder.HasOne(p => p.Provider)
                .WithMany(e => e.AvailabilityRules)
                .HasForeignKey(e => e.transportProviderID)
                .HasConstraintName("FK_dbo.TransportProviderAvailabilities_dbo.TransportProviders_transportProviderID");

            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
    
    public class TransportProviderBuilder : IEntityTypeConfiguration<TransportProvider>
    {
        public void Configure(EntityTypeBuilder<TransportProvider> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.TransportProviders");
            
//            // does it??
//            builder.HasMany(e => e.AvailabilityRules)      // define the parent.
//                .WithOne(w => w.Provider).IsRequired(true) // define the EF Core virtual property.
//                .HasForeignKey(w => w.transportProviderID) // define the foreign key constraint.
//                .OnDelete(DeleteBehavior.Cascade);
                
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
    
    public class TransportRuleBuilder : IEntityTypeConfiguration<TransportRule>
    {
        public void Configure(EntityTypeBuilder<TransportRule> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.TransportRules");
            
//            // does it??
//            builder.HasMany(c => c.costRules)
//                .WithOne(r => r.transportRule).IsRequired(true)
//                .HasForeignKey(k => k.transportRuleID)
//                .HasConstraintName("")
//                .OnDelete(DeleteBehavior.Cascade);
                
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class WorkAssignmentBuilder : IEntityTypeConfiguration<WorkAssignment>
    {
        public void Configure(EntityTypeBuilder<WorkAssignment> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.WorkAssignments");
            
            builder.HasOne(k => k.workOrder)
                .WithMany(a => a.workAssignments)
                .HasForeignKey(a => a.workOrderID)
                .IsRequired(true);
            builder.ToTable("WorkAssignments");
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class WorkerBuilder : IEntityTypeConfiguration<Worker>
    {
        public void Configure(EntityTypeBuilder<Worker> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.Workers");
            // skipping weird IX_ID

            // Ugh. It creates this on its own but does not want to play ball with the fluent API. Difference is the name.
            builder.HasOne(worker => worker.Person)
                .WithOne(person => person.Worker)
                .HasForeignKey<Worker>(worker => worker.ID)
                .HasConstraintName("FK_dbo.Workers_dbo.Persons_ID")
                .IsRequired(true);

            // actually I do not see these but don't want to touch it
            // 
            builder.HasMany(s => s.workersignins)
                .WithOne(s => s.worker).IsRequired(false)
                .HasForeignKey(s => s.WorkerID);    
            builder.HasMany(a => a.workAssignments)
                .WithOne(a => a.workerAssigned).IsRequired(false)
                .HasForeignKey(a => a.workerAssignedID);
            //
            //////

            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class WorkerRequestBuilder : IEntityTypeConfiguration<WorkerRequest>
    {
        public void Configure(EntityTypeBuilder<WorkerRequest> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.WorkerRequests");

            builder.HasOne(request => request.workerRequested)
                .WithOne()
                .HasForeignKey<WorkerRequest>(request => request.WorkerID)
                .HasConstraintName("FK_dbo.WorkerRequests_dbo.Workers_WorkerID")
                .IsRequired(true);

            builder.HasOne(request => request.workOrder)
                .WithMany(workOrder => workOrder.workerRequests)
                .HasForeignKey(s => s.WorkOrderID)
                .HasConstraintName("FK_dbo.WorkerRequests_dbo.WorkOrders_WorkOrderID")
                .IsRequired(false);    

            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class WorkerSigninBuilder : IEntityTypeConfiguration<WorkerSignin>
    {
        public void Configure(EntityTypeBuilder<WorkerSignin> builder)
        {
            builder.HasKey(k => k.ID).HasName("PK_dbo.WorkerSignins");
            
            // wtf?
            builder.Property(x => x.ID);

            builder.HasOne(one => one.worker)
                .WithMany(worker => worker.workersignins)
                .HasForeignKey(workerSignin => workerSignin.WorkerID)
                .IsRequired(true);
            
            builder.Property(property => property.dateforsignin).HasColumnType("datetime");
            builder.Property(property => property.lottery_timestamp).HasColumnType("datetime");
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }

    public class WorkOrderBuilder : IEntityTypeConfiguration<WorkOrder>
    {
        public void Configure(EntityTypeBuilder<WorkOrder> builder)
        {
            builder.ToTable("WorkOrders");

            builder.HasKey(k => k.ID).HasName("PK_dbo.WorkOrders");

            builder.HasOne(p => p.Employer)
                .WithMany(e => e.WorkOrders)
                .HasForeignKey(e => e.EmployerID)
                .HasConstraintName("FK_dbo.WorkOrders_dbo.Employers_EmployerID")
                .IsRequired(true);
            
            builder.Property(property => property.datecreated).HasColumnType("datetime");
            builder.Property(property => property.dateupdated).HasColumnType("datetime");
        }
    }
}
