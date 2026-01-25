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
	inquiryNo: string;
	salesDate: string;
	operationDate: string;
	deliveryDate: string;
	requester: string;
	destination: string;
	quantity: string;
	fare: string;
	payoutFare: string;
	internalTransferFare: string;
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
		{ key: "OUADC", value: "あんしん総合流通センター" },
		{ key: "OUGBO", value: "キンザー営業所" },
		{ key: "OUMDC", value: "港町物流センター" },
		{ key: "ONHBO", value: "那覇営業所" },
		{ key: "ONFDC", value: "西原FDC" },
		{ key: "ONABO", value: "あんしん館" },
		{ key: "ONNBO", value: "西原営業所" },
		{ key: "DNHDO", value: "那覇港" },
		{ key: "ROMPL", value: "宮古委託先" },
		{ key: "RHTPL", value: "博多委託先" },
		{ key: "ROOPL", value: "大阪委託先" },
		{ key: "RYHPL", value: "横浜委託先" },
		{ key: "DOMDO", value: "平良港" },
		{ key: "DHTDO", value: "博多港" },
		{ key: "DOODO", value: "大阪港" },
		{ key: "DYHDO", value: "横浜港" },
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
			operationDate: "2026/01/04",
			loadDate: "2026/01/04",
			departureDate: "2026/01/05",
			unloadingDate: "2026/01/05",
			transport: "地域内幹線",
			fromLocation: "キンザー営業所",
			toLocation: "あんしん総合流通センター",
			carrierCode: "",
			internalTransferCode: "キンザー営業所",
			internalTransferFare: "5,000",
			internalTransferAdvance: "0",
			payoutFare: "",
			payoutAdvance: "0",
		},
		{
			id: 2,
			salesDetailNo: "2",
			operationDate: "2026/01/05",
			loadDate: "2026/01/05",
			departureDate: "2026/01/05",
			unloadingDate: "2026/01/05",
			transport: "配送",
			fromLocation: "あんしん総合流通センター",
			toLocation: "オーズカンパニー",
			carrierCode: "沖縄物流",
			internalTransferCode: "",
			internalTransferFare: "",
			internalTransferAdvance: "0",
			payoutFare: "12,000",
			payoutAdvance: "0",
		},
	];
	const rows: SalesHeader[] = [
		{
			salesNo: "1",
			inquiryNo: "20260105100001",
			salesDate: "2026/01/05",
			operationDate: "2026/01/04",
			deliveryDate: "2026/01/05",
			requester: "沖縄第一倉庫",
			destination: "オーズカンパニー",
			quantity: "20",
			fare: "20,000",
			payoutFare: "12,000",
			internalTransferFare: "5,000",
			billingMonth: "",
			status: "データ作成",
		},
		{
			salesNo: "2",
			inquiryNo: "20260105100002",
			salesDate: "2026/01/05",
			operationDate: "2026/01/05",
			deliveryDate: "2026/01/05",
			requester: "沖縄第一倉庫",
			destination: "たぬき弁当",
			quantity: "1",
			fare: "1,000",
			payoutFare: "",
			internalTransferFare: "",
			billingMonth: "",
			status: "データ作成",
		},
		{
			salesNo: "3",
			inquiryNo: "20260105100003",
			salesDate: "2026/01/05",
			operationDate: "2026/01/05",
			deliveryDate: "2026/01/05",
			requester: "琉球物流",
			destination: "caféポンチェ",
			quantity: "10",
			fare: "10,000",
			payoutFare: "8,000",
			internalTransferFare: "",
			billingMonth: "",
			status: "データ作成",
		},
		{
			salesNo: "4",
			inquiryNo: "20260105100004",
			salesDate: "2026/01/05",
			operationDate: "2026/01/05",
			deliveryDate: "2026/01/05",
			requester: "琉球物流",
			destination: "宗像堂",
			quantity: "11",
			fare: "11,000",
			payoutFare: "",
			internalTransferFare: "6,000",
			billingMonth: "",
			status: "データ作成",
		},
		{
			salesNo: "5",
			inquiryNo: "20260105100005",
			salesDate: "2026/01/05",
			operationDate: "2026/01/04",
			deliveryDate: "2026/01/05",
			requester: "友睦物流",
			destination: "牛吉 牧港店",
			quantity: "6",
			fare: "6,000",
			payoutFare: "",
			internalTransferFare: "",
			billingMonth: "",
			status: "データ作成",
		},
		{
			salesNo: "6",
			inquiryNo: "20260105100006",
			salesDate: "2026/01/05",
			operationDate: "2026/01/05",
			deliveryDate: "2026/01/05",
			requester: "友睦物流",
			destination: "イタリアン料理 mou",
			quantity: "15",
			fare: "15,000",
			payoutFare: "12,000",
			internalTransferFare: "",
			billingMonth: "",
			status: "データ作成",
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
						{/* <Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={true} label="売上日">
								<CommonDateRangeBox id="salesDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col> */}
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={true} label="売上計上部門CD">
								<CommonComboBox id="locationList" list={locationList} showKey={true} defaultValue="OUADC" readOnly />
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
						下払/内振明細
					</Button>
					<Button className="btn btn-gradient px-3">売上修正</Button>
					<Button className="btn btn-gradient px-3">キャンセル</Button>
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
				<Modal.Header closeButton className="border-0 bg-light">
					<Modal.Title>下払/内振明細</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light">
					<section className="panel-block mb-0">
						{/* <header className="panel-block-header d-flex align-items-center">
							<span className="panel-block-title mb-0">下払/内振明細</span>
						</header> */}
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
											<span className="table-header-text">内部振替先</span>
										</th>
										<th>
											<span className="table-header-text">内部振替運賃</span>
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
											<td>{row.internalTransferCode}</td>
											<td className="text-end">{row.internalTransferFare}</td>
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
							<span className="table-header-text">問合せNo/伝票No</span>
						</th>
						<th>
							<span className="table-header-text">運行日</span>
						</th>
						<th>
							<span className="table-header-text">納品日</span>
						</th>
						<th>
							<span className="table-header-text">依頼元</span>
						</th>
						<th>
							<span className="table-header-text">納品先</span>
						</th>
						<th>
							<span className="table-header-text">個数</span>
						</th>
						<th>
							<span className="table-header-text">運賃</span>
						</th>
						<th>
							<span className="table-header-text">下払運賃</span>
						</th>
						<th>
							<span className="table-header-text">内部振替運賃</span>
						</th>
						<th style={{ width: "8rem" }}>
							<span className="table-header-text">請求年月</span>
						</th>
						<th>
							<span className="table-header-text">ステータス</span>
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
								<td>{row.inquiryNo}</td>
								<td>{row.operationDate}</td>
								<td>{row.deliveryDate}</td>
								<td>{row.requester}</td>
								<td>{row.destination}</td>
								<td className="text-end">{row.quantity}</td>
								<td className="text-end">{row.fare}</td>
								<td className="text-end">{row.payoutFare}</td>
								<td className="text-end">{row.internalTransferFare}</td>
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
