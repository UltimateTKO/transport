"use client";

import { useState } from "react";
import { Container, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, RequiredMark, CommonDateRangeBox } from "@/components/CommonComponent";

type ViecleNumber = {
	id: number;
	vehicleNo: string;
	provisionalVehicleNo: string;
	driverName: string;
	assistant: string;
	driverPhone: string;
	status: string;
	operationDate: string;
	loadingDate: string;
	departureDate: string;
	unloadingDate: string;
	dispatchDeptCode: string;
};

type OperationPlanRow = {
	id: number;
	routeCourse: string;
	fromLocation: string;
	toLocation: string;
	temperatureBand: string;
	transportType: string;
	transportDeptCode: string;
	ownCharterClass: string;
	vehicles: ViecleNumber[];
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
			transportDeptCode: "",
			vehicles: [
				{
					id: 1,
					vehicleNo: "1201",
					provisionalVehicleNo: "9000",
					driverName: "石谷 一郎",
					assistant: "",
					driverPhone: "090-000-0000",
					status: "運行中",
					operationDate: "2026/01/20",
					loadingDate: "2026/01/19",
					departureDate: "2026/01/20",
					unloadingDate: "2026/01/20",
					dispatchDeptCode: "福岡かすやINC",
				},
				{
					id: 2,
					vehicleNo: "1202",
					provisionalVehicleNo: "9001",
					driverName: "浜田 次郎",
					assistant: "",
					driverPhone: "090-111-1111",
					status: "運行中",
					operationDate: "2026/01/20",
					loadingDate: "2026/01/19",
					departureDate: "2026/01/20",
					unloadingDate: "2026/01/20",
					dispatchDeptCode: "福岡かすやINC",
				},
			],
		},
		{
			id: 2,
			routeCourse: "かすや-都城F",
			fromLocation: "福岡かすやINC",
			toLocation: "都城フローズンセンター",
			temperatureBand: "冷凍",
			transportType: "地域外幹線",
			ownCharterClass: "自車",
			transportDeptCode: "",
			vehicles: [
				{
					id: 1,
					vehicleNo: "3001",
					provisionalVehicleNo: "2001",
					driverName: "加藤 三郎",
					assistant: "ー",
					driverPhone: "090-000-0000",
					status: "データ作成",
					operationDate: "2026/01/20",
					loadingDate: "2026/01/20",
					departureDate: "2026/01/20",
					unloadingDate: "2026/01/20",
					dispatchDeptCode: "福岡かすやINC",
				},
			],
		},
		{
			id: 3,
			routeCourse: "かすやコース1",
			fromLocation: "福岡かすやINC",
			toLocation: "",
			temperatureBand: "常温",
			transportType: "配送",
			ownCharterClass: "自車",
			transportDeptCode: "",
			vehicles: [
				{
					id: 1,
					vehicleNo: "1210",
					provisionalVehicleNo: "4001",
					driverName: "上田 仁",
					assistant: "ー",
					driverPhone: "090-000-0000",
					status: "配送完了",
					operationDate: "2026/01/20",
					loadingDate: "2026/01/19",
					departureDate: "2026/01/20",
					unloadingDate: "2026/01/20",
					dispatchDeptCode: "福岡かすやINC",
				},
			],
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
	const [selectedRouteId, setSelectedRouteId] = useState(rows[0]?.routeCourse ?? null);
	const selectedRoute = rows.find((route) => route.routeCourse === selectedRouteId);
	const vehicles = selectedRoute?.vehicles ?? [];

	return (
		<Row className="gy-3">
			<Col lg={5} className="d-flex flex-column gap-2">
				{rows.map((route) => {
					const isSelected = route.routeCourse === selectedRouteId;
					const primaryTransport = route.transportDeptCode ?? "-";
					return (
						<button
							type="button"
							key={route.routeCourse}
							onClick={() => setSelectedRouteId(route.routeCourse)}
							className={`w-100 text-start border rounded p-3 shadow-sm d-flex flex-column gap-2 ${
								isSelected ? "bg-primary text-white border-primary" : "bg-light text-body"
							}`}
							style={{ cursor: "pointer" }}
						>
							<div className="d-flex justify-content-between align-items-center">
								<div className="fw-semibold">{route.routeCourse}</div>
								<Badge bg={isSelected ? "light" : "secondary"} text={isSelected ? "dark" : undefined}>
									{route.temperatureBand}
								</Badge>
							</div>
							<div className="small d-flex flex-column flex-sm-row flex-wrap gap-2">
								<span className="fw-semibold">From:</span>
								<span>{route.fromLocation}</span>
								<span className="fw-semibold">{route.toLocation ? "To:" : ""}</span>
								<span>{route.toLocation}</span>
							</div>
							<div className="small d-flex flex-wrap gap-3">
								<span>運送K: {route.transportType}</span>
								<span>自/傭: {route.ownCharterClass}</span>
								<span>運送会社: {primaryTransport}</span>
							</div>
						</button>
					);
				})}
			</Col>

			<Col lg={7}>
				<div className="border rounded p-3 bg-white shadow-sm h-100">
					{selectedRoute ? (
						<div className="d-flex flex-column gap-3 h-100">
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<div className="fw-bold">{selectedRoute.routeCourse}</div>
									<div className="text-muted small">
										{selectedRoute.toLocation
											? `From ${selectedRoute.fromLocation} → ${selectedRoute.toLocation}`
											: `${selectedRoute.fromLocation}`}
									</div>
								</div>
								<Badge bg="info" text="dark">
									{vehicles.length} 台
								</Badge>
							</div>

							{vehicles.length > 0 ? (
								<Row className="g-3">
									{vehicles.map((vehicle) => (
										<Col sm={12} md={6} xl={4} key={vehicle.id}>
											<div className="border rounded p-2 bg-white shadow-sm h-100 d-flex flex-column gap-2">
												<div className="d-flex justify-content-between align-items-center">
													<div className="fw-semibold">車番 {vehicle.vehicleNo}</div>
													<Badge bg="secondary" text="light">
														{vehicle.status}
													</Badge>
												</div>
												<div className="small">仮車番: {vehicle.provisionalVehicleNo}</div>
												<div className="small">ドライバー: {vehicle.driverName}</div>
												<div className="small">電話番号: {vehicle.driverPhone}</div>
												<div className="small">配車部門: {vehicle.dispatchDeptCode}</div>
												<div className="small">運行日: {vehicle.operationDate}</div>
												<div className="small">積込日: {vehicle.loadingDate}</div>
												<div className="small">出発日: {vehicle.departureDate}</div>
												<div className="small">荷卸日: {vehicle.unloadingDate}</div>
											</div>
										</Col>
									))}
								</Row>
							) : (
								<div className="text-muted">車番情報がありません</div>
							)}
						</div>
					) : (
						<div className="text-muted">ルートコースを選択してください</div>
					)}
				</div>
			</Col>
		</Row>
	);
}
