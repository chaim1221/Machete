﻿using Machete.Domain;
using Machete.Service;
using System;

namespace Machete.Test.Integration
{
    public partial class FluentRecordBase : IDisposable
    {
        private IWorkerSigninService _servWSI;
        private WorkerSignin _wsi;

        public FluentRecordBase AddWorkerSignin(
            Worker worker = null
        //DateTime? datecreated = null,
        //DateTime? dateupdated = null
        )
        {
            //
            // DEPENDENCIES
            //_servWSI = container.Resolve<IWorkerSigninService>();
            if (worker != null) _w = worker;
            if (_w == null) AddWorker();
            //
            // ARRANGE

            //
            // ACT
            _wsi = _servWSI.CreateSignin(_w.dwccardnum, DateTime.Now, _user);
            return this;
        }

        public WorkerSignin ToWorkerSignin()
        {
            if (_wsi == null) AddWorkerSignin();
            return _wsi;
        }


    }
}
