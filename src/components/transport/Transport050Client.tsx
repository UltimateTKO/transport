"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import { CommonGroupLabel, CommonInputBox, RequiredMark } from "@/components/CommonComponent";

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
	status: string;
	details: TrackingDetail[];
};

type TrackingResultTableProps = {
	rows: TrackingResult[];
};

export default function Transport050Client() {
	const rows: TrackingResult[] = [
		{
			id: 1,
			trackingNo: "20260001",
			departDate: "2026/12/03",
			shipper: "東京ロジスティクス",
			consignee: "札幌センター",
			status: "輸送中",
			details: [
				{
					id: "1-1",
					departAt: "2026/12/03",
					arriveAt: "2026/12/03",
					fromLocation: "東京港Aゲート",
					toLocation: "仙台中継センター",
				},
				{
					id: "1-2",
					departAt: "2026/12/04",
					arriveAt: "2026/12/04",
					fromLocation: "仙台中継センター",
					toLocation: "札幌センター",
				},
			],
		},
		{
			id: 2,
			trackingNo: "20260002",
			departDate: "2026/12/01",
			shipper: "名古屋DC",
			consignee: "大阪第2倉庫",
			status: "到着済み",
			details: [
				{
					id: "2-1",
					departAt: "2026/12/01",
					arriveAt: "2026/12/01",
					fromLocation: "名古屋DC",
					toLocation: "大阪第2倉庫",
				},
			],
		},
		{
			id: 3,
			trackingNo: "20260003",
			departDate: "2026/12/05",
			shipper: "福岡センター",
			consignee: "鹿児島営業所",
			status: "受付",
			details: [
				{
					id: "3-1",
					departAt: "2026/12/05",
					arriveAt: "-",
					fromLocation: "福岡センター",
					toLocation: "鹿児島営業所",
				},
			],
		},
	];

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel
								required={true}
								label="伝票No/問い合わせNo"
								style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
							>
								<CommonInputBox id="trackingNoPrimary" defaultValue="" placeholder="伝票No/問い合わせNoを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel required={false} label="ステータス">
								<CommonInputBox id="statusPrimary" defaultValue="" readOnly />
							</CommonGroupLabel>
						</Col>
					</Row>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel
								required={false}
								label="伝票No/問い合わせNo"
								style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
							>
								<CommonInputBox id="trackingNoSecondary" defaultValue="" placeholder="伝票No/問い合わせNoを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel required={false} label="ステータス">
								<CommonInputBox id="statusPrimary" defaultValue="" readOnly />
							</CommonGroupLabel>
						</Col>
					</Row>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel
								required={false}
								label="伝票No/問い合わせNo"
								style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
							>
								<CommonInputBox id="trackingNoTertiary" defaultValue="" placeholder="伝票No/問い合わせNoを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel required={false} label="ステータス">
								<CommonInputBox id="statusPrimary" defaultValue="" readOnly />
							</CommonGroupLabel>
						</Col>
					</Row>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} className="d-flex justify-content-center gap-2 mt-3">
							<Button className="btn btn-gradient px-3">検索</Button>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
				<TrackingResultTable rows={rows} />

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
		</Container>
	);
}

function TrackingResultTable({ rows }: TrackingResultTableProps) {
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	return (
		<div className="table-responsive border rounded transport050-table">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2.5rem" }}></th>
						<th>
							<span className="table-header-text">伝票No/問い合わせNo</span>
						</th>
						<th>
							<span className="table-header-text">出発日</span>
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
														<span className="table-header-text">到着日時</span>
													</th>
													<th>
														<span className="table-header-text">From地点</span>
													</th>
													<th>
														<span className="table-header-text">To地点</span>
													</th>
												</tr>
											</thead>
											<tbody>
												{row.details.map((detail) => (
													<tr key={detail.id}>
														<td>{detail.departAt}</td>
														<td>{detail.arriveAt}</td>
														<td>{detail.fromLocation}</td>
														<td>{detail.toLocation}</td>
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
