"use client";

import { Fragment, useMemo, useState } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import {
	CommonGroupLabel,
	CommonComboBox,
	CommonInputBox,
	RequiredMark,
	CommonDateRangeBox,
} from "@/components/CommonComponent";

export type VehicleOption = {
	key: string;
	value: string;
};

// 中継地テーブルの型定義
export type OrderRelay = {
	id: string;
	relayNo: number;
	siteName: string;
	arrivalDate: string;
	departureDate: string;
};

export type OrderVehicle = {
	id: string;
	vehicleTypeKey: string;
	vehicleLoadKey: string;
	billingFreight: number;
	paymentFreight: number;
	remarks?: string;
	relayPoints?: OrderRelay[];
};

export type OrderRow = {
	id: number;
	orderNo: string;
	office: string;
	client: string;
	loadDate: string;
	loadSite: string;
	arrivalDate: string;
	arrivalSite: string;
	weight: number;
	vehicleCount: number;
	fare: number;
	vehicles: OrderVehicle[];
};

type OrdersNestedTableProps = {
	rows: OrderRow[];
};

type ListItem = { key: string; value: string };

type Orders002ClientProps = {
	localDate: string;
	officeList: ListItem[];
	clientList: ListItem[];
};

export default function Orders002Client(props: Orders002ClientProps) {
	const { localDate, officeList, clientList } = props;
	const rows: OrderRow[] = [
		{
			id: 1,
			orderNo: "0000000001",
			office: "営業所1",
			client: "株式会社XXX",
			loadDate: "2024/10/01",
			loadSite: "営業所１",
			arrivalDate: "2024/10/02",
			arrivalSite: "営業所２",
			weight: 120,
			vehicleCount: 2,
			fare: 85000,
			vehicles: [
				{
					id: "1-1",
					vehicleTypeKey: "VT005",
					vehicleLoadKey: "VL003",
					billingFreight: 45000,
					paymentFreight: 38000,
					remarks: "冷凍品対応",
					relayPoints: [
						{
							id: "1-1-1",
							relayNo: 1,
							siteName: "東京倉庫",
							arrivalDate: "2024/10/02",
							departureDate: "2024/10/02",
						},
					],
				},
				{
					id: "1-2",
					vehicleTypeKey: "VT001",
					vehicleLoadKey: "VL002",
					billingFreight: 40000,
					paymentFreight: 32000,
					remarks: "積替えあり",
					relayPoints: [
						{
							id: "1-2-1",
							relayNo: 1,
							siteName: "東京倉庫",
							arrivalDate: "2024/10/02",
							departureDate: "2024/10/02",
						},
						{
							id: "1-2-2",
							relayNo: 2,
							siteName: "東京倉庫２",
							arrivalDate: "2024/10/02",
							departureDate: "2024/10/02",
						},
					],
				},
			],
		},
		{
			id: 2,
			orderNo: "0000000002",
			office: "営業所2",
			client: "株式会社XXX",
			loadDate: "2024/10/01",
			loadSite: "大阪 DC",
			arrivalDate: "2024/10/03",
			arrivalSite: "福岡 TC",
			weight: 75,
			vehicleCount: 1,
			fare: 110000,
			vehicles: [
				{
					id: "2-1",
					vehicleTypeKey: "VT006",
					vehicleLoadKey: "VL004",
					billingFreight: 65000,
					paymentFreight: 50000,
					remarks: "ユニック作業",
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
							{/* 受注No */}
							<CommonGroupLabel required={false} label="受注No">
								<CommonInputBox id="orderNo" defaultValue="" placeholder="受注番号を入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={0} lg={0} xxl={1}></Col>
						<Col md={12} lg={4} xxl={3}>
							{/* 受注日(デフォルトは今日の日付) */}
							<CommonGroupLabel required={false} label="受注日">
								<CommonInputBox
									id="orderDate"
									type="date"
									placeholder="受注日を入力してください"
									defaultValue={localDate}
								/>
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={6} xxl={5}>
							{/* 受注部門 */}
							<CommonGroupLabel required={false} label="受注部門">
								<CommonComboBox id="officeInCharge" list={officeList} showKey={true} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={8} xl={6} xxl={4}>
							{/* 積日 */}
							<CommonGroupLabel required={false} label="積日">
								<CommonDateRangeBox id="tsumiDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={8} xl={6} xxl={4}>
							{/* 着日 */}
							<CommonGroupLabel required={false} label="着日">
								<CommonDateRangeBox id="chakuDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={6} xxl={4}>
							{/* 得意先 */}
							<CommonGroupLabel required={false} label="得意先">
								<CommonComboBox id="client" list={clientList} showKey={true} />
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
					<Button className="btn btn-gradient px-3">受注確定</Button>
					<Button className="btn btn-gradient px-3">中継地入力</Button>
					<Button className="btn btn-gradient px-3">中継地削除</Button>
				</div>
				<OrdersNestedTable rows={rows} />

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

function OrdersNestedTable({ rows }: OrdersNestedTableProps) {
	// 車両情報の展開状態を管理するステート
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	// 中継地情報の展開情報を管理するステート（vehicle.id で管理）
	const [expandedRelayRows, setExpandedRelayRows] = useState<string[]>([]);
	const toggleRelayRow = (vehicleId: string) => {
		setExpandedRelayRows((prev) =>
			prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
		);
	};

	const currencyFormatter = useMemo(() => new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }), []);

	return (
		<div className="table-responsive border rounded">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2.5rem" }}></th>
						<th style={{ width: "2rem" }}>
							<Form.Check type="checkbox" />
						</th>
						<th>受注No</th>
						<th>受注部門</th>
						<th>得意先</th>
						<th>積日</th>
						<th>出荷元</th>
						<th>着日</th>
						<th>出荷先</th>
						<th>重量</th>
						<th>台数</th>
						<th>運賃</th>
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
										aria-label={`${row.orderNo}の車輛情報を${expandedRows.includes(row.id) ? "閉じる" : "開く"}`}
									>
										{expandedRows.includes(row.id) ? "-" : "+"}
									</Button>
								</td>
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.orderNo}</td>
								<td>{row.office}</td>
								<td>{row.client}</td>
								<td>{row.loadDate}</td>
								<td>{row.loadSite}</td>
								<td>{row.arrivalDate}</td>
								<td>{row.arrivalSite}</td>
								<td className="text-end">{row.weight.toLocaleString()}</td>
								<td>{row.vehicleCount}</td>
								<td className="text-end">{currencyFormatter.format(row.fare)}</td>
							</tr>

							{/* 車輛情報のネスト表示 */}
							{expandedRows.includes(row.id) && (
								<tr className="bg-light">
									<td></td>
									<td colSpan={11} className="p-0">
										<Table className="mb-0 table-bordered table-sm" responsive size="sm">
											<thead>
												<tr className="table-secondary">
													<th style={{ width: "2.5rem" }}></th>
													<th style={{ width: "2rem" }}>
														<Form.Check type="checkbox" />
													</th>
													<th>車輛種別</th>
													<th>車輛重量</th>
													<th>請求運賃</th>
													<th>支払運賃</th>
													<th>備考</th>
												</tr>
											</thead>
											<tbody>
												{row.vehicles.map((vehicle) => (
													<Fragment key={vehicle.id}>
														<tr>
															<td className="text-center">
																<Button
																	variant="outline-primary"
																	size="sm"
																	className="px-2 py-0"
																	onClick={() => toggleRelayRow(vehicle.id)}
																	aria-label={`${row.orderNo}の中継地情報を${
																		expandedRelayRows.includes(vehicle.id) ? "閉じる" : "開く"
																	}`}
																>
																	{expandedRelayRows.includes(vehicle.id) ? "-" : "+"}
																</Button>
															</td>
															<td>
																<Form.Check type="checkbox" />
															</td>
															{/* <td>チルドウィング</td> */}
															<td>4.0t</td>
															<td className="text-end">{currencyFormatter.format(vehicle.billingFreight)}</td>
															<td className="text-end">{currencyFormatter.format(vehicle.paymentFreight)}</td>
															<td>{vehicle.remarks ?? ""}</td>
														</tr>

														{expandedRelayRows.includes(vehicle.id) &&
															vehicle.relayPoints &&
															vehicle.relayPoints.length > 0 && (
																<tr>
																	<td></td>
																	<td colSpan={6} className="p-0">
																		<Table className="mb-0 table-bordered table-sm" responsive size="sm">
																			<thead>
																				<tr className="table-light">
																					<th style={{ width: "2rem" }}>
																						<Form.Check type="checkbox" />
																					</th>
																					<th style={{ width: "4rem" }}>中継No</th>
																					<th>中継地</th>
																					<th>到着日時</th>
																					<th>出発日時</th>
																				</tr>
																			</thead>
																			<tbody>
																				{vehicle.relayPoints.map((relay) => (
																					<tr key={relay.id}>
																						<td>
																							<Form.Check type="checkbox" />
																						</td>
																						<td className="text-end">{relay.relayNo}</td>
																						<td>{relay.siteName}</td>
																						<td>{relay.arrivalDate}</td>
																						<td>{relay.departureDate}</td>
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
