#region COPYRIGHT
// File:     WorkOrderControllerTests.cs
// Author:   Savage Learning, LLC.
// Created:  2012/06/17 
// License:  GPL v3
// Project:  Machete.Test.Old
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
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Machete.Data.Infrastructure;
using Machete.Domain;
using Machete.Service;
using Machete.Web.Controllers;
using Machete.Web.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Primitives;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Machete.Test.UnitTests.Controllers
{
    /// <summary>
    /// Summary description for WorkOrderControllerUnitTests
    /// </summary>

    [TestClass]
    public class WorkOrderTests
    {
        Mock<IWorkOrderService> serv;
        Mock<IEmployerService> empServ;
        Mock<IWorkAssignmentService> waServ;
        Mock<IWorkerService> reqServ;
        Mock<IWorkerRequestService> wrServ;
        Mock<IDefaults> def;
        Mock<IMapper> map;
        Mock<IDatabaseFactory> dbfactory;
        FormCollection _fakeform;
        List<WorkerRequest> workerRequest;
        WorkOrderController _ctrlr;
        int testid = 4242;
        //
        [TestInitialize]
        public void TestInitialize()
        {
            var fakeFormValues = new Dictionary<string, StringValues>();
            fakeFormValues.Add("ID", testid.ToString());
            fakeFormValues.Add("workSiteAddress1", "blah");     //Every required field must be populated,
            fakeFormValues.Add("city", "UnitTest");  //or result will be null.
            fakeFormValues.Add("state", "WA");
            fakeFormValues.Add("phone", "123-456-7890");
            fakeFormValues.Add("zipcode", "12345-6789");
            fakeFormValues.Add("typeOfWorkID", "1");
            fakeFormValues.Add("dateTimeofWork", "1/1/2011");
            fakeFormValues.Add("transportMethodID", "1");
            fakeFormValues.Add("transportFee", "20.00");
            fakeFormValues.Add("transportFeeExtra", "8.00");
            fakeFormValues.Add("status", "43"); // active work order
            fakeFormValues.Add("contactName", "test script contact name");
            //fakeformValues.Add("workerRequests", "30123,301234,30122,12345");
            
            _fakeform = new FormCollection(fakeFormValues);
            
            serv = new Mock<IWorkOrderService>();
            empServ = new Mock<IEmployerService>();
            waServ = new Mock<IWorkAssignmentService>();
            reqServ = new Mock<IWorkerService>();
            wrServ = new Mock<IWorkerRequestService>();
            def = new Mock<IDefaults>();
            map = new Mock<IMapper>();
            workerRequest = new List<WorkerRequest> { };
            dbfactory = new Mock<IDatabaseFactory>();
            _ctrlr = new WorkOrderController(serv.Object, def.Object, map.Object);
            _ctrlr.SetFakeControllerContext();
            // TODO: Include Lookups in Dependency Injection, remove initialize statements
        }
        //
        //   Testing /Index functionality
        //
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        public void index_get_returns_enumerable_list()
        {
            var result = (ViewResult)_ctrlr.Index();
            Assert.IsInstanceOfType(result, typeof(ActionResult));
        }
        //
        //   Testing /Create functionality
        //
        #region createtests
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        public void create_get_returns_workOrder()
        {
            // Arrange
            var vmwo = new Machete.Web.ViewModel.WorkOrder();
            map.Setup(x => x.Map<Domain.WorkOrder, Machete.Web.ViewModel.WorkOrder>(It.IsAny<Domain.WorkOrder>()))
                .Returns(vmwo);
            // Act
            var result = (PartialViewResult)_ctrlr.Create(0);
            // ASsert
            Assert.IsInstanceOfType(result.ViewData.Model, typeof(Web.ViewModel.WorkOrder));
        }

        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        public async Task create_valid_post_returns_JSON()
        {
            //Arrange
            var workOrder = new WorkOrder();
            var _model = new WorkOrder();
            var vmwo = new Machete.Web.ViewModel.WorkOrder();
            map.Setup(x => x.Map<Domain.WorkOrder, Machete.Web.ViewModel.WorkOrder>(It.IsAny<Domain.WorkOrder>()))
                .Returns(vmwo);
            serv.Setup(p => p.Create(workOrder, null, "UnitTest", null)).Returns(() => workOrder);
            //_ctrlr.ValueProvider = _fakeform.ToValueProvider();
            //Act
            var result = await _ctrlr.Create(workOrder, "UnitTest") as JsonResult;
            //Assert
            Assert.IsInstanceOfType(result, typeof(JsonResult));
            //Assert.AreEqual(result.Data.ToString(), "{ sNewRef = /WorkOrder/Edit/4242, sNewLabel = Order #: 04242 @ blah, iNewID = 4242 }");
        }

        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        [ExpectedException(typeof(InvalidOperationException), "An invalid UpdateModel was inappropriately allowed.")]
        public async Task create_post_invalid_throws_exception()
        {
            //Arrange
            var workOrder = new WorkOrder();
            serv.Setup(p => p.Create(workOrder, null, "UnitTest", null)).Returns(workOrder);
            //_fakeform.Remove("contactName");
            //_ctrlr.ValueProvider = _fakeform.ToValueProvider();
            //Act
            await _ctrlr.Create(workOrder, "UnitTest");
            //Assert
        }
        #endregion
        //
        //   Testing /Edit functionality
        //
        #region edittests
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        public void edit_get_returns_workOrder()
        {

            //Arrange
            var vmwo = new Machete.Web.ViewModel.WorkOrder();
            map.Setup(x => x.Map<Domain.WorkOrder, Machete.Web.ViewModel.WorkOrder>(It.IsAny<Domain.WorkOrder>()))
                .Returns(vmwo);
            int testid = 4242;
            WorkOrder fakeworkOrder = new WorkOrder();
            fakeworkOrder.workerRequests = workerRequest;
            serv.Setup(p => p.Get(testid)).Returns(fakeworkOrder);
            //Act
            var result = (PartialViewResult)_ctrlr.Edit(testid);
            //Assert
            Assert.IsInstanceOfType(result.ViewData.Model, typeof(Web.ViewModel.WorkOrder));
        }

        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        public void edit_post_valid_updates_model_redirects_to_index()
        {
            //Arrange
            int testid = 4242;
            WorkOrder fakeworkOrder = new WorkOrder();
            fakeworkOrder.workerRequests = workerRequest;
            WorkOrder savedworkOrder = new WorkOrder();
            List<WorkerRequest> savedList;
            string user = "";
            serv.Setup(p => p.Get(testid)).Returns(fakeworkOrder);
            serv.Setup(x => x.Save(It.IsAny<WorkOrder>(),
                                          It.IsAny<List<WorkerRequest>>(),
                                          It.IsAny<string>())
                                         ).Callback((WorkOrder p, List<WorkerRequest> wr, string str) =>
                                         {
                                             savedworkOrder = p;
                                             savedList = wr;
                                             user = str;
                                         });
            _ctrlr.SetFakeControllerContext();
            //_ctrlr.ValueProvider = _fakeform.ToValueProvider();
            //Act
            List<WorkerRequest> list = new List<WorkerRequest>();
            list.Add(new WorkerRequest { WorkerID = 12345 });
            list.Add(new WorkerRequest { WorkerID = 30002 });
            list.Add(new WorkerRequest { WorkerID = 30311 });
            list.Add(new WorkerRequest { WorkerID = 30420 });
            list.Add(new WorkerRequest { WorkerID = 30421 });
            var result = _ctrlr.Edit(testid, "UnitTest", list);
            //Assert
            //Assert.AreEqual("Index", result.RouteValues["action"]);
            Assert.AreEqual(fakeworkOrder, savedworkOrder);
            Assert.AreEqual(savedworkOrder.workSiteAddress1, "blah");
            Assert.AreEqual(savedworkOrder.city, "UnitTest");
            Assert.AreEqual(savedworkOrder.state, "WA");
            Assert.AreEqual(savedworkOrder.phone, "123-456-7890");
            Assert.AreEqual(savedworkOrder.zipcode, "12345-6789");
            Assert.AreEqual(savedworkOrder.typeOfWorkID, 1);
            Assert.AreEqual(savedworkOrder.dateTimeofWork, Convert.ToDateTime("1/1/2011 12:00:00 AM"));
            Assert.AreEqual(savedworkOrder.transportMethodID, 1);
            Assert.AreEqual(savedworkOrder.transportFee, Convert.ToDouble("20.00"));
            //Assert.AreEqual(savedworkOrder.workerRequests.Count(), 5);

        }

        /// <summary>
        /// 
        /// </summary>
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        [ExpectedException(typeof(InvalidOperationException),
            "An invalid UpdateModel was inappropriately allowed.")]
        public void edit_post_invalid_throws_exception()
        {
            //Arrange
            var workOrder = new WorkOrder();
            workOrder.workerRequests = workerRequest;
            int testid = 4243;
            //
            // Mock service and setup SaveWorkOrder mock
            serv.Setup(p => p.Get(testid)).Returns(workOrder);
            //
            // Mock HttpContext so that ModelState and FormCollection work
            //_fakeform.Remove("contactName");
            //_ctrlr.ValueProvider = _fakeform.ToValueProvider();
            //
            //Act
            List<WorkerRequest> list = new List<WorkerRequest>();
            _ctrlr.Edit(testid, "UnitTest", list);
            //Assert

        }
        #endregion
        #region delete tests
        /// <summary>
        /// delete GET returns workOrder
        /// </summary>
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        public void delete_get_returns_JSON()
        {
            //Arrange
            int testid = 4242;
            WorkOrder fakeworkOrder = new WorkOrder();
            serv.Setup(p => p.Get(testid)).Returns(fakeworkOrder);
            //Act
            JsonResult result = (JsonResult)_ctrlr.Delete(testid, "test user");
            //Assert
            IDictionary<string,object> data = new RouteValueDictionary(result.Value);
            Assert.AreEqual("OK", data["status"]);
            Assert.AreEqual(4242, data["deletedID"]);
            
        }
        /// <summary>
        /// delete POST redirects to index
        /// </summary>
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.WorkOrders)]
        public void delete_post_returns_json()
        {
            //Arrange
            int testid = 4242;
            //FormCollection fakeform = new FormCollection();
             _ctrlr.SetFakeControllerContext();
            //_ctrlr.ValueProvider = fakeform.ToValueProvider();
            //Act
            var result = _ctrlr.Delete(testid, "UnitTest") as JsonResult;
            //Assert
            Assert.AreEqual(result.Value.ToString(), "{ status = OK, deletedID = 4242 }");
        }
        #endregion
    }
}
