"use client";

import { useState } from "react";
import { Container, Button, Form, Table, Row, Col, Modal } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, CommonInputBox, RequiredMark } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type InvoiceHeader = {
	id: number;
	invoiceNo: string;
	invoiceMonth: string;
	billingCustomerCode: string;
	billingFare: string;
	billingAdvance: string;
	billingTotal: string;
	status: string;
};

type InvoiceDetail = {
	id: number;
	invoiceDetailNo: string;
	operationDate: string;
	unloadingDate: string;
	slipOrInquiryNo: string;
	deliveryDestination: string;
	billingFare: string;
	billingAdvance: string;
	billingTotal: string;
};

type Invoice020ClientProps = {
	localMonth: string;
};

type InvoiceTableProps = {
	rows: InvoiceHeader[];
	resolveCustomerLabel: (code: string) => string;
};

export default function Invoice020Client({ localMonth }: Invoice020ClientProps) {
	const statusList: ListItem[] = [
		{ key: "0", value: "データ作成" },
		{ key: "1", value: "請求済み" },
	];
	const billingCustomerList: ListItem[] = [
		{ key: "C010", value: "茨城食品" },
		{ key: "C020", value: "千代川フード" },
		{ key: "C030", value: "前山商店" },
	];
	const [showDetailModal, setShowDetailModal] = useState(false);

	const invoiceHeaders: InvoiceHeader[] = [
		{
			id: 1,
			invoiceNo: "20260110001",
			invoiceMonth: "2026/01",
			billingCustomerCode: "C010",
			billingFare: "210,000",
			billingAdvance: "0",
			billingTotal: "210,000",
			status: "請求済み",
		},
		{
			id: 2,
			invoiceNo: "20260110002",
			invoiceMonth: "2026/01",
			billingCustomerCode: "C020",
			billingFare: "150,000",
			billingAdvance: "0",
			billingTotal: "150,000",
			status: "請求済み",
		},
		{
			id: 3,
			invoiceNo: "20260110003",
			invoiceMonth: "2026/01",
			billingCustomerCode: "C030",
			billingFare: "70,000",
			billingAdvance: "0",
			billingTotal: "70,000",
			status: "請求済み",
		},
	];

	const invoiceDetails: InvoiceDetail[] = [
		{
			id: 1,
			invoiceDetailNo: "1",
			operationDate: "2026/01/05",
			unloadingDate: "2026/01/05",
			slipOrInquiryNo: "20260105100001",
			deliveryDestination: "ばんどう太郎 古河店",
			billingFare: "20,000",
			billingAdvance: "0",
			billingTotal: "20,000",
		},
		{
			id: 2,
			invoiceDetailNo: "2",
			operationDate: "2026/01/05",
			unloadingDate: "2026/01/05",
			slipOrInquiryNo: "20260105100002",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "20,000",
			billingAdvance: "0",
			billingTotal: "20,000",
		},
		{
			id: 3,
			invoiceDetailNo: "3",
			operationDate: "2026/01/05",
			unloadingDate: "2026/01/05",
			slipOrInquiryNo: "20260105100003",
			deliveryDestination: "はのは",
			billingFare: "20,000",
			billingAdvance: "0",
			billingTotal: "20,000",
		},
		{
			id: 4,
			invoiceDetailNo: "4",
			operationDate: "2026/01/06",
			unloadingDate: "2026/01/06",
			slipOrInquiryNo: "20260106100001",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 5,
			invoiceDetailNo: "5",
			operationDate: "2026/01/08",
			unloadingDate: "2026/01/08",
			slipOrInquiryNo: "20260107100001",
			deliveryDestination: "ばんどう太郎 古河店",
			billingFare: "12,000",
			billingAdvance: "0",
			billingTotal: "12,000",
		},
		{
			id: 6,
			invoiceDetailNo: "6",
			operationDate: "2026/01/08",
			unloadingDate: "2026/01/08",
			slipOrInquiryNo: "20260107100002",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 7,
			invoiceDetailNo: "7",
			operationDate: "2026/01/08",
			unloadingDate: "2026/01/08",
			slipOrInquiryNo: "20260107100003",
			deliveryDestination: "はのは",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 8,
			invoiceDetailNo: "8",
			operationDate: "2026/01/13",
			unloadingDate: "2026/01/13",
			slipOrInquiryNo: "20260113100001",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 9,
			invoiceDetailNo: "9",
			operationDate: "2026/01/15",
			unloadingDate: "2026/01/15",
			slipOrInquiryNo: "20260115100001",
			deliveryDestination: "ばんどう太郎 古河店",
			billingFare: "12,000",
			billingAdvance: "0",
			billingTotal: "12,000",
		},
		{
			id: 10,
			invoiceDetailNo: "10",
			operationDate: "2026/01/15",
			unloadingDate: "2026/01/15",
			slipOrInquiryNo: "20260115100002",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 11,
			invoiceDetailNo: "11",
			operationDate: "2026/01/15",
			unloadingDate: "2026/01/15",
			slipOrInquiryNo: "20260115100003",
			deliveryDestination: "はのは",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 12,
			invoiceDetailNo: "12",
			operationDate: "2026/01/19",
			unloadingDate: "2026/01/19",
			slipOrInquiryNo: "20260119100001",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 13,
			invoiceDetailNo: "13",
			operationDate: "2026/01/20",
			unloadingDate: "2026/01/20",
			slipOrInquiryNo: "20260120100001",
			deliveryDestination: "はのは",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 14,
			invoiceDetailNo: "14",
			operationDate: "2026/01/22",
			unloadingDate: "2026/01/22",
			slipOrInquiryNo: "20260122100001",
			deliveryDestination: "ばんどう太郎 古河店",
			billingFare: "12,000",
			billingAdvance: "0",
			billingTotal: "12,000",
		},
		{
			id: 15,
			invoiceDetailNo: "15",
			operationDate: "2026/01/22",
			unloadingDate: "2026/01/22",
			slipOrInquiryNo: "20260122100002",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 16,
			invoiceDetailNo: "16",
			operationDate: "2026/01/22",
			unloadingDate: "2026/01/22",
			slipOrInquiryNo: "20260122100003",
			deliveryDestination: "はのは",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 17,
			invoiceDetailNo: "17",
			operationDate: "2026/01/26",
			unloadingDate: "2026/01/26",
			slipOrInquiryNo: "20260126100001",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 18,
			invoiceDetailNo: "18",
			operationDate: "2026/01/27",
			unloadingDate: "2026/01/27",
			slipOrInquiryNo: "20260127100001",
			deliveryDestination: "はのは",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 19,
			invoiceDetailNo: "19",
			operationDate: "2026/01/29",
			unloadingDate: "2026/01/29",
			slipOrInquiryNo: "20260129100001",
			deliveryDestination: "ばんどう太郎 古河店",
			billingFare: "12,000",
			billingAdvance: "0",
			billingTotal: "12,000",
		},
		{
			id: 20,
			invoiceDetailNo: "20",
			operationDate: "2026/01/29",
			unloadingDate: "2026/01/29",
			slipOrInquiryNo: "20260129100002",
			deliveryDestination: "ジョティー 古河店",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
		{
			id: 21,
			invoiceDetailNo: "21",
			operationDate: "2026/01/29",
			unloadingDate: "2026/01/29",
			slipOrInquiryNo: "20260129100003",
			deliveryDestination: "はのは",
			billingFare: "9,500",
			billingAdvance: "0",
			billingTotal: "9,500",
		},
	];

	const openDetailModal = () => setShowDetailModal(true);
	const closeDetailModal = () => setShowDetailModal(false);
	const resolveCustomerLabel = (code: string) => {
		const customer = billingCustomerList.find((item) => item.key === code);
		return customer ? `${customer.key}:${customer.value}` : code;
	};

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
							<CommonGroupLabel required={true} label="請求年月">
								<CommonInputBox id="invoiceMonth" type="month" defaultValue={localMonth} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={false} label="請求先">
								<CommonComboBox id="billingCustomer" list={billingCustomerList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={3} xxl={2}>
							<CommonGroupLabel required={false} label="ステータス">
								<CommonComboBox id="status" list={statusList} showKey={true} />
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
					<Button className="btn btn-gradient px-3" onClick={openDetailModal}>
						請求明細
					</Button>
				</div>
				<InvoiceTable rows={invoiceHeaders} resolveCustomerLabel={resolveCustomerLabel} />

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

					<div className="small text-muted">全 21 アイテム中 1 から 21 を表示中</div>
				</footer>
			</section>

			<Modal
				show={showDetailModal}
				onHide={closeDetailModal}
				dialogClassName="modal-xxl"
				fullscreen="lg-down"
				scrollable
			>
				<Modal.Header closeButton className="border-0">
					<Modal.Title>請求明細</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light">
					<section className="panel-block mb-0">
						<header className="panel-block-header d-flex align-items-center">
							<span className="panel-block-title mb-0">請求明細</span>
						</header>
						<div className="table-responsive border rounded">
							<Table className="mb-0 table-bordered table-sm table-striped align-middle text-nowrap">
								<thead>
									<tr className="table-primary">
										<th>
											<span className="table-header-text">請求明細No</span>
										</th>
										<th>
											<span className="table-header-text">運行開始日</span>
										</th>
										<th>
											<span className="table-header-text">荷卸日</span>
										</th>
										<th>
											<span className="table-header-text">伝票No/問い合わせNo</span>
										</th>
										<th>
											<span className="table-header-text">納品先</span>
										</th>
										<th>
											<span className="table-header-text">請求運賃</span>
										</th>
										{/* <th>
											<span className="table-header-text">請求立替金</span>
										</th>
										<th>
											<span className="table-header-text">請求合計金額</span>
										</th> */}
									</tr>
								</thead>
								<tbody>
									{invoiceDetails.map((row) => (
										<tr key={row.id}>
											<td>{row.invoiceDetailNo}</td>
											<td>{row.operationDate}</td>
											<td>{row.unloadingDate}</td>
											<td>{row.slipOrInquiryNo}</td>
											<td>{row.deliveryDestination}</td>
											<td className="text-end">{row.billingFare}</td>
											{/* <td className="text-end">{row.billingAdvance}</td> */}
											{/* <td className="text-end">{row.billingTotal}</td> */}
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</section>
				</Modal.Body>
				<Modal.Footer className="border-0 pt-0">
					<Button variant="secondary" onClick={closeDetailModal}>
						閉じる
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

function InvoiceTable({ rows, resolveCustomerLabel }: InvoiceTableProps) {
	return (
		<div className="table-responsive border rounded">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2rem" }}>
							<Form.Check type="checkbox" />
						</th>
						<th>
							<span className="table-header-text">請求No</span>
						</th>
						<th>
							<span className="table-header-text">請求年月</span>
						</th>
						<th>
							<span className="table-header-text">請求先</span>
						</th>
						<th>
							<span className="table-header-text">請求運賃</span>
						</th>
						<th>
							<span className="table-header-text">ステータス</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.id} className="align-middle">
							<td>
								<Form.Check type="checkbox" />
							</td>
							<td>{row.invoiceNo}</td>
							<td>{row.invoiceMonth}</td>
							<td>{resolveCustomerLabel(row.billingCustomerCode)}</td>
							<td className="text-end">{row.billingFare}</td>
							<td>{row.status}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
