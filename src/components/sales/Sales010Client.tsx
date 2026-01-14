"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col, Modal } from "react-bootstrap";
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
	const temperatureList: ListItem[] = [
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
	const vehicleOwnershipList: ListItem[] = [
		{ key: "own", value: "自車輌" },
		{ key: "outsourced", value: "傭車" },
	];
	const [showInquiryModal, setShowInquiryModal] = useState(false);
	const salesInquiryData = {
		salesNo: "1",
		salesDetailNo: "1",
		deliveryResultNo: "1",
		deliveryResultDetailNo: "1",
		serviceCode: "BIN-03",
		operationDate: "2024-11-06",
		loadDate: "2024-11-05",
		departureDate: "2024-11-05",
		unloadingDate: "2024-11-06",
		temperature: "cool",
		transport: "delivery",
		vehicleOwnership: "own",
		operationDateFrom: "2024-11-05",
		operationDateTo: "2024-11-06",
		dispatchDeptCode: "D010",
		transportDeptCode: "T220",
		carrierCode: "CR-120",
		carNumber: "品川 500 あ 12-34",
		driverCode: "DRV-010",
		driverName: "山田 太郎",
		assistant: "佐藤 花子",
		fare: "120000",
		advance: "15000",
		totalAmount: "135000",
		internalTransferCode: "IT-020",
		internalTransferFare: "40000",
		internalTransferAdvance: "5000",
		payoutFare: "80000",
		payoutAdvance: "10000",
		payoutTotal: "90000",
		status: "billed_ready",
	};
	const rows: SalesHeader[] = [
		{
			id: 1,
			salesNo: "1",
			deliveryResultNo: "1",
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
		},
		{
			id: 2,
			salesNo: "2",
			deliveryResultNo: "2",
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
		},
		{
			id: 3,
			salesNo: "3",
			deliveryResultNo: "3",
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
		},
	];

	const openInquiryModal = () => setShowInquiryModal(true);
	const closeInquiryModal = () => setShowInquiryModal(false);

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
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={false} label="売上日">
								<CommonDateRangeBox id="salesDate" defaultFromValue={localDate} />
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
				<div className="d-flex justify-content-start gap-2 mb-3">
					<Button className="btn btn-gradient px-3" onClick={openInquiryModal}>
						売上照会
					</Button>
				</div>
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

					<div className="small text-muted">全 3 アイテム中 1 から 3 を表示中</div>
				</footer>
			</section>

			<Modal show={showInquiryModal} onHide={closeInquiryModal} size="xl" fullscreen="lg-down" scrollable>
				<Modal.Header closeButton className="border-0">
					<Modal.Title>売上照会</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light">
					<section className="panel-block mb-0">
						<header className="panel-block-header d-flex align-items-center">
							<span className="panel-block-title mb-0">売上明細</span>
						</header>
						<Form>
							<Row className="gx-1 gy-2">
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="売上No">
										<CommonInputBox
											id="salesInquirySalesNo"
											defaultValue={salesInquiryData.salesNo}
											placeholder="売上Noを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="売上明細No">
										<CommonInputBox
											id="salesInquirySalesDetailNo"
											defaultValue={salesInquiryData.salesDetailNo}
											placeholder="売上明細Noを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="配送実績No">
										<CommonInputBox
											id="salesInquiryDeliveryResultNo"
											defaultValue={salesInquiryData.deliveryResultNo}
											placeholder="配送実績Noを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="配送実績明細No">
										<CommonInputBox
											id="salesInquiryDeliveryResultDetailNo"
											defaultValue={salesInquiryData.deliveryResultDetailNo}
											placeholder="配送実績明細Noを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="便CD">
										<CommonInputBox
											id="salesInquiryServiceCode"
											defaultValue={salesInquiryData.serviceCode}
											placeholder="便CDを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="運行日">
										<CommonInputBox
											id="salesInquiryOperationDate"
											type="date"
											defaultValue={salesInquiryData.operationDate}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="積込日">
										<CommonInputBox
											id="salesInquiryLoadDate"
											type="date"
											defaultValue={salesInquiryData.loadDate}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="出発日">
										<CommonInputBox
											id="salesInquiryDepartureDate"
											type="date"
											defaultValue={salesInquiryData.departureDate}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="荷卸日">
										<CommonInputBox
											id="salesInquiryUnloadingDate"
											type="date"
											defaultValue={salesInquiryData.unloadingDate}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="温度帯KB">
										<CommonComboBox
											id="salesInquiryTemperature"
											list={temperatureList}
											showKey={false}
											defaultValue={salesInquiryData.temperature}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="運送KB">
										<CommonComboBox
											id="salesInquiryTransport"
											list={transportList}
											showKey={false}
											defaultValue={salesInquiryData.transport}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="自/傭車KB">
										<CommonComboBox
											id="salesInquiryVehicleOwnership"
											list={vehicleOwnershipList}
											showKey={false}
											defaultValue={salesInquiryData.vehicleOwnership}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="運行日From（積込日）">
										<CommonInputBox
											id="salesInquiryOperationDateFrom"
											type="date"
											defaultValue={salesInquiryData.operationDateFrom}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="運行日To（荷卸日）">
										<CommonInputBox
											id="salesInquiryOperationDateTo"
											type="date"
											defaultValue={salesInquiryData.operationDateTo}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={6} xxl={4}>
									<CommonGroupLabel required={false} label="配車権部門（売上計上部門）コード">
										<CommonInputBox
											id="salesInquiryDispatchDeptCode"
											defaultValue={salesInquiryData.dispatchDeptCode}
											placeholder="配車権部門コードを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="運送部門コード">
										<CommonInputBox
											id="salesInquiryTransportDeptCode"
											defaultValue={salesInquiryData.transportDeptCode}
											placeholder="運送部門コードを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="運送業者コード">
										<CommonInputBox
											id="salesInquiryCarrierCode"
											defaultValue={salesInquiryData.carrierCode}
											placeholder="運送業者コードを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="車番">
										<CommonInputBox
											id="salesInquiryCarNumber"
											defaultValue={salesInquiryData.carNumber}
											placeholder="車番を入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="ドライバーコード">
										<CommonInputBox
											id="salesInquiryDriverCode"
											defaultValue={salesInquiryData.driverCode}
											placeholder="ドライバーコードを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="ドライバー名">
										<CommonInputBox
											id="salesInquiryDriverName"
											defaultValue={salesInquiryData.driverName}
											placeholder="ドライバー名を入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="助手">
										<CommonInputBox
											id="salesInquiryAssistant"
											defaultValue={salesInquiryData.assistant}
											placeholder="助手を入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="運賃">
										<CommonInputBox
											id="salesInquiryFare"
											type="number"
											defaultValue={salesInquiryData.fare}
											placeholder="運賃を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="立替金">
										<CommonInputBox
											id="salesInquiryAdvance"
											type="number"
											defaultValue={salesInquiryData.advance}
											placeholder="立替金を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="合計金額">
										<CommonInputBox
											id="salesInquiryTotalAmount"
											type="number"
											defaultValue={salesInquiryData.totalAmount}
											placeholder="合計金額を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="内部振替先コード">
										<CommonInputBox
											id="salesInquiryInternalTransferCode"
											defaultValue={salesInquiryData.internalTransferCode}
											placeholder="内部振替先コードを入力"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="内部振替運賃">
										<CommonInputBox
											id="salesInquiryInternalTransferFare"
											type="number"
											defaultValue={salesInquiryData.internalTransferFare}
											placeholder="内部振替運賃を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="内部振替立替金">
										<CommonInputBox
											id="salesInquiryInternalTransferAdvance"
											type="number"
											defaultValue={salesInquiryData.internalTransferAdvance}
											placeholder="内部振替立替金を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="下払運賃">
										<CommonInputBox
											id="salesInquiryPayoutFare"
											type="number"
											defaultValue={salesInquiryData.payoutFare}
											placeholder="下払運賃を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="下払立替金">
										<CommonInputBox
											id="salesInquiryPayoutAdvance"
											type="number"
											defaultValue={salesInquiryData.payoutAdvance}
											placeholder="下払立替金を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="下払合計金額">
										<CommonInputBox
											id="salesInquiryPayoutTotal"
											type="number"
											defaultValue={salesInquiryData.payoutTotal}
											placeholder="下払合計金額を入力"
											textAlign="right"
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4} xxl={3}>
									<CommonGroupLabel required={false} label="ステータス">
										<CommonComboBox
											id="salesInquiryStatus"
											list={statusList}
											showKey={false}
											defaultValue={salesInquiryData.status}
											readOnly={true}
										/>
									</CommonGroupLabel>
								</Col>
							</Row>
						</Form>
					</section>
				</Modal.Body>
				<Modal.Footer className="border-0 pt-0">
					<Button variant="secondary" onClick={closeInquiryModal}>
						閉じる
					</Button>
				</Modal.Footer>
			</Modal>
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
						</Fragment>
					))}
				</tbody>
			</Table>
		</div>
	);
}
