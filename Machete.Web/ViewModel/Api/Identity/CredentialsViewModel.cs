using System;

namespace Machete.Api.Identity.ViewModels {
    public class CredentialsViewModel {
        public string Password { get; set; }
        public string UserName { get; set; }
        public string RedirectUri { get; set; }
        public bool Remember { get; set; }
    }
}
