// -----------------------------
// Types
// -----------------------------
export type SidebarChild = {
	id: string;
	label: string;
};
export type SidebarGroup = {
	id: string;
	label: string;
	children: SidebarChild[];
};

// -----------------------------
// サイドバーデータ取得関数
// -----------------------------
export function GetSidebarData() {
	const sidebarGroups: SidebarGroup[] = [
		{
			id: "orders",
			label: "受注",
			children: [
				{
					id: "orders010",
					label: "配送依頼受信",
				},
				{
					id: "orders020",
					label: "配送依頼入力",
				},
				{
					id: "orders030",
					label: "配送依頼履歴照会",
				},
			],
		},
		{
			id: "handy",
			label: "ハンディ",
			children: [
				{
					id: "handy010",
					label: "■着荷確認",
				},
				{
					id: "handy020",
					label: "■発荷確認",
				},
			],
		},
		{
			id: "operation",
			label: "運行計画",
			children: [
				{
					id: "operation010",
					label: "運行便自動作成",
				},
				{
					id: "operation020",
					label: "■運行便照会",
				},
			],
		},
		{
			id: "transport",
			label: "配送指示",
			children: [
				{
					id: "transport010",
					label: "配送指示照会",
				},
				{
					id: "transport020",
					label: "配送実績照会",
				},
				{
					id: "transport030",
					label: "配送完了受信",
				},
				{
					id: "transport040",
					label: "地域配車処理",
				},
			],
		},
		{
			id: "sales",
			label: "売上",
			children: [
				{
					id: "sales010",
					label: "■売上照会",
				},
			],
		},
		{
			id: "invoice",
			label: "請求",
			children: [
				{
					id: "invoice010",
					label: "請求処理",
				},
				{
					id: "invoice020",
					label: "請求照会",
				},
			],
		},
		{
			id: "payment",
			label: "支払い",
			children: [
				{
					id: "payment010",
					label: "支払照会",
				},
			],
		},
		{
			id: "monthend",
			label: "月次処理",
			children: [
				{
					id: "monthend010",
					label: "締処理",
				},
			],
		},
		{
			id: "master",
			label: "マスタメンテ",
			children: [],
		},
	];

	return sidebarGroups;
}
