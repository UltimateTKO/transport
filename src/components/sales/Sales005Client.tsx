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
	salesNo: string;
	salesDate: string;
	fare: string;
	advance: string;
	payoutFareTotal: string;
	payoutAdvanceTotal: string;
	internalTransferFareTotal: string;
	internalTransferAdvanceTotal: string;
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

type Sales005ClientProps = {
	localDate: string;
};

type SalesTableProps = {
	rows: SalesHeader[];
};

export default function Sales005Client({ localDate }: Sales005ClientProps) {
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
			operationDate: "2026/01/09",
			loadDate: "2026/01/09",
			departureDate: "-",
			unloadingDate: "2026/01/09",
			transport: "集荷",
			fromLocation: "-",
			toLocation: "福岡かすやINC",
			carrierCode: "-",
			internalTransferCode: "-",
			internalTransferFare: "0",
			internalTransferAdvance: "0",
			payoutFare: "0",
			payoutAdvance: "0",
		},
		{
			id: 2,
			salesDetailNo: "2",
			operationDate: "2026/01/09",
			loadDate: "2026/01/09",
			departureDate: "2026/01/09",
			unloadingDate: "2026/01/09",
			transport: "地域外幹線",
			fromLocation: "福岡かすやINC",
			toLocation: "南九州物流センター",
			carrierCode: "-",
			internalTransferCode: "-",
			internalTransferFare: "0",
			internalTransferAdvance: "0",
			payoutFare: "0",
			payoutAdvance: "0",
		},
		{
			id: 3,
			salesDetailNo: "3",
			operationDate: "2026/01/10",
			loadDate: "2026/01/09",
			departureDate: "2026/01/10",
			unloadingDate: "2026/01/10",
			transport: "地域内幹線",
			fromLocation: "南九州物流センター",
			toLocation: "鹿児島南センター",
			carrierCode: "-",
			internalTransferCode: "南九州物流センター",
			internalTransferFare: "50,000",
			internalTransferAdvance: "2,000",
			payoutFare: "0",
			payoutAdvance: "0",
		},
		{
			id: 4,
			salesDetailNo: "4",
			operationDate: "2026/01/10",
			loadDate: "2026/01/10",
			departureDate: "2026/01/10",
			unloadingDate: "2026/01/10",
			transport: "配送",
			fromLocation: "鹿児島南センター",
			toLocation: "鹿児島商会",
			carrierCode: "九州第一運輸",
			internalTransferCode: "-",
			internalTransferFare: "0",
			internalTransferAdvance: "0",
			payoutFare: "20,000",
			payoutAdvance: "1,000",
		},
	];
	const rows: SalesHeader[] = [
		{
			salesNo: "1",
			salesDate: "2025/12/21",
			fare: "20,000",
			advance: "0",
			payoutFareTotal: "0",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "0",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "2",
			salesDate: "2025/12/25",
			fare: "20,000",
			advance: "0",
			payoutFareTotal: "0",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "0",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "3",
			salesDate: "2026/01/10",
			fare: "40,000",
			advance: "1,000",
			payoutFareTotal: "20,000",
			payoutAdvanceTotal: "1,000",
			internalTransferFareTotal: "1,000",
			internalTransferAdvanceTotal: "500",
		},
		{
			salesNo: "4",
			salesDate: "2026/01/15",
			fare: "20,000",
			advance: "0",
			payoutFareTotal: "0",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "0",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "5",
			salesDate: "2026/01/19",
			fare: "20,000",
			advance: "0",
			payoutFareTotal: "0",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "0",
			internalTransferAdvanceTotal: "0",
		},
	];

	const openInquiryModal = () => setShowInquiryModal(true);
	const closeInquiryModal = () => setShowInquiryModal(false);
	const resolveLabel = (list: ListItem[], key: string) => list.find((item) => item.key === key)?.value ?? key;

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
							<CommonGroupLabel required={true} label="売上日">
								<CommonDateRangeBox id="salesDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={true} label="売上計上部門CD">
								<CommonComboBox id="locationList" list={locationList} showKey={true} defaultValue="FOKFKC" />
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
						売上明細
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

			<Modal
				show={showInquiryModal}
				onHide={closeInquiryModal}
				dialogClassName="modal-xxl"
				fullscreen="lg-down"
				scrollable
			>
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
										<th>
											<span className="table-header-text">下払運賃</span>
										</th>
										<th>
											<span className="table-header-text">下払立替金</span>
										</th>
										<th>
											<span className="table-header-text">内部振替先</span>
										</th>
										<th>
											<span className="table-header-text">内部振替運賃</span>
										</th>
										<th>
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
						<th style={{ width: "8rem" }}>
							<span className="table-header-text">売上日</span>
						</th>
						<th>
							<span className="table-header-text">運賃合計</span>
						</th>
						<th>
							<span className="table-header-text">立替金合計</span>
						</th>
						<th>
							<span className="table-header-text">下払運賃合計</span>
						</th>
						<th>
							<span className="table-header-text">下払立替金合計</span>
						</th>
						<th>
							<span className="table-header-text">内部振替運賃合計</span>
						</th>
						<th>
							<span className="table-header-text">内部振替立替金合計</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<Fragment key={row.salesNo}>
							<tr className="align-middle">
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.salesDate}</td>
								<td className="text-end">{row.fare}</td>
								<td className="text-end">{row.advance}</td>
								<td className="text-end">{row.payoutFareTotal}</td>
								<td className="text-end">{row.payoutAdvanceTotal}</td>
								<td className="text-end">{row.internalTransferFareTotal}</td>
								<td className="text-end">{row.internalTransferAdvanceTotal}</td>
							</tr>
						</Fragment>
					))}
				</tbody>
			</Table>
		</div>
	);
}
