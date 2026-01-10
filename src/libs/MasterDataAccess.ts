import { prisma } from "@/libs/prisma";

/**
 * M020_Officeのデータ取得Promise
 */
export const getM020_OfficePromise = () =>
	prisma.m020_Office.findMany({
		orderBy: { OfficeCode: "asc" },
	});

/**
 * M030_Clientのデータ取得Promise
 */
export const getM030_ClientPromise = () =>
	prisma.m030_Client.findMany({
		orderBy: { ClientCode: "asc" },
	});

/**
 * M040_StartEndのデータ取得Promise
 * @param startEndKbn 出荷元・出荷先区分
 */
export const getM040_StartEndPromise = (startEndKbn: string[], officeInclude: boolean = false) =>
	prisma.m040_StartEnd.findMany({
		where: { StartEndKbn: { in: startEndKbn } },
		include: { Office: officeInclude },
		orderBy: { StartEndCode: "asc" },
	});

/**
 * M050_ItemGroupのデータ取得Promise
 */
export const getM050_ItemGroupPromise = () =>
	prisma.m050_ItemGroup.findMany({
		orderBy: { ItemGroupCode: "asc" },
	});

/**
 * M060_ViecleTypeのデータ取得Promise
 */
export const getM060_ViecleTypePromise = () =>
	prisma.m060_ViecleType.findMany({
		orderBy: { ViecleTypeCode: "asc" },
	});

/**
 * M070_ViecleLoadsのデータ取得Promise
 */
export const getM070_ViecleLoadsPromise = () =>
	prisma.m070_ViecleLoads.findMany({
		orderBy: { ViecleLoadsCode: "asc" },
	});
