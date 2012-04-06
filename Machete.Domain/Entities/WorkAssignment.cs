﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Machete.Domain.Resources;

namespace Machete.Domain
{
    public class WorkAssignment : Record
    {
        //public int ID { get; set; }

        public int? workerAssignedID { get; set; }
        public virtual Worker workerAssigned { get; set; }

        public int workOrderID { get; set; }
        public virtual WorkOrder workOrder { get; set; }

        public int? workerSigninID { get; set; }
        public virtual WorkerSignin workerSiginin { get; set; }

        public bool active { get; set; }
        [LocalizedDisplayName("pseudoID", NameResourceType = typeof(Resources.WorkOrder))]
        public int? pseudoID { get; set; }
        [LocalizedDisplayName("description", NameResourceType = typeof(Resources.WorkAssignment))]        
        [StringLength(1000, ErrorMessageResourceName = "stringlength", ErrorMessageResourceType = typeof(Resources.WorkAssignment))]
        public string description { get; set; }
        //
        [Required(ErrorMessageResourceName = "englishLevelID", ErrorMessageResourceType = typeof(Resources.WorkAssignment))]
        [LocalizedDisplayName("englishLevelID", NameResourceType = typeof(Resources.WorkAssignment))]
        public int englishLevelID { get; set; }
        //
        [LocalizedDisplayName("skillID", NameResourceType = typeof(Resources.WorkAssignment))]
        [Required(ErrorMessageResourceName = "skillIDRequired", ErrorMessageResourceType = typeof(Resources.WorkAssignment))]
        public int skillID { get; set; }       
        //
        [LocalizedDisplayName("hourlyWage", NameResourceType = typeof(Resources.WorkAssignment))]
        [Required(ErrorMessageResourceName = "hourlyWagerequired", ErrorMessageResourceType = typeof(Resources.WorkAssignment))]
        [DisplayFormat(DataFormatString = "{0:c}", ApplyFormatInEditMode = true)]
        public double hourlyWage { get; set; }
        //
        [LocalizedDisplayName("hours", NameResourceType = typeof(Resources.WorkAssignment))]
        public int hours { get; set; }
        //
        [LocalizedDisplayName("hourRange", NameResourceType = typeof(Resources.WorkAssignment))]
        public int? hourRange { get; set; }
        //
        [LocalizedDisplayName("days", NameResourceType = typeof(Resources.WorkAssignment))]
        [Required(ErrorMessageResourceName = "daysrequired", ErrorMessageResourceType = typeof(Resources.WorkAssignment))]
        public int days { get; set; }
        //
        //Evaluation
        [LocalizedDisplayName("qualityOfWork", NameResourceType = typeof(Resources.WorkAssignment))]
        public int qualityOfWork { get; set; }

        [LocalizedDisplayName("followDirections", NameResourceType = typeof(Resources.WorkAssignment))]
        public int followDirections { get; set; }

        [LocalizedDisplayName("attitude", NameResourceType = typeof(Resources.WorkAssignment))]
        public int attitude { get; set; }

        [LocalizedDisplayName("reliability", NameResourceType = typeof(Resources.WorkAssignment))]
        public int reliability { get; set; }

        [LocalizedDisplayName("transportProgram", NameResourceType = typeof(Resources.WorkAssignment))]
        public int transportProgram { get; set; }

        [LocalizedDisplayName("comments", NameResourceType = typeof(Resources.WorkAssignment))]
        public string comments { get; set; }

        public string fullIDandName()
        {
            if (this.workerAssigned != null) return this.workerAssigned + " " + this.workerAssigned.Person.fullName();
            else return null;
        }

        public string getFullPseudoID()
        {
            string WONum;
            if (this.workOrder == null) WONum = "00000";
            else if (this.workOrder.paperOrderNum.HasValue) WONum = this.workOrder.paperOrderNum.ToString();
            else WONum = this.workOrderID.ToString();

            return System.String.Format("{0,5:D5}", WONum)
                    + "-" + (this.pseudoID.HasValue ?
                        System.String.Format("{0,2:D2}", this.pseudoID) :
                        System.String.Format("{0,5:D5}", this.ID));
        }
        public void incrPseudoID()
        {
            if (this.workOrder == null) throw new ArgumentNullException("workOrder object is null");            
            this.workOrder.waPseudoIDCounter++;
            this.pseudoID = this.workOrder.waPseudoIDCounter;
        }
    }
    public class WorkAssignmentSummary
    {
        public DateTime? date { get; set; }
        public int status { get; set; }
        public int count { get; set; }
    }
}