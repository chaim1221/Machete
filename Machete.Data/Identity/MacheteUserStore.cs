using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Machete.Data.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Machete.Data.Identity
{
    /// <summary>
    /// This is basically a data access repository for the Identity User Store. We are overriding the default UserStore
    /// because Identity does not support multitenancy out of the box.
    /// </summary>
    public class MacheteUserStore : IUserStore<MacheteUser>, 
                                  //IUserClaimStore<MacheteUser>, // nec. for JWT
                                  IUserLoginStore<MacheteUser>,
                                  IUserRoleStore<MacheteUser>,
                                  IUserPasswordStore<MacheteUser>,
                                  //IUserTwoFactorStore<MacheteUser>,
                                  IUserEmailStore<MacheteUser>//,
                                  //IUserLockoutStore<MacheteUser>,
                                  //IQueryableUserStore<MacheteUser>
    {
        private MacheteContext _dataContext;
        private DbSet<MacheteUser> _users; // IDbSet (Framework)
    
        public MacheteUserStore(IDatabaseFactory factory)
        {
            _dataContext = factory.Get(); // should have its own _tenantService
            _users = _dataContext.Users;
        }
    
        public Task<string> GetUserIdAsync(MacheteUser user,
                                           CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.Id.ToString());
        }

        public Task<string> GetUserNameAsync(MacheteUser user,
                                             CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.UserName);
        }

        public Task SetUserNameAsync(MacheteUser user, string userName,
                                     CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.UserName = userName;
            //user.NormalizedUserName = userName.ToUpper();
            
            _users.Update(user);

            _dataContext.SaveChanges();
            
            return Task.FromResult(user.UserName);
        }

        public Task<string> GetNormalizedUserNameAsync(MacheteUser user,
                                                       CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.NormalizedUserName);
        }

        public Task SetNormalizedUserNameAsync(MacheteUser user, string normalizedName,
                                               CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.NormalizedUserName = normalizedName;

            _users.Update(user);

            //_dataContext.SaveChanges();
            
            return Task.FromResult(user.NormalizedUserName);
        }

        public Task<IdentityResult> CreateAsync(MacheteUser user,
                                                CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user)); // new up your own; follows pattern?

            var unused = _users.Add(user);

            _dataContext.SaveChanges();

            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> UpdateAsync(MacheteUser user,
                                                CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            var unused = _users.Update(user);

            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> DeleteAsync(MacheteUser user,
                                                CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            var unused = _users.Remove(user);
            
            return Task.FromResult(IdentityResult.Success);
        }

        public Task<MacheteUser> FindByIdAsync(string userId,
                                               CancellationToken cancellationToken = default(CancellationToken))
        {
            var user = _users.FirstOrDefault(x => x.Id == userId);           
            //if (user == null) throw new NullReferenceException("User not found.");
            
            return Task.FromResult(user);
        }

        public Task<MacheteUser> FindByNameAsync(string normalizedUserName,
                                                 CancellationToken cancellationToken = default(CancellationToken))
        {
            var macheteUsers = _users.Where(u => u.NormalizedUserName == normalizedUserName);
            if (macheteUsers.Count() > 1) throw new Exception("Attempted to find unique username, but found multiple.");
            
            return Task.FromResult(macheteUsers.FirstOrDefault());
        }
        
        public Task SetPasswordHashAsync(MacheteUser user, string passwordHash, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (passwordHash == null) throw new ArgumentNullException(nameof(passwordHash));

            user.PasswordHash = passwordHash;

            _users.Update(user);

            _dataContext.SaveChanges();
            
            return Task.FromResult<object>(null);
        }

        public Task<string> GetPasswordHashAsync(MacheteUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(MacheteUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return String.IsNullOrEmpty(user.PasswordHash) ? Task.FromResult(false) : Task.FromResult(true);
        }
        
        public Task AddLoginAsync(MacheteUser user, UserLoginInfo login, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            _users.Add(user);

            _dataContext.SaveChanges();

            return Task.CompletedTask;
        }

        public Task RemoveLoginAsync(MacheteUser user, string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            _users.Remove(user);

            _dataContext.SaveChanges();
            
            return Task.CompletedTask;
        }

        public Task<IList<UserLoginInfo>> GetLoginsAsync(MacheteUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult((IList<UserLoginInfo>) user.Logins);
        }

        public Task<MacheteUser> FindByLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var macheteUser = _users.FirstOrDefault(user =>
                user.Logins.Any(login => login.LoginProvider == loginProvider && login.ProviderKey == providerKey));
            
            if (macheteUser == null) throw new Exception($"User not found for login provider: {loginProvider}");
            
            return Task.FromResult(macheteUser);
        }

        public Task AddToRoleAsync(MacheteUser user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            var identityRole = _dataContext.Roles.FirstOrDefault(role => role.Name == roleName);
            
            if (identityRole == null) throw new Exception($"Role not found: {roleName}.");
            
            user.Roles.Add(identityRole);

            _users.Update(user);
            
            return Task.CompletedTask;
        }

        public Task RemoveFromRoleAsync(MacheteUser user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            var identityRole = _dataContext.Roles.FirstOrDefault(role => role.Name == roleName);

            user.Roles.Remove(identityRole);

            _users.Update(user);
            
            return Task.CompletedTask;
        }

        public Task<IList<string>> GetRolesAsync(MacheteUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));
            
            return Task.FromResult<IList<string>>(user.Roles.Select(x => x.Name).ToList());
        }

        public Task<bool> IsInRoleAsync(MacheteUser user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));
            
            return Task.FromResult(user.IsInRole(roleName));
        }

        public Task<IList<MacheteUser>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            var identityRole = _dataContext.Roles.FirstOrDefault(role => role.Name == roleName);
            var macheteUsers = _users.Where(user => user.Roles.Contains(identityRole)).ToList(); // lazy loading error?

            return Task.FromResult<IList<MacheteUser>>(macheteUsers);
        }

        public Task SetEmailAsync(MacheteUser user, string email, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.Email = email;

            _users.Update(user);

            return Task.CompletedTask;
        }

        public Task<string> GetEmailAsync(MacheteUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(MacheteUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.EmailConfirmed);
        }

        public Task SetEmailConfirmedAsync(MacheteUser user, bool confirmed, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.EmailConfirmed = confirmed;
            
            return Task.CompletedTask;
        }

        public Task<MacheteUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var possibleUsers = _users.Where(user => user.NormalizedEmail == normalizedEmail);
            
            if (possibleUsers.Count() > 1) 
                throw new Exception($"Multiple users matched email: {normalizedEmail}; contact your system administrator.");

            var macheteUser = possibleUsers.FirstOrDefault();
            
            //if (macheteUser == null) throw new NullReferenceException($"No users matched email: {normalizedEmail}");
            
            return Task.FromResult(macheteUser);
        }

        public Task<string> GetNormalizedEmailAsync(MacheteUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.NormalizedEmail);
        }

        public Task SetNormalizedEmailAsync(MacheteUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.NormalizedEmail = normalizedEmail;

            var unused = _users.Update(user);
            
            return Task.CompletedTask;
        }
        
        public void Dispose() { }
    }
}
