BEGIN TRY

BEGIN TRAN;

-- AlterTable
EXEC SP_RENAME N'dbo.PK_M100_Company', N'M010_Company_pkey';

-- CreateTable
CREATE TABLE [dbo].[M050_ItemGroup] (
    [RefernceCompanyCode] VARCHAR(5) NOT NULL,
    [ItemGroupCode] VARCHAR(5) NOT NULL,
    [ItemGroupName] NVARCHAR(50),
    [DelFlag] BIT NOT NULL,
    [CreateDateTime] DATETIME,
    [CreateUserId] VARCHAR(10),
    [UpdateDateTime] DATETIME,
    [UpdateUserId] VARCHAR(10),
    CONSTRAINT [M050_ItemGroup_pkey] PRIMARY KEY CLUSTERED ([RefernceCompanyCode],[ItemGroupCode])
);

-- CreateTable
CREATE TABLE [dbo].[M060_ViecleType] (
    [RefernceCompanyCode] VARCHAR(5) NOT NULL,
    [ViecleTypeCode] VARCHAR(5) NOT NULL,
    [ViecleTypeName] NVARCHAR(50),
    [DelFlag] BIT NOT NULL,
    [CreateDateTime] DATETIME,
    [CreateUserId] VARCHAR(10),
    [UpdateDateTime] DATETIME,
    [UpdateUserId] VARCHAR(10),
    CONSTRAINT [M060_ViecleType_pkey] PRIMARY KEY CLUSTERED ([RefernceCompanyCode],[ViecleTypeCode])
);

-- CreateTable
CREATE TABLE [dbo].[M070_ViecleLoads] (
    [RefernceCompanyCode] VARCHAR(5) NOT NULL,
    [ViecleLoadsCode] VARCHAR(5) NOT NULL,
    [ViecleLoadsName] NVARCHAR(50),
    [DelFlag] BIT NOT NULL,
    [CreateDateTime] DATETIME,
    [CreateUserId] VARCHAR(10),
    [UpdateDateTime] DATETIME,
    [UpdateUserId] VARCHAR(10),
    CONSTRAINT [M070_ViecleLoads_pkey] PRIMARY KEY CLUSTERED ([RefernceCompanyCode],[ViecleLoadsCode])
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
