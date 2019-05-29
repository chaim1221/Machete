#region COPYRIGHT
// File:     WorkAssignmentController.cs
// Author:   Savage Learning, LLC.
// Created:  2012/06/17 
// License:  GPL v3
// Project:  Machete.Web
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
using System.Threading.Tasks;
using AutoMapper;
using Machete.Domain;
using Machete.Service;
using Machete.Web.Helpers;
using Machete.Web.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkAssignment = Machete.Domain.WorkAssignment;
using WorkAssignmentsList = Machete.Service.DTO.WorkAssignmentsList;
using WorkerSignin = Machete.Domain.WorkerSignin;

namespace Machete.Web.Controllers
{
        public class WorkAssignmentController : MacheteController
    {
        private readonly IWorkAssignmentService waServ;
        private readonly IWorkOrderService woServ;
        private readonly IWorkerSigninService wsiServ;
        private readonly IMapper map;
        private readonly IDefaults def;
        private IModelBindingAdaptor _adaptor;

        public WorkAssignmentController(IWorkAssignmentService workAssignmentService,
            IWorkOrderService workOrderService,
            IWorkerSigninService signinService,
            IDefaults def,
            IMapper map,
            IModelBindingAdaptor adaptor)

        {
            waServ = workAssignmentService;
            woServ = workOrderService;
            wsiServ = signinService;
            this.map = map;
            this.def = def;
            _adaptor = adaptor;
        }
        
        protected override void Initialize(ActionContext requestContext)
        {
            base.Initialize(requestContext);
        }

        // GET: /WorkAssignment/
        [Authorize(Roles = "Administrator, Manager, PhoneDesk, Check-in")]
        public ActionResult Index()
        {
            var workAssignmentIndex = new WorkAssignmentIndex();
            workAssignmentIndex.todaysdate = $"{DateTime.Today:MM/dd/yyyy}";
            workAssignmentIndex.def = def;
            return View(workAssignmentIndex);
        }

        [Authorize(Roles = "Administrator, Manager, PhoneDesk, Check-in")]
        public ActionResult AjaxHandler(jQueryDataTableParam param)
        {
            //Get all the records            
            var vo = map.Map<jQueryDataTableParam, viewOptions>(param);
            dataTableResult<WorkAssignmentsList> was = waServ.GetIndexView(vo);
            var result = was.query
                .Select(e => map.Map<WorkAssignmentsList, ViewModel.WorkAssignmentsList>(e))
                .AsEnumerable();
            return Json(new
            {
                param.sEcho,
                iTotalRecords = was.totalCount,
                iTotalDisplayRecords = was.filteredCount,
                aaData = result
            });
        }          
        
        // GET: /WorkAssignment/Create
        [Authorize(Roles = "Administrator, Manager, PhoneDesk")]
        public ActionResult Create(int workOrderID, string description)
        {
            var wa = map.Map<WorkAssignment, ViewModel.WorkAssignment>(new WorkAssignment
            {
                active = true,
                workOrderID = workOrderID,
                skillID = def.getDefaultID(LCategory.skill),
                hours = def.hoursDefault,
                days = def.daysDefault,
                hourlyWage = def.hourlyWageDefault,
                description = description
            });
            wa.def = def;
            return PartialView("Create", wa);
        }
    
        // POST: /WorkAssignment/Create
        [HttpPost, UserNameFilter]
        [Authorize(Roles = "Administrator, Manager, PhoneDesk")]
        public async Task<ActionResult> Create(WorkAssignment assignment, string userName)
        {
            ModelState.ThrowIfInvalid();

            var modelIsValid = await _adaptor.TryUpdateModelAsync(this, assignment);
            if (modelIsValid) {
                assignment.workOrder = woServ.Get(assignment.workOrderID);
                var newAssignment = waServ.Create(assignment, userName);
                var result = map.Map<WorkAssignment, ViewModel.WorkAssignment>(newAssignment);
                return Json(new {
                    sNewRef = result.tabref,
                    sNewLabel = result.tablabel,
                    iNewID = result.ID
                });
            } else { return StatusCode(500); }
        }


        // POST: /WorkAssignment/Edit/5
        [HttpPost, UserNameFilter]
        [Authorize(Roles = "Administrator, Manager, PhoneDesk")]
        public ActionResult Duplicate(int id, string userName)
        {
            // TODO: Move duplication functionality to the service layer
            WorkAssignment _assignment = waServ.Get(id);
            WorkAssignment duplicate = (WorkAssignment)_assignment.Clone();
            duplicate.ID = 0;
            duplicate.workerAssigned = null;
            duplicate.workerAssignedID = null;
            duplicate.workerSiginin = null;
            duplicate.workerSigninID = null;
            var saved = waServ.Create(duplicate, userName);
            var result = map.Map<WorkAssignment, ViewModel.WorkAssignment>(saved);
            return Json(new
            {
                sNewRef = result.tabref,
                sNewLabel = result.tablabel,
                iNewID = result.ID
            });

        }

        [HttpPost, UserNameFilter]
        [Authorize(Roles = "Administrator, Manager")]
        public ActionResult Assign(int waid, int wsiid, string userName)
        {
            WorkerSignin signin = wsiServ.Get(wsiid);
            WorkAssignment assignment = waServ.Get(waid);
            waServ.Assign(assignment, signin, userName);

            return Json(new
            {
                jobSuccess = true
            });            
        }

        [HttpPost, UserNameFilter]
        [Authorize(Roles = "Administrator, Manager")]
        public JsonResult Unassign(int? waid, int? wsiid, string userName)
        {
            waServ.Unassign(waid, wsiid, userName);
            return Json(new
            {
                jobSuccess = true
            });
        }

        // GET: /WorkAssignment/Edit/5
        [Authorize(Roles = "Administrator, Manager, PhoneDesk")]
        public ActionResult Edit(int id)
        {
            WorkAssignment wa = waServ.Get(id);
            var m = map.Map<WorkAssignment, ViewModel.WorkAssignment>(wa);
            m.def = def;
            return PartialView("Edit", m);
        }

        // POST: /WorkAssignment/Edit/5
        [HttpPost, UserNameFilter]
        [Authorize(Roles = "Administrator, Manager, PhoneDesk")]
        public async Task<ActionResult> Edit(int id, int? workerAssignedID, string userName)
        {
            ModelState.ThrowIfInvalid();

            var workAssignment = waServ.Get(id);
            
            // hack, I think the entities might be configured wrong TODO
            workAssignment.workOrder = woServ.Get(workAssignment.workOrderID);
            
            if (await TryUpdateModelAsync(workAssignment)) {
                waServ.Save(workAssignment, workerAssignedID, userName);
                return Json(new {jobSuccess = true});
            } else { return Json(new { jobSuccess = false }); }
        }

        //
        // POST: /WorkAssignment/Delete/5
        [HttpPost, UserNameFilter]
        [Authorize(Roles = "Administrator, Manager, PhoneDesk")]
        public JsonResult Delete(int id, FormCollection collection, string user)
        {
            waServ.Delete(id, user);

            return Json(new
            {
                status = "OK",
                jobSuccess = true,
                deletedID = id
            });
        }
    }
}
