import { ResultStopSummary } from "@/components/result/Result001Client";

type ListItem = { key: string; value: string };

export type Result001Fixture = {
	localDate: string;
	driverList: ListItem[];
	vehicleList: ListItem[];
	completionReasons: ListItem[];
	paymentMethods: ListItem[];
	stopSummaries: ResultStopSummary[];
};

export const buildResult001Fixture = (): Result001Fixture => {
	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

	const driverList: ListItem[] = [
		{ key: "DRV001", value: "山田 太郎" },
		{ key: "DRV002", value: "鈴木 花子" },
		{ key: "DRV003", value: "佐藤 健" },
	];

	const vehicleList: ListItem[] = [
		{ key: "10T-WING", value: "10tウイング（冷凍）" },
		{ key: "4T-VAN", value: "4tバン" },
		{ key: "2T-ALU", value: "2tアルミ" },
	];

	const completionReasons: ListItem[] = [
		{ key: "on-time", value: "予定通り完了" },
		{ key: "late-traffic", value: "渋滞による遅延" },
		{ key: "receiver-absent", value: "受取人不在/時間変更" },
		{ key: "damage-check", value: "破損・数量差異確認中" },
	];

	const paymentMethods: ListItem[] = [
		{ key: "cash", value: "現金" },
		{ key: "invoice", value: "請求書" },
		{ key: "collect", value: "代引き・着払い" },
	];

	const stopSummaries: ResultStopSummary[] = [
		{
			id: "ST-01",
			destination: "川崎センター（加工品）",
			plannedTime: "09:00",
			actualTime: "09:05",
			cases: 12,
			cod: 0,
			status: "completed",
			memo: "搬入口B",
		},
		{
			id: "ST-02",
			destination: "横浜北DC",
			plannedTime: "10:30",
			actualTime: "10:45",
			cases: 18,
			cod: 12000,
			status: "completed",
			memo: "代引き受領",
		},
		{
			id: "ST-03",
			destination: "新横浜ストア1号店",
			plannedTime: "11:15",
			actualTime: "11:40",
			cases: 6,
			cod: 0,
			status: "partial",
			memo: "数量差異(1cs)",
		},
	];

	return { localDate, driverList, vehicleList, completionReasons, paymentMethods, stopSummaries };
};
