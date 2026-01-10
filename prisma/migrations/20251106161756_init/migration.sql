/*
  Warnings:

  - The primary key for the `M010_Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `RefernceMaster` on the `M040_StartEnd` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[M010_Company] DROP CONSTRAINT [M010_Company_pkey];
ALTER TABLE [dbo].[M010_Company] ALTER COLUMN [CompanyCode] VARCHAR(5) NOT NULL;
ALTER TABLE [dbo].[M010_Company] ADD CONSTRAINT M010_Company_pkey PRIMARY KEY CLUSTERED ([CompanyCode]);

-- AlterTable
ALTER TABLE [dbo].[M040_StartEnd] DROP COLUMN [RefernceMaster];
ALTER TABLE [dbo].[M040_StartEnd] ADD [OfficeCode] VARCHAR(5);

-- AddForeignKey
ALTER TABLE [dbo].[M020_Office] ADD CONSTRAINT [M020_Office_CompanyCode_fkey] FOREIGN KEY ([CompanyCode]) REFERENCES [dbo].[M010_Company]([CompanyCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[M030_Client] ADD CONSTRAINT [M030_Client_RefernceCompanyCode_fkey] FOREIGN KEY ([RefernceCompanyCode]) REFERENCES [dbo].[M010_Company]([CompanyCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[M040_StartEnd] ADD CONSTRAINT [M040_StartEnd_RefernceCompanyCode_fkey] FOREIGN KEY ([RefernceCompanyCode]) REFERENCES [dbo].[M010_Company]([CompanyCode]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[M040_StartEnd] ADD CONSTRAINT [M040_StartEnd_RefernceCompanyCode_OfficeCode_fkey] FOREIGN KEY ([RefernceCompanyCode], [OfficeCode]) REFERENCES [dbo].[M020_Office]([CompanyCode],[OfficeCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[M050_ItemGroup] ADD CONSTRAINT [M050_ItemGroup_RefernceCompanyCode_fkey] FOREIGN KEY ([RefernceCompanyCode]) REFERENCES [dbo].[M010_Company]([CompanyCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[M060_ViecleType] ADD CONSTRAINT [M060_ViecleType_RefernceCompanyCode_fkey] FOREIGN KEY ([RefernceCompanyCode]) REFERENCES [dbo].[M010_Company]([CompanyCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[M070_ViecleLoads] ADD CONSTRAINT [M070_ViecleLoads_RefernceCompanyCode_fkey] FOREIGN KEY ([RefernceCompanyCode]) REFERENCES [dbo].[M010_Company]([CompanyCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
