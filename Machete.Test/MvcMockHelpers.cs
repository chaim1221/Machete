#region COPYRIGHT
// File:     MvcMockHelpers.cs
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

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Routing;
using Moq;

//namespace Machete.Test
//{
    // update 2019: this needs to be retired in favor of using the standard dotnet core patterns for testing controllers
    // but I am hacking it together now for consistency. ~ce
    //
    // Scott Hanselman's MvcMockHelper. 
    // http://www.hanselman.com/blog/ASPNETMVCSessionAtMix08TDDAndMvcMockHelpers.aspx
    //
    // Used in Machete Controller Unit Tests
//    public static class MvcMockHelpers
//    {
//        public static void SetFakeControllerContext(this Controller controller)
//        {
//            var context1 = new Mock<HttpContext>();
//            var request = new Mock<HttpRequest>();
//            var response = new Mock<HttpResponse>();
//            var session = new Mock<HttpSessionState>();
//            var server = new Mock<HttpServerUtilityBase>();
//
//            context1.Setup(ctx => ctx.Request).Returns(request.Object);
//            context1.Setup(ctx => ctx.Response).Returns(response.Object);
//            context.Setup(ctx => ctx.Session).Returns(session.Object);
//            context.Setup(ctx => ctx.Server).Returns(server.Object);
//            var httpContext = context1.Object;
//            var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor()); // ERROR
//            var context = new ControllerContext(actionContext);
//            controller.ControllerContext = context;
//        }
//    }
//}