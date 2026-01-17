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
		{ key: "C010", value: "福岡倉庫" },
		{ key: "C020", value: "九州倉庫" },
		{ key: "C030", value: "古賀倉庫" },
	];
	const [showDetailModal, setShowDetailModal] = useState(false);

	const invoiceHeaders: InvoiceHeader[] = [
		{
			id: 1,
			invoiceNo: "20251210001",
			invoiceMonth: "2025/12",
			billingCustomerCode: "福岡倉庫",
			billingFare: "420,000",
			billingAdvance: "20,000",
			billingTotal: "440,000",
			status: "請求済み",
		},
		{
			id: 2,
			invoiceNo: "20251210002",
			invoiceMonth: "2025/12",
			billingCustomerCode: "九州倉庫",
			billingFare: "200,000",
			billingAdvance: "10,000",
			billingTotal: "210,000",
			status: "請求済み",
		},
		{
			id: 3,
			invoiceNo: "20251210003",
			invoiceMonth: "2025/12",
			billingCustomerCode: "古賀倉庫",
			billingFare: "150,000",
			billingAdvance: "7,500",
			billingTotal: "157,500",
			status: "請求済み",
		},
	];

	const invoiceDetails: InvoiceDetail[] = [
		{
			id: 1,
			invoiceDetailNo: "1",
			operationDate: "2025/12/02",
			unloadingDate: "2025/12/03",
			slipOrInquiryNo: "20251202000001",
			deliveryDestination: "平川マリーナマルシェ",
			billingFare: "120,000",
			billingAdvance: "5,500",
			billingTotal: "125,500",
		},
		{
			id: 2,
			invoiceDetailNo: "2",
			operationDate: "2025/12/04",
			unloadingDate: "2025/12/05",
			slipOrInquiryNo: "20251204000002",
			deliveryDestination: "福岡商店",
			billingFare: "50,000",
			billingAdvance: "1,000",
			billingTotal: "51,000",
		},
		{
			id: 3,
			invoiceDetailNo: "3",
			operationDate: "2025/12/10",
			unloadingDate: "2025/12/11",
			slipOrInquiryNo: "20251210000003",
			deliveryDestination: "鹿児島商会",
			billingFare: "75,000",
			billingAdvance: "4,000",
			billingTotal: "79,000",
		},
		{
			id: 4,
			invoiceDetailNo: "4",
			operationDate: "2025/12/19",
			unloadingDate: "2025/12/22",
			slipOrInquiryNo: "20251219000004",
			deliveryDestination: "平川マリーナマルシェ",
			billingFare: "100,000",
			billingAdvance: "5,500",
			billingTotal: "105,500",
		},
		{
			id: 5,
			invoiceDetailNo: "5",
			operationDate: "2025/12/24",
			unloadingDate: "2025/12/25",
			slipOrInquiryNo: "20251224000005",
			deliveryDestination: "鹿児島商会",
			billingFare: "75,000",
			billingAdvance: "4,000",
			billingTotal: "79,000",
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

					<div className="small text-muted">全 5 アイテム中 1 から 5 を表示中</div>
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
										<th>
											<span className="table-header-text">請求立替金</span>
										</th>
										<th>
											<span className="table-header-text">請求合計金額</span>
										</th>
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
											<td className="text-end">{row.billingAdvance}</td>
											<td className="text-end">{row.billingTotal}</td>
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
							<span className="table-header-text">請求立替金</span>
						</th>
						<th>
							<span className="table-header-text">請求合計金額</span>
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
							<td className="text-end">{row.billingAdvance}</td>
							<td className="text-end">{row.billingTotal}</td>
							<td>{row.status}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
