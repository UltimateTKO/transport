"use client";

import { useState } from "react";
import { Container, Button, Form, Row, Col, Badge } from "react-bootstrap";
import {
	CommonGroupLabel,
	CommonComboBox,
	CommonInputBox,
	RequiredMark,
	CommonDateRangeBox,
} from "@/components/CommonComponent";

type OperationPlanRow = {
	id: number;
	routeCourse: string;
	fromLocation: string;
	toLocation: string;
	temperatureBand: string;
	transportType: string;
	ownCharterClass: string;
	operationDate: string;
	loadingDate: string;
	departureDate: string;
	unloadingDate: string;
	dispatchDeptCode: string;
	transportDeptCode: string;
	vehicleNo: string;
	provisionalVehicleNo: string;
	driverName: string;
	assistant: string;
	driverPhone: string;
	status: string;
};

type ListItem = { key: string; value: string };

type Operation020ClientProps = {
	localDate: string;
};

type OperationTableProps = {
	rows: OperationPlanRow[];
};

export default function Operation020Client({ localDate }: Operation020ClientProps) {
	const temperatureBandList: ListItem[] = [
		{ key: "T1", value: "常温" },
		{ key: "T2", value: "クール" },
		{ key: "T3", value: "冷凍" },
	];
	const transportList: ListItem[] = [
		{ key: "01", value: "集荷" },
		{ key: "02", value: "地域外幹線" },
		{ key: "03", value: "地域内幹線" },
		{ key: "04", value: "配送" },
	];
	// 運送業者マスタ
	const carriers: ListItem[] = [
		{ key: "Y1000", value: "南九州トランスポート" },
		{ key: "Y1001", value: "九州第一運輸" },
		{ key: "Y1002", value: "福岡貨物運送株式会社" },
		{ key: "Y1003", value: "鹿児島総合運送" },
	];
	// 地点マスタ
	const locationList: ListItem[] = [
		{ key: "FOKFKC", value: "福岡かすやINC" },
		{ key: "FOKK2C", value: "福岡かすや第2センター" },
		{ key: "FOKFMC", value: "二又瀬物流センター" },
		{ key: "SAGTSE", value: "鳥栖営業所" },
		{ key: "KGSMKC", value: "南九州物流センター" },
		{ key: "KGSKMC", value: "鹿児島南センター" },
		{ key: "KGSKUE", value: "川内営業所" },
		{ key: "KGSKKE", value: "加治木営業所" },
		{ key: "KGSHOE", value: "日置営業所" },
		{ key: "MYZMJE", value: "都城営業所" },
		{ key: "MYZMJF", value: "都城フローズンセンター" },
		{ key: "OITITK", value: "大分委託先" },
	];
	const rows: OperationPlanRow[] = [
		{
			id: 1,
			routeCourse: "かすや-南九州",
			fromLocation: "福岡かすやINC",
			toLocation: "南九州物流センター",
			temperatureBand: "常温",
			transportType: "地域外幹線",
			ownCharterClass: "自車",
			operationDate: "2026/01/20",
			loadingDate: "2026/01/19",
			departureDate: "2026/01/20",
			unloadingDate: "2026/01/20",
			dispatchDeptCode: "福岡かすやINC",
			transportDeptCode: "福岡かすやINC",
			vehicleNo: "1201",
			provisionalVehicleNo: "1001",
			driverName: "石谷 一郎",
			assistant: "浜田 次郎",
			driverPhone: "090-000-0000",
			status: "運行中",
		},
		{
			id: 2,
			routeCourse: "かすや-都城F",
			fromLocation: "福岡かすやINC",
			toLocation: "都城フローズンセンター",
			temperatureBand: "冷凍",
			transportType: "地域外幹線",
			ownCharterClass: "自車",
			operationDate: "2026/01/20",
			loadingDate: "2026/01/20",
			departureDate: "2026/01/20",
			unloadingDate: "2026/01/20",
			dispatchDeptCode: "福岡かすやINC",
			transportDeptCode: "都城フローズンセンター",
			vehicleNo: "3001",
			provisionalVehicleNo: "2001",
			driverName: "加藤 三郎",
			assistant: "ー",
			driverPhone: "090-000-0000",
			status: "データ作成",
		},
		{
			id: 3,
			routeCourse: "かすやコース1",
			fromLocation: "福岡かすやINC",
			toLocation: "",
			temperatureBand: "常温",
			transportType: "配送",
			ownCharterClass: "自車",
			operationDate: "2026/01/20",
			loadingDate: "2026/01/19",
			departureDate: "2026/01/20",
			unloadingDate: "2026/01/20",
			dispatchDeptCode: "福岡かすやINC",
			transportDeptCode: "福岡かすやINC",
			vehicleNo: "1210",
			provisionalVehicleNo: "4001",
			driverName: "上田 仁",
			assistant: "ー",
			driverPhone: "090-000-0000",
			status: "配送完了",
		},
		{
			id: 4,
			routeCourse: "南九州-川内",
			fromLocation: "南九州物流センター",
			toLocation: "川内営業所",
			temperatureBand: "常温",
			transportType: "地域内幹線",
			ownCharterClass: "自車",
			operationDate: "2026/01/20",
			loadingDate: "2026/01/19",
			departureDate: "2026/01/20",
			unloadingDate: "2026/01/20",
			dispatchDeptCode: "福岡かすやINC",
			transportDeptCode: "南九州物流センター",
			vehicleNo: "2001",
			provisionalVehicleNo: "5001",
			driverName: "木村 雄一",
			assistant: "大城 和也",
			driverPhone: "090-000-0000",
			status: "配送完了",
		},
		{
			id: 5,
			routeCourse: "川内コース1",
			fromLocation: "川内営業所",
			toLocation: "",
			temperatureBand: "常温",
			transportType: "配送",
			ownCharterClass: "自車",
			operationDate: "2026/01/20",
			loadingDate: "2026/01/19",
			departureDate: "2026/01/20",
			unloadingDate: "2026/01/20",
			dispatchDeptCode: "南九州物流センター",
			transportDeptCode: "南九州物流センター",
			vehicleNo: "2012",
			provisionalVehicleNo: "5002",
			driverName: "渡辺 徹",
			assistant: "ー",
			driverPhone: "090-000-0000",
			status: "削除",
		},
		{
			id: 6,
			routeCourse: "都城Fコース1",
			fromLocation: "都城フローズンセンター",
			toLocation: "",
			temperatureBand: "冷凍",
			transportType: "配送",
			ownCharterClass: "庸車",
			operationDate: "2026/01/20",
			loadingDate: "2026/01/19",
			departureDate: "2026/01/20",
			unloadingDate: "2026/01/20",
			dispatchDeptCode: "都城フローズンセンター",
			transportDeptCode: "Y1000:南九州トランスポート",
			vehicleNo: "9999",
			provisionalVehicleNo: "0001",
			driverName: "黒田 鉄",
			assistant: "ー",
			driverPhone: "090-000-0000",
			status: "運行中",
		},
	];

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required label="運行日">
								<CommonDateRangeBox id="operationDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="From地点">
								<CommonComboBox id="fromLocation" list={locationList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="To地点">
								<CommonComboBox id="toLocation" list={locationList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="温度帯K">
								<CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運送K">
								<CommonComboBox id="transportType" list={transportList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={false} label="運送業者CD">
								<CommonComboBox id="carrierCode" list={carriers} showKey={true} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} className="d-flex justify-content-center gap-2 mt-3">
							<Button className="btn btn-gradient px-3">検索</Button>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
				<div className="d-flex justify-content-start gap-2 mb-3">
					<Button type="button" className="btn btn-gradient px-3">
						車番/ドライバー編集ボタン
					</Button>
					<Button type="button" className="btn btn-gradient px-3">
						配送完了
					</Button>
				</div>
				<OperationPlanPanels rows={rows} />

				<footer className="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
					<div className="d-flex align-items-center gap-2">
						<Form.Select defaultValue="50" size="sm" style={{ width: "5rem" }}>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</Form.Select>
						<span className="small text-muted">件表示</span>
					</div>

					<div className="d-flex align-items-center gap-1">
						<Button className="btn btn-gradient btn-sm px-2 py-1">{"<<"}</Button>
						<Button className="btn btn-gradient btn-sm px-2 py-1">{"<"}</Button>
						<div className="d-flex align-items-center border rounded px-2 py-1 bg-white small">
							<span>ページ</span>
							<Form.Control className="border-0 p-0 text-center" defaultValue="1" size="sm" type="number" />
							<span className="text-muted">/ 1</span>
						</div>
						<Button className="btn btn-gradient btn-sm px-2 py-1">{">"}</Button>
						<Button className="btn btn-gradient btn-sm px-2 py-1">{">>"}</Button>
					</div>

					<div className="small text-muted">全 0 アイテム中 0 から 0 を表示中</div>
				</footer>
			</section>
		</Container>
	);
}

function OperationPlanPanels({ rows }: OperationTableProps) {
	const [selectedId, setSelectedId] = useState(rows[0]?.id ?? null);
	const selectedRow = rows.find((row) => row.id === selectedId);

	return (
		<Row className="gy-3">
			<Col lg={5} className="d-flex flex-column gap-2">
				{rows.map((row) => {
					const isSelected = row.id === selectedId;
					return (
						<button
							type="button"
							key={row.id}
							onClick={() => setSelectedId(row.id)}
							className={`w-100 text-start border rounded p-3 shadow-sm d-flex flex-column gap-2 ${
								isSelected ? "bg-primary text-white border-primary" : "bg-light text-body"
							}`}
							style={{ cursor: "pointer" }}
						>
							<div className="d-flex justify-content-between align-items-center">
								<div className="fw-semibold">{row.routeCourse}</div>
								<Badge bg={isSelected ? "light" : "secondary"} text={isSelected ? "dark" : undefined}>
									{row.temperatureBand}
								</Badge>
							</div>
							<div className="small d-flex flex-column flex-sm-row flex-wrap gap-2">
								<span className="fw-semibold">From:</span>
								<span>{row.fromLocation}</span>
								<span className="fw-semibold">To:</span>
								<span>{row.toLocation || "未設定"}</span>
							</div>
							<div className="small d-flex flex-wrap gap-3">
								<span>運送K: {row.transportType}</span>
								<span>自/傭: {row.ownCharterClass}</span>
								<span>運送会社: {row.transportDeptCode}</span>
							</div>
						</button>
					);
				})}
			</Col>

			<Col lg={7}>
				<div className="border rounded p-3 bg-white shadow-sm h-100">
					{selectedRow ? (
						<div className="d-flex flex-column gap-3">
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<div className="fw-bold">{selectedRow.routeCourse}</div>
									<div className="text-muted small">
										From {selectedRow.fromLocation} → {selectedRow.toLocation || "未設定"}
									</div>
								</div>
								<Badge bg="info" text="dark">
									{selectedRow.status}
								</Badge>
							</div>

							<Row className="g-3">
								<Col md={6}>
									<div className="small text-muted">車番</div>
									<div className="fw-semibold">{selectedRow.vehicleNo}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">仮車番</div>
									<div className="fw-semibold">{selectedRow.provisionalVehicleNo}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">ドライバー</div>
									<div className="fw-semibold">{selectedRow.driverName}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">電話番号</div>
									<div className="fw-semibold">{selectedRow.driverPhone}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">配車部門</div>
									<div className="fw-semibold">{selectedRow.dispatchDeptCode}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">運送会社</div>
									<div className="fw-semibold">{selectedRow.transportDeptCode}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">運行日</div>
									<div className="fw-semibold">{selectedRow.operationDate}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">積込日</div>
									<div className="fw-semibold">{selectedRow.loadingDate}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">出発日</div>
									<div className="fw-semibold">{selectedRow.departureDate}</div>
								</Col>
								<Col md={6}>
									<div className="small text-muted">荷卸日</div>
									<div className="fw-semibold">{selectedRow.unloadingDate}</div>
								</Col>
							</Row>
						</div>
					) : (
						<div className="text-muted">ルートコースを選択してください</div>
					)}
				</div>
			</Col>
		</Row>
	);
}
