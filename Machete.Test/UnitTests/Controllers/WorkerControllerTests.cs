#region COPYRIGHT
// File:     WorkerControllerTests.cs
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

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Machete.Data.Infrastructure;
using Machete.Service;
using Machete.Web.Controllers;
using Machete.Web.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ViewModel = Machete.Web.ViewModel;

namespace Machete.Test.UnitTests.Controllers
{
    [TestClass]
    public class WorkerTests
    {
        Mock<IWorkerService> _wserv;
        Mock<IPersonService> _pserv;
        Mock<IDatabaseFactory> dbfactory;
        Mock<IImageService> _iserv;
        Mock<IDefaults> def;
        Mock<IMapper> map;
        WorkerController _ctrlr;
        FormCollection _fakeform;
        [TestInitialize]
        public void TestInitialize()
        {
            _wserv = new Mock<IWorkerService>();
            _pserv = new Mock<IPersonService>();
            _iserv = new Mock<IImageService>();
            def = new Mock<IDefaults>();
            map = new Mock<IMapper>();
            dbfactory = new Mock<IDatabaseFactory>();
            _ctrlr = new WorkerController(_wserv.Object, _pserv.Object, _iserv.Object, def.Object, map.Object);
            _ctrlr.SetFakeControllerContext();
            var fakeFormValues = new Dictionary<string, StringValues>();
            fakeFormValues.Add("ID", "12345");
            fakeFormValues.Add("typeOfWorkID", "1");
            fakeFormValues.Add("RaceID", "1");
            fakeFormValues.Add("height", "1");
            fakeFormValues.Add("weight", "1");
            fakeFormValues.Add("englishlevelID", "1");
            fakeFormValues.Add("recentarrival", "true");
            fakeFormValues.Add("dateinUSA", "1/1/2000");
            fakeFormValues.Add("dateinseattle", "1/1/2000");
            fakeFormValues.Add("disabled", "true");
            fakeFormValues.Add("maritalstatus", "1");
            fakeFormValues.Add("livewithchildren", "true");
            fakeFormValues.Add("numofchildren", "1");
            fakeFormValues.Add("incomeID", "1");
            fakeFormValues.Add("livealone", "true");
            fakeFormValues.Add("emcontUSAname", "");
            fakeFormValues.Add("emcontUSAphone", "");
            fakeFormValues.Add("emcontUSArelation", "");
            fakeFormValues.Add("dwccardnum", "12345");
            fakeFormValues.Add("neighborhoodID", "1");
            fakeFormValues.Add("immigrantrefugee", "false");
            fakeFormValues.Add("countryoforiginID", "1");
            fakeFormValues.Add("emcontoriginname", "");
            fakeFormValues.Add("emcontoriginphone", "");
            fakeFormValues.Add("emcontoriginrelation", "");
            fakeFormValues.Add("memberexpirationdate", "1/1/2000");
            fakeFormValues.Add("driverslicense", "false");
            fakeFormValues.Add("licenseexpirationdate", "");
            fakeFormValues.Add("carinsurance", "false");
            fakeFormValues.Add("insuranceexpiration", "");
            fakeFormValues.Add("dateOfBirth", "1/1/2000");
            fakeFormValues.Add("dateOfMembership", "1/1/2000");
            // TODO: Include Lookups in Dependency Injection, remove initialize statements
            
            _fakeform = new FormCollection(fakeFormValues);
        }
        //
        //   Testing /Index functionality
        //
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.Workers)]
        public void index_get_WorkIndexViewModel()
        {
            //Arrange           
            //Act
            var result = (ViewResult)_ctrlr.Index();
            //Assert
            Assert.IsInstanceOfType(result, typeof(ViewResult));
        }

        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.Workers)]
        public void create_get_returns_worker()
        {
            //Arrange
            var p = new Machete.Web.ViewModel.Worker();
            map.Setup(x => x.Map<Domain.Worker, Machete.Web.ViewModel.Worker>(It.IsAny<Domain.Worker>()))
                .Returns(p);
            //Act
            var result = (PartialViewResult)_ctrlr.Create(0);
            //Assert
            Assert.IsInstanceOfType(result.ViewData.Model, typeof(Web.ViewModel.Worker));
        }

        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.Workers)]
        public async Task WorkerController_create_post_valid_returns_json()
        {
            //Arrange
            var w = new Machete.Web.ViewModel.Worker() {
                ID = 12345
            };
            map.Setup(x => x.Map<Domain.Worker, Web.ViewModel.Worker>(It.IsAny<Domain.Worker>()))
                .Returns(w);
            var _worker = new Domain.Worker();
            var _person = new Domain.Person();
            //
            _wserv.Setup(p => p.Create(_worker, "UnitTest")).Returns(_worker);
            _pserv.Setup(p => p.Create(_person, "UnitTest")).Returns(_person);
            //_ctrlr.ValueProvider = _fakeform.ToValueProvider();
            //Act
            var result = await _ctrlr.Create(_worker, "UnitTest", null) as JsonResult;
            
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(JsonResult));
            Assert.AreEqual("{ sNewRef = , sNewLabel = , iNewID = 12345, jobSuccess = True }",
                            result.Value.ToString());
        }
        // Commented otu because worker form is now (almost) entirely optional
        //[TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.Workers)]
        //[ExpectedException(typeof(InvalidOperationException),
        //    "An invalid UpdateModel was inappropriately allowed.")]
        //public void create_post_invalid_throws_exception()
        //{
        //    //Arrange
        //    var _worker = new Worker();

        //    fakeform.Remove("height");
        //    _ctrlr.ValueProvider = fakeform.ToValueProvider();
        //    //Act
        //    _ctrlr.Create(_worker, "UnitTest", null);
        //    //Assert
        //}

        //
        //   Testing /Edit functionality
        //
        #region edittests
        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.Workers)]
        public void edit_get_returns_worker()
        {
            //Arrange
            var ww = new ViewModel.Worker();
            map.Setup(x => x.Map<Domain.Worker, ViewModel.Worker>(It.IsAny<Domain.Worker>()))
                .Returns(ww);
            var worker = new Domain.Worker();
            var _person = new Domain.Person();
            int testid = 4242;
            Domain.Person fakeperson = new Domain.Person();
            _wserv.Setup(p => p.Get(testid)).Returns(worker);
            //Act
            var result = (PartialViewResult)_ctrlr.Edit(testid);
            //Assert
            Assert.IsInstanceOfType(result.ViewData.Model, typeof(Web.ViewModel.Worker));
        }

        [TestMethod, TestCategory(TC.UT), TestCategory(TC.Controller), TestCategory(TC.Workers)]
        public async Task edit_post_valid_updates_model_redirects_to_index()
        {
            //Arrange

            int testid = 4242;
//          Mock<HttpPostedFileBase> image = new Mock<HttpPostedFileBase>();
            FormCollection fakeform = _fakeCollection(testid);

            Domain.Worker fakeworker = new Domain.Worker();
            Domain.Worker savedworker = new Domain.Worker();
            Domain.Person fakeperson = new Domain.Person();
            fakeworker.Person = fakeperson;

            string user = "TestUser";
            _wserv.Setup(p => p.Get(testid)).Returns(fakeworker);
            _pserv.Setup(p => p.Get(testid)).Returns(fakeperson);
            _wserv.Setup(x => x.Save(It.IsAny<Domain.Worker>(),
                                          It.IsAny<string>())
                                         ).Callback((Domain.Worker p, string str) =>
                                         {
                                             savedworker = p;
                                             user = str;
                                         });

            _ctrlr.SetFakeControllerContext();
            //_ctrlr.ValueProvider = fakeform.ToValueProvider();
            //Act
            var result = await _ctrlr.Edit(testid, fakeworker, "UnitTest", null) as PartialViewResult;
            //Assert
            //Assert.AreEqual("Index", result.RouteValues["action"]);
            Assert.AreEqual(fakeworker, savedworker);
            Assert.AreEqual(savedworker.height, "UnitTest");
            Assert.AreEqual(savedworker.height, "UnitTest");
        }

        private FormCollection _fakeCollection(int id)
        {
            var formCollectionValues = new Dictionary<string, StringValues>();
            formCollectionValues.Add("ID", id.ToString());
            formCollectionValues.Add("firstname1", "blah_firstname");
            formCollectionValues.Add("lastname1", "unittest");
            formCollectionValues.Add("gender", "M");
            formCollectionValues.Add("typeOfWorkID", "1");          
            formCollectionValues.Add("RaceID", "1");     //Every required field must be populated,
            formCollectionValues.Add("height", "UnitTest");  //or result will be null.
            formCollectionValues.Add("weight", "UnitTest");
            formCollectionValues.Add("englishlevelID", "1");
            formCollectionValues.Add("dateinUSA", "1/1/2001");
            formCollectionValues.Add("dateinseattle", "1/1/2001");
            formCollectionValues.Add("dateOfBirth", "1/1/2001");
            formCollectionValues.Add("dateOfMembership", "1/1/2001");
            formCollectionValues.Add("maritalstatus", "1");
            formCollectionValues.Add("numofchildren", "1");
            formCollectionValues.Add("incomeID", "1");
            formCollectionValues.Add("dwccardnum", "12345");
            formCollectionValues.Add("neighborhoodID", "1");
            formCollectionValues.Add("countryoforigin", "1");
            formCollectionValues.Add("memberexpirationdate", "1/1/2002");
            
            return new FormCollection(formCollectionValues);
        }
        #endregion  
    }
}