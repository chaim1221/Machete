#region COPYRIGHT
// File:     mUIExtensions.cs
// Author:   Savage Learning, LLC.
// Created:  2012/06/25 
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
using System.Threading;
using Machete.Data;
using Machete.Data.Identity;
using Machete.Service;
using Machete.Web.ViewModel;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Machete.Web.Helpers
{
    public static class Extensions
    {
        public static string ToShortTextBoxDateString(this DateTime source)
        {
            return source == DateTime.MinValue ? "" : source.ToString("MM/dd/yyyy");
        }

        public static string ToShortTextBoxDateString(this DateTime? source)
        {
            return source == null ? "" : source.Value.ToString("MM/dd/yyyy");
        }

        //http://stackoverflow.com/questions/4649795/hiding-column-in-table-based-on-role-in-mvc
        public static bool IsInRole(this IHtmlHelper instance, params string[] roles)
        {
            var user = instance.ViewContext.HttpContext.User;
            return roles.Any(role => user.IsInRole(role));
        }

        public static void ThrowIfInvalid(this ModelStateDictionary modelState)
        {
            if (modelState.IsValid) return;
            var errors = modelState.Values.SelectMany(entry => entry.Errors).ToString();
            throw new InvalidOperationException(errors);
        }

        public static string getCI()
        {
            var upperInvariant = Thread.CurrentThread.CurrentUICulture.TwoLetterISOLanguageName.ToUpperInvariant();
            return upperInvariant;
        }


        public static UserSettingsViewModel ToUserSettingsViewModel(this MacheteUser u, MacheteContext context)
        {
            return new UserSettingsViewModel
            {
                ProviderUserKey = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                IsApproved = u.IsApproved ? "Yes" : "No",
                IsLockedOut = u.IsLockedOut ? "Yes" : "No",
                IsOnline = DbFunctions.DiffHours(u.LastLoginDate, DateTime.Now) < 1 ? "Yes" : "No",
                CreationDate = u.CreateDate,
                LastLoginDate = u.LastLoginDate,
                IsHirer = u.Roles.Contains(context.Roles.FirstOrDefault(role => role.Name == "Hirer"))
            };
        }
    }
}
