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
	transportClass: string;
	operationDate: string;
	unloadingDate: string;
	slipNo: string;
	deliveryDestination: string;
	billingFare: string;
	billingAdvance: string;
	billingTotal: string;
	status: string;
	inquiryNo: string;
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
		{ key: "C010", value: "東京商事" },
		{ key: "C020", value: "大阪物流サービス" },
		{ key: "C030", value: "九州フーズ" },
		{ key: "C040", value: "北関東スーパーストア" },
	];
	const transportClassList: ListItem[] = [
		{ key: "pickup", value: "集荷" },
		{ key: "inter_region", value: "地域外幹線" },
		{ key: "intra_region", value: "地域内幹線" },
		{ key: "delivery", value: "配送" },
	];
	const [showDetailModal, setShowDetailModal] = useState(false);

	const invoiceHeaders: InvoiceHeader[] = [
		{
			id: 1,
			invoiceNo: "1",
			invoiceMonth: "2026/02",
			billingCustomerCode: "C010",
			billingFare: "420,000",
			billingAdvance: "30,000",
			billingTotal: "450,000",
			status: "データ作成",
		},
		{
			id: 2,
			invoiceNo: "2",
			invoiceMonth: "2026/02",
			billingCustomerCode: "C030",
			billingFare: "310,000",
			billingAdvance: "18,000",
			billingTotal: "328,000",
			status: "請求済み",
		},
		{
			id: 3,
			invoiceNo: "3",
			invoiceMonth: "2026/01",
			billingCustomerCode: "C020",
			billingFare: "275,000",
			billingAdvance: "12,000",
			billingTotal: "287,000",
			status: "請求済み",
		},
	];

	const invoiceDetails: InvoiceDetail[] = [
		{
			id: 1,
			invoiceDetailNo: "001",
			transportClass: "pickup",
			operationDate: "2026/02/03",
			unloadingDate: "2026/02/04",
			slipNo: "20261101",
			inquiryNo: "QT-5510",
			deliveryDestination: "福岡かすやINC",
			billingFare: "120,000",
			billingAdvance: "5,000",
			billingTotal: "125,000",
			status: "データ作成",
		},
		{
			id: 2,
			invoiceDetailNo: "002",
			transportClass: "intra_region",
			operationDate: "2026/02/05",
			unloadingDate: "2026/02/05",
			slipNo: "20261102",
			inquiryNo: "QT-5511",
			deliveryDestination: "南九州物流センター",
			billingFare: "150,000",
			billingAdvance: "8,000",
			billingTotal: "158,000",
			status: "データ作成",
		},
		{
			id: 3,
			invoiceDetailNo: "003",
			transportClass: "delivery",
			operationDate: "2026/02/06",
			unloadingDate: "2026/02/07",
			slipNo: "20261103",
			inquiryNo: "QT-5512",
			deliveryDestination: "鹿児島南センター",
			billingFare: "150,000",
			billingAdvance: "17,000",
			billingTotal: "167,000",
			status: "請求済み",
		},
	];

	const openDetailModal = () => setShowDetailModal(true);
	const closeDetailModal = () => setShowDetailModal(false);
	const resolveLabel = (list: ListItem[], key: string) => list.find((item) => item.key === key)?.value ?? key;
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

					<div className="small text-muted">全 3 アイテム中 1 から 3 を表示中</div>
				</footer>
			</section>

			<Modal show={showDetailModal} onHide={closeDetailModal} size="xl" fullscreen="lg-down" scrollable>
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
											<span className="table-header-text">運送区分</span>
										</th>
										<th>
											<span className="table-header-text">運行日</span>
										</th>
										<th>
											<span className="table-header-text">荷卸日</span>
										</th>
										<th>
											<span className="table-header-text">伝票No</span>
										</th>
										<th>
											<span className="table-header-text">問い合わせNo</span>
										</th>
										<th>
											<span className="table-header-text">納品先</span>
										</th>
										<th className="text-end">
											<span className="table-header-text">請求運賃</span>
										</th>
										<th className="text-end">
											<span className="table-header-text">請求立替金</span>
										</th>
										<th className="text-end">
											<span className="table-header-text">請求合計金額</span>
										</th>
										<th>
											<span className="table-header-text">ステータス</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{invoiceDetails.map((row) => (
										<tr key={row.id}>
											<td>{row.invoiceDetailNo}</td>
											<td>{resolveLabel(transportClassList, row.transportClass)}</td>
											<td>{row.operationDate}</td>
											<td>{row.unloadingDate}</td>
											<td>{row.slipNo}</td>
											<td>{row.inquiryNo}</td>
											<td>{row.deliveryDestination}</td>
											<td className="text-end">{row.billingFare}</td>
											<td className="text-end">{row.billingAdvance}</td>
											<td className="text-end">{row.billingTotal}</td>
											<td>{row.status}</td>
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
						<th className="text-end">
							<span className="table-header-text">請求運賃</span>
						</th>
						<th className="text-end">
							<span className="table-header-text">請求立替金</span>
						</th>
						<th className="text-end">
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
