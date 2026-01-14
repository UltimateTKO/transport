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

type InternalTransferDetail = {
	id: string;
	transferNo: string;
	fromDeptCode: string;
	toDeptCode: string;
	transferDate: string;
	transferAmount: string;
	note: string;
	status: string;
};

type PayoutDetail = {
	id: string;
	payoutNo: string;
	carrierCode: string;
	payoutDate: string;
	payoutFare: string;
	payoutAdvance: string;
	payoutTotal: string;
	status: string;
};

type SalesHeader = {
	id: number;
	salesNo: string;
	deliveryResultNo: string;
	salesDate: string;
	dispatchDeptCode: string;
	shipperCode: string;
	operationStartDate: string;
	unloadingDate: string;
	fare: string;
	advance: string;
	totalAmount: string;
	payoutFare: string;
	payoutAdvance: string;
	payoutTotal: string;
	billingMonth: string;
	status: string;
	internalTransfers: InternalTransferDetail[];
	payouts: PayoutDetail[];
};

type ListItem = { key: string; value: string };

type Sales010ClientProps = {
	localDate: string;
};

type SalesTableProps = {
	rows: SalesHeader[];
};

export default function Sales010Client({ localDate }: Sales010ClientProps) {
	const statusList: ListItem[] = [
		{ key: "created", value: "データ作成" },
		{ key: "billed_ready", value: "請求作成済み" },
		{ key: "billed", value: "請求済" },
	];
	const rows: SalesHeader[] = [
		{
			id: 1,
			salesNo: "SL-2024-0012",
			deliveryResultNo: "RS-2024-0001",
			salesDate: "2024/11/06",
			dispatchDeptCode: "D010",
			shipperCode: "SHP-010",
			operationStartDate: "2024/11/05",
			unloadingDate: "2024/11/06",
			fare: "120,000",
			advance: "15,000",
			totalAmount: "135,000",
			payoutFare: "80,000",
			payoutAdvance: "10,000",
			payoutTotal: "90,000",
			billingMonth: "2024/11",
			status: "請求作成済み",
			internalTransfers: [
				{
					id: "1-1",
					transferNo: "IT-2024-1101",
					fromDeptCode: "D010",
					toDeptCode: "D120",
					transferDate: "2024/11/07",
					transferAmount: "20,000",
					note: "関東支店への内部振り",
					status: "確定",
				},
				{
					id: "1-2",
					transferNo: "IT-2024-1102",
					fromDeptCode: "D010",
					toDeptCode: "D130",
					transferDate: "2024/11/07",
					transferAmount: "12,000",
					note: "冷凍帯の追加振替",
					status: "確定",
				},
			],
			payouts: [
				{
					id: "1-1",
					payoutNo: "PT-2024-0201",
					carrierCode: "C018",
					payoutDate: "2024/11/10",
					payoutFare: "80,000",
					payoutAdvance: "10,000",
					payoutTotal: "90,000",
					status: "支払予定",
				},
			],
		},
		{
			id: 2,
			salesNo: "SL-2024-0013",
			deliveryResultNo: "RS-2024-0002",
			salesDate: "2024/11/07",
			dispatchDeptCode: "D020",
			shipperCode: "SHP-020",
			operationStartDate: "2024/11/06",
			unloadingDate: "2024/11/07",
			fare: "210,000",
			advance: "12,000",
			totalAmount: "222,000",
			payoutFare: "150,000",
			payoutAdvance: "8,000",
			payoutTotal: "158,000",
			billingMonth: "2024/11",
			status: "請求済",
			internalTransfers: [
				{
					id: "2-1",
					transferNo: "IT-2024-1201",
					fromDeptCode: "D020",
					toDeptCode: "D200",
					transferDate: "2024/11/08",
					transferAmount: "25,000",
					note: "九州支店への内部振り",
					status: "確定",
				},
			],
			payouts: [
				{
					id: "2-1",
					payoutNo: "PT-2024-0205",
					carrierCode: "C110",
					payoutDate: "2024/11/12",
					payoutFare: "95,000",
					payoutAdvance: "5,000",
					payoutTotal: "100,000",
					status: "支払済",
				},
				{
					id: "2-2",
					payoutNo: "PT-2024-0206",
					carrierCode: "C120",
					payoutDate: "2024/11/12",
					payoutFare: "55,000",
					payoutAdvance: "3,000",
					payoutTotal: "58,000",
					status: "支払済",
				},
			],
		},
		{
			id: 3,
			salesNo: "SL-2024-0014",
			deliveryResultNo: "RS-2024-0003",
			salesDate: "2024/11/08",
			dispatchDeptCode: "D030",
			shipperCode: "SHP-030",
			operationStartDate: "2024/11/07",
			unloadingDate: "2024/11/07",
			fare: "95,000",
			advance: "0",
			totalAmount: "95,000",
			payoutFare: "60,000",
			payoutAdvance: "0",
			payoutTotal: "60,000",
			billingMonth: "2024/11",
			status: "データ作成",
			internalTransfers: [],
			payouts: [],
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
							<CommonGroupLabel required={false} label="売上No">
								<CommonInputBox id="salesNo" defaultValue="" placeholder="売上Noを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="配送実績No">
								<CommonInputBox id="deliveryResultNo" defaultValue="" placeholder="配送実績Noを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="売上日">
								<CommonDateRangeBox id="salesDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="請求年月">
								<CommonInputBox id="billingMonth" type="month" defaultValue="" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="配車権部門CD">
								<CommonInputBox id="dispatchDeptCode" defaultValue="" placeholder="配車権部門CDを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="荷送人CD">
								<CommonInputBox id="shipperCode" defaultValue="" placeholder="荷送人CDを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運行開始日">
								<CommonInputBox id="operationStartDate" type="date" defaultValue="" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="荷卸日">
								<CommonInputBox id="unloadingDate" type="date" defaultValue="" />
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
				<SalesTable rows={rows} />

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

function SalesTable({ rows }: SalesTableProps) {
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	return (
		<div className="table-responsive border rounded sales010-table">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2.5rem" }}></th>
						<th style={{ width: "2rem" }}>
							<Form.Check type="checkbox" />
						</th>
						<th>
							<span className="table-header-text">売上No</span>
						</th>
						<th>
							<span className="table-header-text">配送実績No</span>
						</th>
						<th>
							<span className="table-header-text">売上日</span>
						</th>
						<th>
							<span className="table-header-text">配車権部門CD</span>
						</th>
						<th>
							<span className="table-header-text">荷送人CD</span>
						</th>
						<th>
							<span className="table-header-text">運行開始日</span>
						</th>
						<th>
							<span className="table-header-text">荷卸日</span>
						</th>
						<th className="text-end">
							<span className="table-header-text">運賃</span>
						</th>
						<th className="text-end">
							<span className="table-header-text">立替金</span>
						</th>
						<th className="text-end">
							<span className="table-header-text">合計金額</span>
						</th>
						<th className="text-end">
							<span className="table-header-text">下払運賃</span>
						</th>
						<th className="text-end">
							<span className="table-header-text">下払立替金</span>
						</th>
						<th className="text-end">
							<span className="table-header-text">下払合計金額</span>
						</th>
						<th>
							<span className="table-header-text">請求年月</span>
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
										aria-label={`${row.salesNo}の内部振り・下払い明細を${
											expandedRows.includes(row.id) ? "閉じる" : "開く"
										}`}
									>
										{expandedRows.includes(row.id) ? "-" : "+"}
									</Button>
								</td>
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.salesNo}</td>
								<td>{row.deliveryResultNo}</td>
								<td>{row.salesDate}</td>
								<td>{row.dispatchDeptCode}</td>
								<td>{row.shipperCode}</td>
								<td>{row.operationStartDate}</td>
								<td>{row.unloadingDate}</td>
								<td className="text-end">{row.fare}</td>
								<td className="text-end">{row.advance}</td>
								<td className="text-end">{row.totalAmount}</td>
								<td className="text-end">{row.payoutFare}</td>
								<td className="text-end">{row.payoutAdvance}</td>
								<td className="text-end">{row.payoutTotal}</td>
								<td>{row.billingMonth}</td>
								<td>{row.status}</td>
							</tr>

							{expandedRows.includes(row.id) && (
								<tr className="bg-light">
									<td></td>
									<td colSpan={16} className="p-0">
										<div className="p-2 d-flex flex-column gap-3">
											<section className="bg-white border rounded">
												<div className="px-3 py-2 border-bottom small fw-semibold text-muted">内部振り</div>
												<div className="table-responsive">
													<Table className="mb-0 table-bordered table-sm">
														<thead>
															<tr className="table-secondary">
																<th style={{ width: "2rem" }}>
																	<Form.Check type="checkbox" />
																</th>
																<th>
																	<span className="table-header-text">内部振りNo</span>
																</th>
																<th>
																	<span className="table-header-text">振替元部門CD</span>
																</th>
																<th>
																	<span className="table-header-text">振替先部門CD</span>
																</th>
																<th>
																	<span className="table-header-text">振替日</span>
																</th>
																<th className="text-end">
																	<span className="table-header-text">振替金額</span>
																</th>
																<th>
																	<span className="table-header-text">摘要</span>
																</th>
																<th>
																	<span className="table-header-text">ステータス</span>
																</th>
															</tr>
														</thead>
														<tbody>
															{row.internalTransfers.length > 0 ? (
																row.internalTransfers.map((transfer) => (
																	<tr key={transfer.id}>
																		<td>
																			<Form.Check type="checkbox" />
																		</td>
																		<td>{transfer.transferNo}</td>
																		<td>{transfer.fromDeptCode}</td>
																		<td>{transfer.toDeptCode}</td>
																		<td>{transfer.transferDate}</td>
																		<td className="text-end">{transfer.transferAmount}</td>
																		<td>{transfer.note}</td>
																		<td>{transfer.status}</td>
																	</tr>
																))
															) : (
																<tr>
																	<td colSpan={8} className="text-center text-muted small py-3">
																		内部振りデータがありません。
																	</td>
																</tr>
															)}
														</tbody>
													</Table>
												</div>
											</section>

											<section className="bg-white border rounded">
												<div className="px-3 py-2 border-bottom small fw-semibold text-muted">下払い</div>
												<div className="table-responsive">
													<Table className="mb-0 table-bordered table-sm">
														<thead>
															<tr className="table-secondary">
																<th style={{ width: "2rem" }}>
																	<Form.Check type="checkbox" />
																</th>
																<th>
																	<span className="table-header-text">下払No</span>
																</th>
																<th>
																	<span className="table-header-text">運送業者CD</span>
																</th>
																<th>
																	<span className="table-header-text">下払日</span>
																</th>
																<th className="text-end">
																	<span className="table-header-text">下払運賃</span>
																</th>
																<th className="text-end">
																	<span className="table-header-text">下払立替金</span>
																</th>
																<th className="text-end">
																	<span className="table-header-text">下払合計金額</span>
																</th>
																<th>
																	<span className="table-header-text">ステータス</span>
																</th>
															</tr>
														</thead>
														<tbody>
															{row.payouts.length > 0 ? (
																row.payouts.map((payout) => (
																	<tr key={payout.id}>
																		<td>
																			<Form.Check type="checkbox" />
																		</td>
																		<td>{payout.payoutNo}</td>
																		<td>{payout.carrierCode}</td>
																		<td>{payout.payoutDate}</td>
																		<td className="text-end">{payout.payoutFare}</td>
																		<td className="text-end">{payout.payoutAdvance}</td>
																		<td className="text-end">{payout.payoutTotal}</td>
																		<td>{payout.status}</td>
																	</tr>
																))
															) : (
																<tr>
																	<td colSpan={8} className="text-center text-muted small py-3">
																		下払いデータがありません。
																	</td>
																</tr>
															)}
														</tbody>
													</Table>
												</div>
											</section>
										</div>
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
