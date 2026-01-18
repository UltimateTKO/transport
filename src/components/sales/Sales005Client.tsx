"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col, Modal } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, RequiredMark, CommonDateRangeBox } from "@/components/CommonComponent";
import Sales010Client from "@/components/sales/Sales010Client";

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

type Sales005ClientProps = {
	localDate: string;
};

type SalesTableProps = {
	rows: SalesHeader[];
};

export default function Sales005Client({ localDate }: Sales005ClientProps) {
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
	const [showSales010Modal, setShowSales010Modal] = useState(false);
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

	const openSales010Modal = () => setShowSales010Modal(true);
	const closeSales010Modal = () => setShowSales010Modal(false);

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
					<Button className="btn btn-gradient px-3" onClick={openSales010Modal}>
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
				show={showSales010Modal}
				onHide={closeSales010Modal}
				dialogClassName="modal-xxl"
				fullscreen="lg-down"
				scrollable
			>
				<Modal.Header closeButton className="border-0">
					<Modal.Title>売上明細</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light">
					<Sales010Client localDate={localDate} />
				</Modal.Body>
				<Modal.Footer className="border-0 pt-0">
					<Button variant="secondary" onClick={closeSales010Modal}>
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
