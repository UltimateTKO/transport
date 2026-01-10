import { prisma } from "@/libs/prisma";
import Orders001Client from "@/components/orders/Orders001Client";
import { fetchPrefectures, fetchCities } from "@/app/api/orders/Orders001Action";
import {
	getM020_OfficePromise,
	getM030_ClientPromise,
	getM040_StartEndPromise,
	getM050_ItemGroupPromise,
	getM060_ViecleTypePromise,
	getM070_ViecleLoadsPromise,
} from "@/libs/MasterDataAccess";

type OrdersPanelProps = {
	groupId?: string;
	childId?: string;
};

export async function Orders001Panel(props: OrdersPanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;
	// 現在の日時（ローカルタイム）を取得
	const today = new Date();
	// 現在の時刻からタイムゾーン差（分）をミリ秒に変換して補正し、ローカルの日付（YYYY-MM-DD）を ISO形式と同じ形で正しく取得する
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

	const {
		officeList,
		clientList,
		startList,
		endList,
		itemGroupList,
		vehicleTypeList,
		vehicleLoadsList,
		prefecturesList,
	} = await getMasterData();
	return (
		<Orders001Client
			localDate={localDate}
			officeList={officeList}
			clientList={clientList}
			startList={startList}
			endList={endList}
			itemGroupList={itemGroupList}
			vehicleTypeList={vehicleTypeList}
			vehicleLoadsList={vehicleLoadsList}
			defaultVehicleCount={1}
			prefecturesList={prefecturesList}
		/>
	);
}

// マスタデータ取得関数
async function getMasterData() {
	// Prisma のクエリを並列実行
	const [
		m020List,
		m030List,
		m040StartList,
		m040EndList,
		m050ItemGroupList,
		m060VehicleTypeList,
		m070VehicleLoadsList,
		prefecturesList,
	] = await Promise.all([
		// M020_Officeのデータ取得
		getM020_OfficePromise(),
		// M030_Clientのデータ取得
		getM030_ClientPromise(),
		// M040_StartEndのデータ取得（出荷元用）
		getM040_StartEndPromise(["0", "1"], true),
		// M040_StartEndのデータ取得（出荷先用）
		getM040_StartEndPromise(["0", "2"], true),
		// M050_Productのデータ取得（品群用）
		getM050_ItemGroupPromise(),
		// M060_ViecleTypeのデータ取得（車輛種別用）
		getM060_ViecleTypePromise(),
		// M070_ViecleLoadのデータ取得（車輛積載量用）
		getM070_ViecleLoadsPromise(),
		fetchPrefectures(),
	]);

	// M020リスト化
	const officeList = m020List.map((obj) => ({
		key: obj.OfficeCode,
		value: obj.OfficeName ?? "",
	}));

	// M030リスト化
	const clientList = m030List.map((obj) => ({
		key: obj.ClientCode,
		value: obj.ClientName ?? "",
	}));

	// M040リスト化（出荷元用）
	const startList = m040StartList.map((obj) => ({
		key: obj.StartEndCode,
		value: obj.Office?.OfficeName ?? "",
	}));

	// M040リスト化（出荷先用）
	const endList = m040EndList.map((obj) => ({
		key: obj.StartEndCode,
		value: obj.Office?.OfficeName ?? "",
	}));

	// M050リスト化（品群用）
	const itemGroupList = m050ItemGroupList.map((obj) => ({
		key: obj.ItemGroupCode,
		value: obj.ItemGroupName ?? "",
	}));

	// M060リスト化（車輛種別用）
	const vehicleTypeList = m060VehicleTypeList.map((obj) => ({
		key: obj.ViecleTypeCode,
		value: obj.ViecleTypeName ?? "",
	}));

	// M070リスト化（車輛積載量用）
	const vehicleLoadsList = m070VehicleLoadsList.map((obj) => ({
		key: obj.ViecleLoadsCode,
		value: obj.ViecleLoadsName ?? "",
	}));

	return {
		officeList,
		clientList,
		startList,
		endList,
		itemGroupList,
		vehicleTypeList,
		vehicleLoadsList,
		prefecturesList,
	};
}
