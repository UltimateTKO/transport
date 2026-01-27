"use client";

import { Fragment, useEffect, useState } from "react";
import { Container, Button, Form, Table, Row, Col, Modal } from "react-bootstrap";
import { CommonGroupLabel, CommonInputBox, RequiredMark } from "@/components/CommonComponent";
import { BsTruck } from "react-icons/bs";

type TrackingDetail = {
	id: string;
	departAt: string;
	arriveAt: string;
	fromLocation: string;
	toLocation: string;
};

type TrackingResult = {
	id: number;
	trackingNo: string;
	departDate: string;
	shipper: string;
	consignee: string;
	deliveryDate: string;
	status: string;
	details: TrackingDetail[];
};

type TrackingResultTableProps = {
	rows: TrackingResult[];
};

type TrackingInput = {
	value: string;
	status: string;
};

type TrackingFormState = TrackingInput[];

const TRACKING_DATA: TrackingResult[] = [
	{
		id: 1,
		trackingNo: "2026012800001",
		departDate: "2026/01/20",
		shipper: "九州倉庫",
		consignee: "オーズカンパニー",
		deliveryDate: "2026/01/21",
		status: "納品済",
		details: [
			{
				id: "1",
				departAt: "",
				arriveAt: "2026/01/18 15:00",
				fromLocation: "九州倉庫",
				toLocation: "博多港",
			},
			{
				id: "2",
				departAt: "2026/01/19 17:00",
				arriveAt: "2026/01/21 07:00",
				fromLocation: "博多港",
				toLocation: "那覇港",
			},
			{
				id: "3",
				departAt: "2026/01/21 11:00",
				arriveAt: "2026/01/21 12:00",
				fromLocation: "那覇港",
				toLocation: "あんしん総合流通センター",
			},
			{
				id: "4",
				departAt: "2026/01/21 15:00",
				arriveAt: "2026/01/21 18:00",
				fromLocation: "あんしん総合流通センター",
				toLocation: "オーズカンパニー",
			},
		],
	},
	{
		id: 2,
		trackingNo: "2026012800002",
		departDate: "2026/01/28",
		shipper: "港町物流センター",
		consignee: "caféポンチェ",
		deliveryDate: "2026/01/28",
		status: "輸送中",
		details: [
			{
				id: "1",
				departAt: "2026/01/28 08:00",
				arriveAt: "2026/01/28 10:00",
				fromLocation: "港町物流センター",
				toLocation: "キンザー営業所",
			},
			{
				id: "2",
				departAt: "2026/01/28 13:00",
				arriveAt: "",
				fromLocation: "キンザー営業所",
				toLocation: "caféポンチェ",
			},
		],
	},
	{
		id: 3,
		trackingNo: "2026012800003",
		departDate: "2026/01/28",
		shipper: "沖縄第一倉庫",
		consignee: "イタリアン料理 mou",
		deliveryDate: "2026/01/29",
		status: "受付",
		details: [
			{
				id: "1",
				departAt: "",
				arriveAt: "2026/01/28 09:00",
				fromLocation: "友睦物流",
				toLocation: "キンザー営業所",
			},
		],
	},
];

const applyStatuses = (state: TrackingFormState): TrackingFormState => {
	return state.map((input) => {
		const inputValue = input.value.trim();
		const matchedRow = TRACKING_DATA.find((row) => row.trackingNo === inputValue);
		return {
			value: input.value,
			status: matchedRow ? matchedRow.status : inputValue ? "該当なし" : "",
		};
	});
};

const filterRows = (state: TrackingFormState): TrackingResult[] => {
	const activeNos = state.map((entry) => entry.value.trim()).filter((value) => value.length > 0);

	if (activeNos.length === 0) {
		return TRACKING_DATA;
	}

	return TRACKING_DATA.filter((row) => activeNos.includes(row.trackingNo));
};

const INITIAL_FORM_STATE: TrackingFormState = applyStatuses([
	{ value: "2026012800001", status: "" },
	{ value: "2026012800002", status: "" },
	{ value: "2026012800003", status: "" },
]);

/// 貨物追跡画面
export default function Transport050Client() {
	const [formState, setFormState] = useState<TrackingFormState>(INITIAL_FORM_STATE);

	const [tableRows, setTableRows] = useState<TrackingResult[]>(() => filterRows(INITIAL_FORM_STATE));
	const [showSignatureModal, setShowSignatureModal] = useState(false);
	const [selectedTrackingNo, setSelectedTrackingNo] = useState<string | null>(null);

	const handleTrackingChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value.trim();
		setFormState((prev) => prev.map((input, idx) => (idx === index ? { ...input, value: inputValue, status: "" } : input)));
	};

	const handleAddInput = () => {
		setFormState((prev) => [...prev, { value: "", status: "" }]);
	};

	const handleSearch = () => {
		setFormState((prev) => {
			const next = applyStatuses(prev);
			setTableRows(filterRows(next));
			return next;
		});
	};

	const handleCloseSignature = () => {
		setShowSignatureModal(false);
		setSelectedTrackingNo(null);
	};

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					{formState.map((input, index) => (
						<Row className="gx-1 gy-2 mb-2" key={`tracking-input-${index}`}>
							<Col md={12} lg={4} xxl={4}>
								<CommonGroupLabel
									required={index === 0}
									label="問合せNo/伝票No"
									style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
								>
									<CommonInputBox
										id={`trackingNo-${index}`}
										value={input.value}
										placeholder="問合せNo/伝票Noを入力"
										onChange={handleTrackingChange(index)}
									/>
								</CommonGroupLabel>
							</Col>
						</Row>
					))}
					<Row className="gx-1 gy-2 mb-2">
						<Col md={12} lg={4} xxl={4}>
							<Button className="btn btn-gradient px-3" type="button" onClick={handleAddInput}>
								入力欄を追加
							</Button>
						</Col>
					</Row>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} className="d-flex justify-content-center gap-2 mt-3">
							<Button className="btn btn-gradient px-3" type="button" onClick={handleSearch}>
								検索
							</Button>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
				<TrackingResultTable rows={tableRows} />

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

					<div className="small text-muted">全 {tableRows.length} アイテム表示中</div>
				</footer>
			</section>

			<Modal show={showSignatureModal} onHide={handleCloseSignature} centered size="lg">
				<Modal.Header closeButton>
					<Modal.Title>受領確認{selectedTrackingNo ? ` - ${selectedTrackingNo}` : ""}</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<img src="/サイン秋葉.png" alt="受領サイン" className="img-fluid" />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseSignature}>
						閉じる
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

function TrackingResultTable({ rows }: TrackingResultTableProps) {
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	useEffect(() => {
		setExpandedRows((prev) => prev.filter((id) => rows.some((row) => row.id === id)));
	}, [rows]);

	return (
		<div className="table-responsive border rounded transport050-table">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2.5rem" }}></th>
						<th>
							<span className="table-header-text">問合せNo/伝票No</span>
						</th>
						<th>
							<span className="table-header-text">出発日</span>
						</th>
						<th>
							<span className="table-header-text">納品日</span>
						</th>
						<th>
							<span className="table-header-text">出荷元</span>
						</th>
						<th>
							<span className="table-header-text">納品先</span>
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
								<td className="text-center">
									<Button
										variant="outline-primary"
										size="sm"
										className="px-2 py-0"
										onClick={() => toggleRow(row.id)}
										aria-label={`${row.trackingNo}の追跡詳細を${expandedRows.includes(row.id) ? "閉じる" : "開く"}`}
									>
										{expandedRows.includes(row.id) ? "-" : "+"}
									</Button>
								</td>
								<td>{row.trackingNo}</td>
								<td>{row.departDate}</td>
								<td>{row.deliveryDate}</td>
								<td>{row.shipper}</td>
								<td>{row.consignee}</td>
								<td>{row.status}</td>
							</tr>

							{expandedRows.includes(row.id) && (
								<tr className="bg-light">
									<td></td>
									<td colSpan={5} className="p-0">
										<Table className="mb-0 table-bordered table-sm">
											<thead>
												<tr className="table-secondary">
													<th>
														<span className="table-header-text">出発日時</span>
													</th>
													<th>
														<span className="table-header-text">From地点</span>
													</th>
													<th></th>
													<th>
														<span className="table-header-text">到着日時</span>
													</th>
													<th>
														<span className="table-header-text">To地点</span>
													</th>
												</tr>
											</thead>
											<tbody>
												{row.details.map((detail) => (
													<tr key={detail.id}>
														<td className={detail.arriveAt ? "text-muted" : ""}>{detail.departAt}</td>
														<td className={detail.arriveAt ? "text-muted" : ""}>{detail.fromLocation}</td>
														<td
															className={
																detail.arriveAt ? "text-muted justify-content-center" : "justify-content-center"
															}
														>
															<BsTruck size={24} />
														</td>
														<td className={detail.arriveAt ? "text-muted" : ""}>{detail.arriveAt}</td>
														<td className={detail.arriveAt ? "text-muted" : ""}>{detail.toLocation}</td>
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
		</div>
	);
}
