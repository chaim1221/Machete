
--
--
--

USE [_db]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [db_datareader].[View_AspNetUserRoles]
AS
SELECT AspNetUserRoles.userID, AspNetUsers.userName, AspNetUsers.mobileAlias, AspNetUsers.isAnonymous, AspNetUsers.lastActivityDate, AspNetUsers.email, AspNetUsers.loweredEmail, AspNetUsers.loweredUserName, AspNetUsers.passwordQuestion, AspNetUsers.isApproved, AspNetUsers.isLockedOut, AspNetUsers.lastLoginDate, AspNetUsers.lastPasswordChangedDate, AspNetUsers.lastLockoutDate, AspNetUsers.failedPasswordAttemptCount, AspNetUsers.failedPasswordAttemptWindowStart, AspNetUsers.failedPasswordAnswerAttemptCount, AspNetUsers.failedPasswordAnswerAttemptWindowStart, AspNetUsers.comment, AspNetUserRoles.roleID, AspNetRoles.name AS roleName
FROM AspNetUserRoles
LEFT JOIN AspNetUsers
ON AspNetUserRoles.userID = AspNetUsers.ID
LEFT JOIN AspNetRoles
ON AspNetUserRoles.roleID = AspNetRoles.ID
GO

--
--
--

USE [_db]
GO
create table [__EFMigrationsHistory]
(
   MigrationId    nvarchar(150) not null
       constraint PK___EFMigrationsHistory
           primary key,
   ProductVersion nvarchar(32)  not null
)
go
INSERT INTO [dbo].[__EFMigrationsHistory] (MigrationId, ProductVersion)
VALUES ('20190522011430_Prehistoric',   '2.2.4-servicing-10062')
GO


--
--
--

USE [_db]
GO
create table Center
(
    ID                        int          not null
        primary key,
    Name                      nvarchar(50) not null,
    Description               nvarchar(200),
    Address1                  nvarchar(50),
    Address2                  nvarchar(50),
    City                      nvarchar(25),
    State                     nvarchar(2),
    zipcode                   nvarchar(10),
    phone                     varchar(12),
    Center_contact_firstname1 varchar(50),
    Center_contact_lastname1  varchar(50)
)
go
