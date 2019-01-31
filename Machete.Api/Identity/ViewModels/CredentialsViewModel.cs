using System;

namespace Machete.Api.Identity.ViewModels {
    public class CredentialsViewModel {
        public string Password { get; set; }
        public string UserName { get; set; }
        public bool Remember { get; set; }
        public string ClientId { get; set; }
        public string RedirectUri { get; set; }
        public string Response { get; set; }
        public string Scope { get; set; }
        public string State { get; set; }
        public string Nonce { get; set; }
    }
}
