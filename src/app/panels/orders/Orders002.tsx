import { Button, Form } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, CommonDateRangeBox, CommonInputBox } from "@/components/CommonComponent";
import OrdersNestedTable, { OrderRow } from "@/components/orders/Orders002Client";
import { prisma } from "@/libs/prisma";
import { getM020_OfficePromise, getM030_ClientPromise } from "@/libs/MasterDataAccess";
import React from "react";
import Orders002Client from "@/components/orders/Orders002Client";

type OrdersPanelProps = {
	groupId?: string;
	childId?: string;
};

export async function Orders002Panel(props: OrdersPanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;
	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
	const { officeList, clientList } = await getMasterData();
	return <Orders002Client localDate={localDate} officeList={officeList} clientList={clientList} />;
}

// マスタデータ取得関数
async function getMasterData() {
	// Prisma のクエリを並列実行
	const [m020List, m030List] = await Promise.all([
		// M020_Officeのデータ取得
		getM020_OfficePromise(),
		// M030_Clientのデータ取得
		getM030_ClientPromise(),
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

	return {
		officeList,
		clientList,
	};
}
