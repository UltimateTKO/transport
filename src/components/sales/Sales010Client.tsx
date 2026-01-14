"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col, Modal } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, RequiredMark, CommonDateRangeBox } from "@/components/CommonComponent";

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

type SalesInquiryRow = {
	id: number;
	salesDetailNo: string;
	transport: string;
	operationDate: string;
	loadDate: string;
	departureDate: string;
	unloadingDate: string;
	fromLocation: string;
	toLocation: string;
	carrierCode: string;
	payoutFare: string;
	payoutAdvance: string;
	internalTransferCode: string;
	internalTransferFare: string;
	internalTransferAdvance: string;
};

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
	const transportList: ListItem[] = [
		{ key: "pickup", value: "集荷" },
		{ key: "inter_region", value: "地域外幹線" },
		{ key: "intra_region", value: "地域内幹線" },
		{ key: "delivery", value: "配送" },
	];
	const [showInquiryModal, setShowInquiryModal] = useState(false);
	const salesInquiryRows: SalesInquiryRow[] = [
		{
			id: 1,
			salesDetailNo: "1",
			operationDate: "2026/02/06",
			loadDate: "2026/02/05",
			departureDate: "2026/02/05",
			unloadingDate: "2026/02/06",
			transport: "intra_region",
			fromLocation: "鳥栖営業所",
			toLocation: "福岡かすやINC",
			carrierCode: "CR-120",
			internalTransferCode: "IT-020",
			internalTransferFare: "40,000",
			internalTransferAdvance: "5,000",
			payoutFare: "80,000",
			payoutAdvance: "10,000",
		},
		{
			id: 2,
			salesDetailNo: "2",
			operationDate: "2026/02/07",
			loadDate: "2026/02/06",
			departureDate: "2026/02/06",
			unloadingDate: "2026/02/07",
			transport: "inter_region",
			fromLocation: "福岡かすやINC",
			toLocation: "南九州物流センター",
			carrierCode: "CR-245",
			internalTransferCode: "IT-030",
			internalTransferFare: "65,000",
			internalTransferAdvance: "8,000",
			payoutFare: "150,000",
			payoutAdvance: "8,000",
		},
		{
			id: 3,
			salesDetailNo: "3",
			operationDate: "2026/02/08",
			loadDate: "2026/02/07",
			departureDate: "2026/02/07",
			unloadingDate: "2026/02/07",
			transport: "intra_region",
			fromLocation: "南九州物流センター",
			toLocation: "鹿児島南センター",
			carrierCode: "CR-080",
			internalTransferCode: "IT-015",
			internalTransferFare: "30,000",
			internalTransferAdvance: "0",
			payoutFare: "60,000",
			payoutAdvance: "0",
		},
	];

	const rows: SalesHeader[] = [
		{
			id: 1,
			salesNo: "1",
			deliveryResultNo: "1",
			salesDate: "2026/02/06",
			dispatchDeptCode: "D010",
			shipperCode: "SHP-010",
			operationStartDate: "2026/02/05",
			unloadingDate: "2026/02/06",
			fare: "120,000",
			advance: "15,000",
			totalAmount: "135,000",
			payoutFare: "80,000",
			payoutAdvance: "10,000",
			payoutTotal: "90,000",
			billingMonth: "2026/02",
			status: "請求作成済み",
		},
		{
			id: 2,
			salesNo: "2",
			deliveryResultNo: "2",
			salesDate: "2026/02/07",
			dispatchDeptCode: "D020",
			shipperCode: "SHP-020",
			operationStartDate: "2026/02/06",
			unloadingDate: "2026/02/07",
			fare: "210,000",
			advance: "12,000",
			totalAmount: "222,000",
			payoutFare: "150,000",
			payoutAdvance: "8,000",
			payoutTotal: "158,000",
			billingMonth: "2026/02",
			status: "請求済",
		},
		{
			id: 3,
			salesNo: "3",
			deliveryResultNo: "3",
			salesDate: "2026/02/08",
			dispatchDeptCode: "D030",
			shipperCode: "SHP-030",
			operationStartDate: "2026/02/07",
			unloadingDate: "2026/02/07",
			fare: "95,000",
			advance: "0",
			totalAmount: "95,000",
			payoutFare: "60,000",
			payoutAdvance: "0",
			payoutTotal: "60,000",
			billingMonth: "2026/02",
			status: "データ作成",
		},
	];

	const openInquiryModal = () => setShowInquiryModal(true);
	const closeInquiryModal = () => setShowInquiryModal(false);
	const resolveLabel = (list: ListItem[], key: string) => list.find((item) => item.key === key)?.value ?? key;

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={true} label="売上日">
								<CommonDateRangeBox id="salesDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="売上計上部門CD">
								<CommonComboBox id="locationList" list={locationList} showKey={true} />
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
					<Modal.Title>売上明細</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light">
					<section className="panel-block mb-0">
						<header className="panel-block-header d-flex align-items-center">
							<span className="panel-block-title mb-0">売上明細</span>
						</header>
						<div className="table-responsive border rounded">
							<Table className="mb-0 table-bordered table-sm table-striped align-middle text-nowrap">
								<thead>
									<tr className="table-primary">
										<th>
											<span className="table-header-text">明細No</span>
										</th>
										<th>
											<span className="table-header-text">運送区分</span>
										</th>
										<th>
											<span className="table-header-text">運行日</span>
										</th>
										<th>
											<span className="table-header-text">積込日</span>
										</th>
										<th>
											<span className="table-header-text">出発日</span>
										</th>
										<th>
											<span className="table-header-text">荷卸日</span>
										</th>
										<th>
											<span className="table-header-text">From地点</span>
										</th>
										<th>
											<span className="table-header-text">To地点</span>
										</th>
										<th>
											<span className="table-header-text">運送業者コード</span>
										</th>
										<th className="text-end">
											<span className="table-header-text">下払運賃</span>
										</th>
										<th className="text-end">
											<span className="table-header-text">下払立替金</span>
										</th>
										<th>
											<span className="table-header-text">内部振替先</span>
										</th>
										<th className="text-end">
											<span className="table-header-text">内部振替運賃</span>
										</th>
										<th className="text-end">
											<span className="table-header-text">内部振替立替金</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{salesInquiryRows.map((row) => (
										<tr key={row.id}>
											<td>{row.salesDetailNo}</td>
											<td>{resolveLabel(transportList, row.transport)}</td>
											<td>{row.operationDate}</td>
											<td>{row.loadDate}</td>
											<td>{row.departureDate}</td>
											<td>{row.unloadingDate}</td>
											<td>{row.fromLocation}</td>
											<td>{row.toLocation}</td>
											<td>{row.carrierCode}</td>
											<td className="text-end">{row.payoutFare}</td>
											<td className="text-end">{row.payoutAdvance}</td>
											<td>{row.internalTransferCode}</td>
											<td className="text-end">{row.internalTransferFare}</td>
											<td className="text-end">{row.internalTransferAdvance}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
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
							<span className="table-header-text">売上日</span>
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
								<td>{row.salesDate}</td>
								<td>{row.operationStartDate}</td>
								<td>{row.unloadingDate}</td>
								<td className="text-end">{row.fare}</td>
								<td className="text-end">{row.advance}</td>
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
