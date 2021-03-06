#region COPYRIGHT
// File:     ImageController.cs
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

using Machete.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Machete.Web.Controllers
{
        public class ImageController : MacheteController
    {
        private readonly IImageService serv;

        // GET: /Image/
        public ImageController(IImageService imageService)
        {
            serv = imageService;
        }

        /// <summary>
        /// Gets an image from the database as file content.
        /// </summary>
        /// <param name="ID">The database ID of the image to be retrieved.</param>
        /// <returns></returns>
        [Authorize(Roles = "PhoneDesk, Manager, Teacher, Administrator, Check-in")]
        public FileContentResult GetImage(int ID)
        {
            if (ID == 0) return null;

            var image = serv.Get(ID);
            return File(image.ImageData, image.ImageMimeType, image.filename);
        }
    }
}
