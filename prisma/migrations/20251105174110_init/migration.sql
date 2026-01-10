BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[M100_Company] (
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
CREATE TABLE [dbo].[M200_Office] (
    [CompanyCode] VARCHAR(5) NOT NULL,
    [OfficeCode] VARCHAR(5) NOT NULL,
    [OfficeName] NVARCHAR(50),
    [DelFlag] BIT NOT NULL,
    [CreateDateTime] DATETIME NOT NULL,
    [CreateUserId] VARCHAR(10) NOT NULL,
    [UpdateDateTime] DATETIME NOT NULL,
    [UpdateUserId] VARCHAR(10) NOT NULL,
    CONSTRAINT [M200_Office_pkey] PRIMARY KEY CLUSTERED ([CompanyCode],[OfficeCode])
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
