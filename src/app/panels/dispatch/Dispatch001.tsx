import { Button, Form } from "react-bootstrap";
import { CommonComboBox, CommonInputBox } from "@/components/CommonComponent";
import { prisma } from "@/libs/prisma";
import { Prisma, M020_Office, M030_Client, M040_StartEnd, M050_ItemGroup, M060_ViecleType, M070_ViecleLoads } from "@/generated/prisma";
import Dispatch001Client from "@/components/dispatch/Dispatch001Client";

type DispatchsPanelProps = {
	groupId?: string;
	childId?: string;
};

function RequiredMark() {
	return <span className="required-mark">■</span>;
}

export async function Dispatch001Panel(props: DispatchsPanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;
	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

	const { officeList, clientList, startList, endList, itemGroupList, vehicleTypeList, vehicleLoadsList } = await getMasterData();

	return (
		<Dispatch001Client
			localDate={localDate}
			officeList={officeList}
			clientList={clientList}
			startList={startList}
			endList={endList}
			itemGroupList={itemGroupList}
			vehicleTypeList={vehicleTypeList}
			vehicleLoadsList={vehicleLoadsList}
			defaultVehicleCount={1}
		/>
	);
}

// マスタデータ取得関数
async function getMasterData() {
	// M020_Officeのデータ取得
	const m020ListPromise = prisma.m020_Office.findMany({
		orderBy: { OfficeCode: "asc" },
	});
	// M030_Clientのデータ取得
	const m030ListPromise = prisma.m030_Client.findMany({
		orderBy: { ClientCode: "asc" },
	});
	// M040_StartEndのデータ取得（出荷元用）
	const m040StartListPromise = prisma.m040_StartEnd.findMany({
		where: { StartEndKbn: { in: ["0", "1"] } },
		include: { Office: true },
		orderBy: { StartEndCode: "asc" },
	});
	// M040_StartEndのデータ取得（出荷先用）
	const m040EndtListPromise = prisma.m040_StartEnd.findMany({
		where: { StartEndKbn: { in: ["0", "2"] } },
		include: { Office: true },
		orderBy: { StartEndCode: "asc" },
	});
	// M050_Productのデータ取得（品群用）
	const m050ItemGroupPromise = prisma.m050_ItemGroup.findMany({
		orderBy: { ItemGroupCode: "asc" },
	});
	// M060_ViecleTypeのデータ取得（車輛種別用）
	const m060VehicleTypePromise = prisma.m060_ViecleType.findMany({
		orderBy: { ViecleTypeCode: "asc" },
	});
	//M070_ViecleLoadのデータ取得（車輛積載量用）
	const m070VehicleLoadsPromise = prisma.m070_ViecleLoads.findMany({
		orderBy: { ViecleLoadsCode: "asc" },
	});

	// M020リスト化
	const officeList = (await m020ListPromise).map((obj) => ({
		key: obj.OfficeCode,
		value: obj.OfficeName ?? "",
	}));
	// M030リスト化
	const clientList = (await m030ListPromise).map((obj) => ({
		key: obj.ClientCode,
		value: obj.ClientName ?? "",
	}));
	// M040リスト化（出荷元用）
	const startList = (await m040StartListPromise).map((obj) => ({
		key: obj.StartEndCode,
		value: obj.Office?.OfficeName ?? "",
	}));
	// M040リスト化（出荷先用）
	const endList = (await m040EndtListPromise).map((obj) => ({
		key: obj.StartEndCode,
		value: obj.Office?.OfficeName ?? "",
	}));
	// M050リスト化（品群用）
	const itemGroupList = (await m050ItemGroupPromise).map((obj) => ({
		key: obj.ItemGroupCode,
		value: obj.ItemGroupName ?? "",
	}));
	// M060リスト化（車輛種別用）
	const vehicleTypeList = (await m060VehicleTypePromise).map((obj) => ({
		key: obj.ViecleTypeCode,
		value: obj.ViecleTypeName ?? "",
	}));
	// M070リスト化（車輛積載量用）
	const vehicleLoadsList = (await m070VehicleLoadsPromise).map((obj) => ({
		key: obj.ViecleLoadsCode,
		value: obj.ViecleLoadsName ?? "",
	}));

	return { officeList, clientList, startList, endList, itemGroupList, vehicleTypeList, vehicleLoadsList };
}
