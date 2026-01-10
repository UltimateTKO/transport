/*
  Warnings:

  - You are about to drop the `M100_Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `M200_Office` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[M100_Company];

-- DropTable
DROP TABLE [dbo].[M200_Office];

-- CreateTable
CREATE TABLE [dbo].[M010_Company] (
    [CompanyCode] VARCHAR(3) NOT NULL,
    [CompanyName] NVARCHAR(50) NOT NULL,
    [DelFlg] BIT NOT NULL,
    [CreateDateTime] DATETIME,
    [CreateUserId] VARCHAR(10),
    [UpdateDateTime] DATETIME,
    [UpdateUserId] VARCHAR(10),
    CONSTRAINT [PK_M100_Company] PRIMARY KEY CLUSTERED ([CompanyCode])
);

-- CreateTable
CREATE TABLE [dbo].[M020_Office] (
    [CompanyCode] VARCHAR(5) NOT NULL,
    [OfficeCode] VARCHAR(5) NOT NULL,
    [OfficeName] NVARCHAR(50),
    [DelFlag] BIT NOT NULL,
    [CreateDateTime] DATETIME,
    [CreateUserId] VARCHAR(10),
    [UpdateDateTime] DATETIME,
    [UpdateUserId] VARCHAR(10),
    CONSTRAINT [M020_Office_pkey] PRIMARY KEY CLUSTERED ([CompanyCode],[OfficeCode])
);

-- CreateTable
CREATE TABLE [dbo].[M030_Client] (
    [RefernceCompanyCode] VARCHAR(5) NOT NULL,
    [ClientCode] VARCHAR(5) NOT NULL,
    [ClientName] NVARCHAR(50),
    [DelFlag] BIT NOT NULL,
    [CreateDateTime] DATETIME,
    [CreateUserId] VARCHAR(10),
    [UpdateDateTime] DATETIME,
    [UpdateUserId] VARCHAR(10),
    CONSTRAINT [M030_Client_pkey] PRIMARY KEY CLUSTERED ([RefernceCompanyCode],[ClientCode])
);

-- CreateTable
CREATE TABLE [dbo].[M040_StartEnd] (
    [RefernceCompanyCode] VARCHAR(5) NOT NULL,
    [StartEndCode] VARCHAR(5) NOT NULL,
    [StartEndKbn] VARCHAR(1),
    [RefernceMaster] VARCHAR(3) NOT NULL,
    [DelFlag] BIT NOT NULL,
    [CreateDateTime] DATETIME,
    [CreateUserId] VARCHAR(10),
    [UpdateDateTime] DATETIME,
    [UpdateUserId] VARCHAR(10),
    CONSTRAINT [M040_StartEnd_pkey] PRIMARY KEY CLUSTERED ([RefernceCompanyCode],[StartEndCode])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
