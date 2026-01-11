"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import {
	CommonGroupLabel,
	CommonComboBox,
	CommonInputBox,
	RequiredMark,
	CommonDateRangeBox,
} from "@/components/CommonComponent";

type DeliveryResultDetail = {
	id: string;
	resultNo: string;
	resultDetailNo: string;
	planNo: string;
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

type DeliveryResultHeader = {
	id: number;
	resultNo: string;
	instructionNo: string;
	operationDateFrom: string;
	operationDateTo: string;
	temperatureBand: string;
	routeName: string;
	status: string;
	details: DeliveryResultDetail[];
};

type ListItem = { key: string; value: string };

type Transport020ClientProps = {
	localDate: string;
};

type DeliveryResultTableProps = {
	rows: DeliveryResultHeader[];
};

export default function Transport020Client({ localDate }: Transport020ClientProps) {
	const temperatureBandList: ListItem[] = [
		{ key: "ambient", value: "常温" },
		{ key: "cool", value: "クール" },
		{ key: "frozen", value: "冷凍" },
	];
	const vehicleTypeList: ListItem[] = [
		{ key: "2t", value: "2t" },
		{ key: "4t", value: "4t" },
		{ key: "10t", value: "10t" },
		{ key: "trailer", value: "トレーラ" },
	];
	const statusList: ListItem[] = [
		{ key: "created", value: "データ作成" },
		{ key: "delivered", value: "配送完了" },
		{ key: "billed_ready", value: "請求作成済み" },
		{ key: "billed", value: "請求済" },
	];
	const rows: DeliveryResultHeader[] = [
		{
			id: 1,
			resultNo: "RS-2024-0001",
			instructionNo: "TR-2024-0101",
			operationDateFrom: "2024/11/05",
			operationDateTo: "2024/11/06",
			temperatureBand: "常温",
			routeName: "関東→東北(仙台)",
			status: "配送完了",
			details: [
				{
					id: "1-1",
					resultNo: "RS-2024-0001",
					resultDetailNo: "001",
					planNo: "OP-2024-0101",
					temperatureClass: "常温",
					transportClass: "集荷",
					ownCharterClass: "自車輌",
					operationDateFrom: "2024/11/05",
					operationDateTo: "2024/11/05",
					dispatchDeptCode: "D010",
					transportDeptCode: "T010",
					carrierCode: "C010",
					vehicleNo: "4t 品川 500 あ 1234",
					driverCode: "DRV-010",
					driverName: "佐藤 太郎",
					assistant: "鈴木 花子",
					driverPhone: "090-1234-5678",
					status: "配送完了",
				},
				{
					id: "1-2",
					resultNo: "RS-2024-0001",
					resultDetailNo: "002",
					planNo: "OP-2024-0102",
					temperatureClass: "常温",
					transportClass: "地域外幹線",
					ownCharterClass: "傭車",
					operationDateFrom: "2024/11/05",
					operationDateTo: "2024/11/06",
					dispatchDeptCode: "D010",
					transportDeptCode: "T020",
					carrierCode: "C018",
					vehicleNo: "10t 足立 300 か 5678",
					driverCode: "DRV-015",
					driverName: "高橋 健",
					assistant: "-",
					driverPhone: "080-2222-3333",
					status: "配送完了",
				},
			],
		},
		{
			id: 2,
			resultNo: "RS-2024-0002",
			instructionNo: "TR-2024-0110",
			operationDateFrom: "2024/11/06",
			operationDateTo: "2024/11/07",
			temperatureBand: "冷凍",
			routeName: "関西→九州(福岡)",
			status: "請求作成済み",
			details: [
				{
					id: "2-1",
					resultNo: "RS-2024-0002",
					resultDetailNo: "001",
					planNo: "OP-2024-0201",
					temperatureClass: "冷凍",
					transportClass: "地域内幹線",
					ownCharterClass: "自車輌",
					operationDateFrom: "2024/11/06",
					operationDateTo: "2024/11/06",
					dispatchDeptCode: "D020",
					transportDeptCode: "T120",
					carrierCode: "C110",
					vehicleNo: "4t 大阪 580 た 1122",
					driverCode: "DRV-022",
					driverName: "井上 修",
					assistant: "山田 奈央",
					driverPhone: "070-5555-8888",
					status: "請求作成済み",
				},
				{
					id: "2-2",
					resultNo: "RS-2024-0002",
					resultDetailNo: "002",
					planNo: "OP-2024-0202",
					temperatureClass: "冷凍",
					transportClass: "配送",
					ownCharterClass: "傭車",
					operationDateFrom: "2024/11/06",
					operationDateTo: "2024/11/07",
					dispatchDeptCode: "D020",
					transportDeptCode: "T130",
					carrierCode: "C120",
					vehicleNo: "10t 福岡 400 う 3344",
					driverCode: "DRV-031",
					driverName: "森川 亮",
					assistant: "-",
					driverPhone: "090-7777-9999",
					status: "請求作成済み",
				},
			],
		},
		{
			id: 3,
			resultNo: "RS-2024-0003",
			instructionNo: "TR-2024-0150",
			operationDateFrom: "2024/11/07",
			operationDateTo: "2024/11/07",
			temperatureBand: "クール",
			routeName: "関東→中部(名古屋)",
			status: "データ作成",
			details: [
				{
					id: "3-1",
					resultNo: "RS-2024-0003",
					resultDetailNo: "001",
					planNo: "OP-2024-0301",
					temperatureClass: "クール",
					transportClass: "集荷",
					ownCharterClass: "自車輌",
					operationDateFrom: "2024/11/07",
					operationDateTo: "2024/11/07",
					dispatchDeptCode: "D030",
					transportDeptCode: "T210",
					carrierCode: "C210",
					vehicleNo: "2t 川崎 480 え 9012",
					driverCode: "DRV-044",
					driverName: "中村 由紀",
					assistant: "-",
					driverPhone: "080-4444-2211",
					status: "データ作成",
				},
				{
					id: "3-2",
					resultNo: "RS-2024-0003",
					resultDetailNo: "002",
					planNo: "OP-2024-0302",
					temperatureClass: "クール",
					transportClass: "配送",
					ownCharterClass: "自車輌",
					operationDateFrom: "2024/11/07",
					operationDateTo: "2024/11/07",
					dispatchDeptCode: "D030",
					transportDeptCode: "T215",
					carrierCode: "C210",
					vehicleNo: "4t 名古屋 530 し 2210",
					driverCode: "DRV-052",
					driverName: "石井 宏",
					assistant: "鈴木 佳奈",
					driverPhone: "090-3333-2210",
					status: "データ作成",
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
							<CommonGroupLabel required={false} label="配送実績No">
								<CommonInputBox id="deliveryResultNo" defaultValue="" placeholder="配送実績Noを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="配送指示No">
								<CommonInputBox id="deliveryInstructionNo" defaultValue="" placeholder="配送指示Noを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運行日">
								<CommonDateRangeBox id="operationDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="配送先">
								<CommonInputBox id="destination" defaultValue="" placeholder="配送先を入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運送会社">
								<CommonInputBox id="carrier" defaultValue="" placeholder="運送会社を入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="車種">
								<CommonComboBox id="vehicleType" list={vehicleTypeList} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="車番">
								<CommonInputBox id="vehicleNo" defaultValue="" placeholder="車番を入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運行経路名">
								<CommonInputBox id="routeName" defaultValue="" placeholder="運行経路名を入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="温度帯">
								<CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={false} />
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
				<DeliveryResultTable rows={rows} />

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

function DeliveryResultTable({ rows }: DeliveryResultTableProps) {
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	return (
		<div className="table-responsive border rounded transport020-table">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2.5rem" }}></th>
						<th style={{ width: "2rem" }}>
							<Form.Check type="checkbox" />
						</th>
						<th>
							<span className="table-header-text">配送実績№</span>
						</th>
						<th>
							<span className="table-header-text">配送指示№</span>
						</th>
						<th>
							<span className="table-header-text">運行日From-To</span>
						</th>
						<th>
							<span className="table-header-text">温度帯</span>
						</th>
						<th>
							<span className="table-header-text">運行経路名</span>
						</th>
						<th>
							<span className="table-header-text">ステータス</span>
						</th>
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
										aria-label={`${row.resultNo}の配送実績明細を${expandedRows.includes(row.id) ? "閉じる" : "開く"}`}
									>
										{expandedRows.includes(row.id) ? "-" : "+"}
									</Button>
								</td>
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.resultNo}</td>
								<td>{row.instructionNo}</td>
								<td>
									{row.operationDateFrom} ~ {row.operationDateTo}
								</td>
								<td>{row.temperatureBand}</td>
								<td>{row.routeName}</td>
								<td>{row.status}</td>
							</tr>

							{expandedRows.includes(row.id) && (
								<tr className="bg-light">
									<td></td>
									<td colSpan={7} className="p-0">
										<Table className="mb-0 table-bordered table-sm">
											<thead>
												<tr className="table-secondary">
													<th style={{ width: "2rem" }}>
														<Form.Check type="checkbox" />
													</th>
													<th>
														<span className="table-header-text">配送実績No</span>
													</th>
													<th>
														<span className="table-header-text">配送実績明細No</span>
													</th>
													<th>
														<span className="table-header-text">運行計画№</span>
													</th>
													<th>
														<span className="table-header-text">温度帯KB</span>
													</th>
													<th>
														<span className="table-header-text">運送KB</span>
													</th>
													<th>
														<span className="table-header-text">自車/傭車KB</span>
													</th>
													<th>
														<span className="table-header-text">運行日From（積込日）</span>
													</th>
													<th>
														<span className="table-header-text">運行日To（荷卸日）</span>
													</th>
													<th>
														<span className="table-header-text">配車権部門（売上計上部門）CD</span>
													</th>
													<th>
														<span className="table-header-text">運送部門CD</span>
													</th>
													<th>
														<span className="table-header-text">運送業者CD</span>
													</th>
													<th>
														<span className="table-header-text">車番</span>
													</th>
													<th>
														<span className="table-header-text">ドライバーCD</span>
													</th>
													<th>
														<span className="table-header-text">ドライバー名</span>
													</th>
													<th>
														<span className="table-header-text">助手</span>
													</th>
													<th>
														<span className="table-header-text">ドライバー電話番号</span>
													</th>
													<th>
														<span className="table-header-text">ステータス</span>
													</th>
												</tr>
											</thead>
											<tbody>
												{row.details.map((detail) => (
													<tr key={detail.id}>
														<td>
															<Form.Check type="checkbox" />
														</td>
														<td>{detail.resultNo}</td>
														<td className="text-end">{detail.resultDetailNo}</td>
														<td>{detail.planNo}</td>
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
