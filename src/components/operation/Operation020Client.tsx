"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, CommonInputBox, RequiredMark, CommonDateRangeBox } from "@/components/CommonComponent";

type OperationPlanDetail = {
	id: string;
	planNo: string;
	sequenceNo: string;
	serviceCode: string;
	temperatureClass: string;
	transportClass: string;
	ownCharterClass: string;
	operationDateFrom: string;
	operationDateTo: string;
	dispatchDeptCode: string;
	transportDeptCode: string;
	carrierCode: string;
	vehicleNo: string;
	driverCode: string;
	driverName: string;
	assistant: string;
	driverPhone: string;
	status: string;
};

type OperationPlanRow = {
	id: number;
	planNo: string;
	operationDateFrom: string;
	routeCode: string;
	fromAreaCode: string;
	toAreaCode: string;
	temperatureBand: string;
	routeName: string;
	currentLocationCode: string;
	status: string;
	details: OperationPlanDetail[];
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
	const statusList: ListItem[] = [
		{ key: "created", value: "データ作成" },
		{ key: "delivered", value: "配送完了" },
		{ key: "billed", value: "請求済" },
		{ key: "deleted", value: "削除" },
	];
	const rows: OperationPlanRow[] = [
		{
			id: 1,
			planNo: "0001",
			operationDateFrom: "2024/11/05",
			routeCode: "R-010",
			fromAreaCode: "A-01",
			toAreaCode: "A-07",
			temperatureBand: "常温",
			routeName: "関東→東北",
			currentLocationCode: "LOC-01",
			status: "データ作成",
			details: [
				{
					id: "1-1",
					planNo: "0001",
					sequenceNo: "1",
					serviceCode: "BIN-001",
					temperatureClass: "常温",
					transportClass: "集荷",
					ownCharterClass: "自車輌",
					operationDateFrom: "2024/11/05",
					operationDateTo: "2024/11/05",
					dispatchDeptCode: "D001",
					transportDeptCode: "T010",
					carrierCode: "C010",
					vehicleNo: "品川 500 あ 1234",
					driverCode: "DRV-001",
					driverName: "佐藤 太郎",
					assistant: "鈴木 花子",
					driverPhone: "090-1234-5678",
					status: "データ作成",
				},
				{
					id: "1-2",
					planNo: "0001",
					sequenceNo: "2",
					serviceCode: "BIN-002",
					temperatureClass: "常温",
					transportClass: "地域外幹線",
					ownCharterClass: "傭車",
					operationDateFrom: "2024/11/05",
					operationDateTo: "2024/11/06",
					dispatchDeptCode: "D001",
					transportDeptCode: "T020",
					carrierCode: "C020",
					vehicleNo: "品川 300 か 5678",
					driverCode: "DRV-014",
					driverName: "高橋 健",
					assistant: "-",
					driverPhone: "080-2222-3333",
					status: "配送完了",
				},
			],
		},
		{
			id: 2,
			planNo: "0002",
			operationDateFrom: "2024/11/06",
			routeCode: "R-020",
			fromAreaCode: "A-03",
			toAreaCode: "A-12",
			temperatureBand: "冷凍",
			routeName: "関西→九州",
			currentLocationCode: "LOC-04",
			status: "請求済",
			details: [
				{
					id: "2-1",
					planNo: "OP-2024-0002",
					sequenceNo: "1",
					serviceCode: "BIN-010",
					temperatureClass: "冷凍",
					transportClass: "地域内幹線",
					ownCharterClass: "自車輌",
					operationDateFrom: "2024/11/06",
					operationDateTo: "2024/11/06",
					dispatchDeptCode: "D010",
					transportDeptCode: "T110",
					carrierCode: "C110",
					vehicleNo: "大阪 580 た 1122",
					driverCode: "DRV-022",
					driverName: "井上 修",
					assistant: "山田 奈央",
					driverPhone: "070-5555-8888",
					status: "請求済",
				},
				{
					id: "2-2",
					planNo: "OP-2024-0002",
					sequenceNo: "2",
					serviceCode: "BIN-011",
					temperatureClass: "冷凍",
					transportClass: "配送",
					ownCharterClass: "傭車",
					operationDateFrom: "2024/11/06",
					operationDateTo: "2024/11/07",
					dispatchDeptCode: "D010",
					transportDeptCode: "T120",
					carrierCode: "C120",
					vehicleNo: "福岡 400 う 3344",
					driverCode: "DRV-031",
					driverName: "森川 亮",
					assistant: "-",
					driverPhone: "090-7777-9999",
					status: "削除",
				},
			],
		},
	];

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運行計画No">
								<CommonInputBox id="operationPlanNo" defaultValue="" placeholder="運行計画Noを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運行日">
								<CommonDateRangeBox id="operationDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運行経路CD">
								<CommonInputBox id="routeCode" defaultValue="" placeholder="運行経路CDを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="FromエリアCD">
								<CommonInputBox id="fromAreaCode" defaultValue="" placeholder="FromエリアCDを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="ToエリアCD">
								<CommonInputBox id="toAreaCode" defaultValue="" placeholder="ToエリアCDを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="温度帯">
								<CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="現地点コード">
								<CommonInputBox id="currentLocationCode" defaultValue="" placeholder="現地点コードを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="ステータス">
								<CommonComboBox id="status" list={statusList} showKey={false} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} className="d-flex justify-content-center gap-2 mt-3">
							<Button className="btn btn-gradient px-3">検索</Button>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
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
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	return (
		<div className="table-responsive border rounded">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2.5rem" }}></th>
						<th style={{ width: "2rem" }}>
							<Form.Check type="checkbox" />
						</th>
						<th>運行計画No</th>
						<th>運行日From（積込日）</th>
						<th>運行経路CD</th>
						<th>FromエリアCD</th>
						<th>ToエリアCD</th>
						<th>温度帯</th>
						<th>運行経路名</th>
						<th>現地点コード</th>
						<th>ステータス</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<Fragment key={row.id}>
							<tr className="align-middle">
								<td className="text-center">
									<Button
										variant="outline-primary"
										size="sm"
										className="px-2 py-0"
										onClick={() => toggleRow(row.id)}
										aria-label={`${row.planNo}の運行便情報を${expandedRows.includes(row.id) ? "閉じる" : "開く"}`}
									>
										{expandedRows.includes(row.id) ? "-" : "+"}
									</Button>
								</td>
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.planNo}</td>
								<td>{row.operationDateFrom}</td>
								<td>{row.routeCode}</td>
								<td>{row.fromAreaCode}</td>
								<td>{row.toAreaCode}</td>
								<td>{row.temperatureBand}</td>
								<td>{row.routeName}</td>
								<td>{row.currentLocationCode}</td>
								<td>{row.status}</td>
							</tr>

							{expandedRows.includes(row.id) && (
								<tr className="bg-light">
									<td></td>
									<td colSpan={10} className="p-0">
										<Table className="mb-0 table-bordered table-sm" responsive size="sm">
											<thead>
												<tr className="table-secondary">
													<th style={{ width: "2rem" }}>
														<Form.Check type="checkbox" />
													</th>
													<th>運行計画No</th>
													<th>運行SEQ.No</th>
													<th>便コード</th>
													<th>温度帯区分</th>
													<th>運送区分</th>
													<th>自車/傭車区分</th>
													<th>運行日From（積込日）</th>
													<th>運行日To（荷卸日）</th>
													<th>配車権部門（売上計上部門）コード</th>
													<th>運送部門コード</th>
													<th>運送業者コード</th>
													<th>車番</th>
													<th>ドライバーコード</th>
													<th>ドライバー名</th>
													<th>助手</th>
													<th>ドライバー電話番号</th>
													<th>ステータス</th>
												</tr>
											</thead>
											<tbody>
												{row.details.map((detail) => (
													<tr key={detail.id}>
														<td>
															<Form.Check type="checkbox" />
														</td>
														<td>{detail.planNo}</td>
														<td className="text-end">{detail.sequenceNo}</td>
														<td>{detail.serviceCode}</td>
														<td>{detail.temperatureClass}</td>
														<td>{detail.transportClass}</td>
														<td>{detail.ownCharterClass}</td>
														<td>{detail.operationDateFrom}</td>
														<td>{detail.operationDateTo}</td>
														<td>{detail.dispatchDeptCode}</td>
														<td>{detail.transportDeptCode}</td>
														<td>{detail.carrierCode}</td>
														<td>{detail.vehicleNo}</td>
														<td>{detail.driverCode}</td>
														<td>{detail.driverName}</td>
														<td>{detail.assistant}</td>
														<td>{detail.driverPhone}</td>
														<td>{detail.status}</td>
													</tr>
												))}
											</tbody>
										</Table>
									</td>
								</tr>
							)}
						</Fragment>
					))}
				</tbody>
			</Table>
		</div>
	);
}
