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

using System;
using System.Collections.Specialized;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Routing;
using Moq;

namespace Machete.Test
{
    // update 2019: this needs to be retired in favor of using the standard dotnet core patterns for testing controllers
    // but I am hacking it together now for consistency. ~ce
    //
    // Scott Hanselman's MvcMockHelper. 
    // http://www.hanselman.com/blog/ASPNETMVCSessionAtMix08TDDAndMvcMockHelpers.aspx
    //
    // Used in Machete Controller Unit Tests
    public static class MvcMockHelpers
    {
        public static HttpContext FakeHttpContext()
        {
            var context = new Mock<HttpContext>();
            var request = new Mock<HttpRequest>();
            var response = new Mock<HttpResponse>();
            //var session = new Mock<HttpSessionState>();
            //var server = new Mock<HttpServerUtilityBase>();

            context.Setup(ctx => ctx.Request).Returns(request.Object);
            context.Setup(ctx => ctx.Response).Returns(response.Object);
            //context.Setup(ctx => ctx.Session).Returns(session.Object);
            //context.Setup(ctx => ctx.Server).Returns(server.Object);

            return context.Object;
        }

        public static HttpContext FakeHttpContext(string url)
        {
            HttpContext context = FakeHttpContext();
            context.Request.SetupRequestUrl(url);
            return context;
        }

        public static void SetFakeControllerContext(this Controller controller)
        {
            var httpContext = FakeHttpContext();
            var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor());
            var context = new ControllerContext(actionContext);
            controller.ControllerContext = context;
        }

        static string GetUrlFileName(string url)
        {
            if (url.Contains("?"))
                return url.Substring(0, url.IndexOf("?"));
            else
                return url;
        }

        static NameValueCollection GetQueryStringParameters(string url)
        {
            if (url.Contains("?"))
            {
                NameValueCollection parameters = new NameValueCollection();

                string[] parts = url.Split("?".ToCharArray());
                string[] keys = parts[1].Split("&".ToCharArray());

                foreach (string key in keys)
                {
                    string[] part = key.Split("=".ToCharArray());
                    parameters.Add(part[0], part[1]);
                }

                return parameters;
            }
            else
            {
                return null;
            }
        }

        public static void SetHttpMethodResult(this HttpRequest request, string httpMethod)
        {
            Mock.Get(request)
                .Setup(req => req.Method)
                .Returns(httpMethod);
        }

        public static void SetupRequestUrl(this HttpRequest request, string url)
        {
            if (url == null)
                throw new ArgumentNullException("url");

            if (!url.StartsWith("~/"))
                throw new ArgumentException("Sorry, we expect a virtual url starting with \"~/\".");

            var mock = Mock.Get(request);

            // totally hacked so it would just compile; should not be taken to reflect anything based in reality
            var queryString = new QueryString(GetQueryStringParameters(url).ToString());
            mock.Setup(req => req.QueryString)
                .Returns(queryString);
//            mock.Setup(req => req.AppRelativeCurrentExecutionFilePath)
//                .Returns(GetUrlFileName(url));
            mock.Setup(req => req.Path)
                .Returns(string.Empty);
        }
    }
}