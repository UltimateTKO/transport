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
		{ key: "MIBRDC", value: "茨城センター" },
		{ key: "MFKSDC", value: "郡山センター" },
		{ key: "MGNMDC", value: "高崎センター" },
		{ key: "MTTGDC", value: "足利センター" },
		{ key: "MSTMDC", value: "岩槻センター" },
		{ key: "MTIBDC", value: "印西センター" },
		{ key: "OTKYBP", value: "東京神奈川委託先" },
	];
	const [showSales010Modal, setShowSales010Modal] = useState(false);
	const rows: SalesHeader[] = [
		{
			salesNo: "1",
			salesDate: "2026/01/05",
			fare: "63,000",
			advance: "0",
			payoutFareTotal: "32,000",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "11,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "2",
			salesDate: "2026/01/06",
			fare: "21,000",
			advance: "0",
			payoutFareTotal: "10,000",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "7,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "3",
			salesDate: "2026/01/08",
			fare: "21,000",
			advance: "0",
			payoutFareTotal: "10,000",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "7,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "4",
			salesDate: "2026/01/09",
			fare: "33,000",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "7,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "5",
			salesDate: "2026/01/10",
			fare: "12,000",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "7,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "6",
			salesDate: "2026/01/12",
			fare: "9,500",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "7",
			salesDate: "2026/01/13",
			fare: "9,500",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "8",
			salesDate: "2026/01/14",
			fare: "42,500",
			advance: "0",
			payoutFareTotal: "22,000",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "11,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "9",
			salesDate: "2026/01/15",
			fare: "21,000",
			advance: "0",
			payoutFareTotal: "10,000",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "7,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "10",
			salesDate: "2026/01/16",
			fare: "12,000",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "7,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "11",
			salesDate: "2026/01/19",
			fare: "9,500",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "12",
			salesDate: "2026/01/20",
			fare: "9,500",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "13",
			salesDate: "2026/01/21",
			fare: "42,500",
			advance: "0",
			payoutFareTotal: "22,000",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "11,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "14",
			salesDate: "2026/01/22",
			fare: "21,000",
			advance: "0",
			payoutFareTotal: "10,000",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "7,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "15",
			salesDate: "2026/01/23",
			fare: "12,000",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "5,000",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "16",
			salesDate: "2026/01/26",
			fare: "9,500",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "",
			internalTransferAdvanceTotal: "0",
		},
		{
			salesNo: "17",
			salesDate: "2026/01/27",
			fare: "9,500",
			advance: "0",
			payoutFareTotal: "",
			payoutAdvanceTotal: "0",
			internalTransferFareTotal: "",
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
								<CommonComboBox
									id="locationList"
									list={locationList.filter((item) => item.key.startsWith("O"))}
									showKey={true}
									defaultValue="OUADC"
								/>
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

					<div className="small text-muted">
						全 {rows.length} アイテム中 1 から {rows.length} を表示中
					</div>
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
						{/* <th>
							<span className="table-header-text">立替金合計</span>
						</th> */}
						<th>
							<span className="table-header-text">下払運賃合計</span>
						</th>
						{/* <th>
							<span className="table-header-text">下払立替金合計</span>
						</th> */}
						<th>
							<span className="table-header-text">内部振替運賃合計</span>
						</th>
						{/* <th>
							<span className="table-header-text">内部振替立替金合計</span>
						</th> */}
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
								{/* <td className="text-end">{row.advance}</td> */}
								<td className="text-end">{row.payoutFareTotal}</td>
								{/* <td className="text-end">{row.payoutAdvanceTotal}</td> */}
								<td className="text-end">{row.internalTransferFareTotal}</td>
								{/* <td className="text-end">{row.internalTransferAdvanceTotal}</td> */}
							</tr>
						</Fragment>
					))}
				</tbody>
			</Table>
		</div>
	);
}
