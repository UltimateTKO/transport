"use client";

import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
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
	temperatureBand: string;
	transportType: string;
	ownCharterClass: string;
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
		{ key: "ambient", value: "常温" },
		{ key: "cool", value: "クール" },
		{ key: "frozen", value: "冷凍" },
	];
	const transportList: ListItem[] = [
		{ key: "pickup", value: "集荷" },
		{ key: "inter_region", value: "地域外幹線" },
		{ key: "intra_region", value: "地域内幹線" },
		{ key: "delivery", value: "配送" },
	];
	// 運送業者マスタ
	const carriers: ListItem[] = [
		{ key: "Y0000", value: "園田陸運 株式会社" },
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
			routeCourse: "南九州-川内",
			temperatureBand: "常温",
			transportType: "集荷",
			ownCharterClass: "自車",
			loadingDate: "2024/11/05",
			departureDate: "2024/11/05",
			unloadingDate: "2024/11/06",
			dispatchDeptCode: "KGSKUE:川内営業所",
			transportDeptCode: "KGSKUE:川内営業所",
			vehicleNo: "1234",
			provisionalVehicleNo: "0001",
			driverName: "佐藤 太郎",
			assistant: "鈴木 花子",
			driverPhone: "090-1234-5678",
			status: "データ作成",
		},
		{
			id: 2,
			routeCourse: "南九州-鹿児島南",
			temperatureBand: "冷凍",
			transportType: "配送",
			ownCharterClass: "傭車",
			loadingDate: "2024/11/06",
			departureDate: "2024/11/06",
			unloadingDate: "2024/11/07",
			dispatchDeptCode: "KGSKMC:鹿児島南センター",
			transportDeptCode: "Y1001:九州第一運輸",
			vehicleNo: "3344",
			provisionalVehicleNo: "0002",
			driverName: "森川 亮",
			assistant: "-",
			driverPhone: "090-7777-9999",
			status: "削除",
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
								<CommonComboBox id="fromLocation" list={locationList} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="To地点">
								<CommonComboBox id="toLocation" list={locationList} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="温度帯K">
								<CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運送K">
								<CommonComboBox id="transportType" list={transportList} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運送業者CD">
								<CommonComboBox id="carrierCode" list={carriers} showKey={false} />
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
				<OperationPlanTable rows={rows} />

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

function OperationPlanTable({ rows }: OperationTableProps) {
	return (
		<div className="table-responsive border rounded">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2rem" }}>
							<Form.Check type="checkbox" />
						</th>
						<th>ルートコース</th>
						<th>温度帯K</th>
						<th>運送K</th>
						<th>自/傭</th>
						<th>積込日</th>
						<th>出発日</th>
						<th>荷卸日</th>
						<th>配車権部門</th>
						<th>運送部門</th>
						<th>車番</th>
						<th>仮車番</th>
						<th>ドライバー</th>
						<th>助手</th>
						<th>電話番号</th>
						<th>ステータス</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr className="align-middle" key={row.id}>
							<td>
								<Form.Check type="checkbox" />
							</td>
							<td>{row.routeCourse}</td>
							<td>{row.temperatureBand}</td>
							<td>{row.transportType}</td>
							<td>{row.ownCharterClass}</td>
							<td>{row.loadingDate}</td>
							<td>{row.departureDate}</td>
							<td>{row.unloadingDate}</td>
							<td>{row.dispatchDeptCode}</td>
							<td>{row.transportDeptCode}</td>
							<td>{row.vehicleNo}</td>
							<td>{row.provisionalVehicleNo}</td>
							<td>{row.driverName}</td>
							<td>{row.assistant}</td>
							<td>{row.driverPhone}</td>
							<td>{row.status}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
