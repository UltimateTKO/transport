"use client";

import { Fragment, useEffect, useState } from "react";
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

type TrackingFormState = {
	primary: TrackingInput;
	secondary: TrackingInput;
	tertiary: TrackingInput;
};

const TRACKING_DATA: TrackingResult[] = [
	{
		id: 1,
		trackingNo: "202601200001",
		departDate: "2026/1/19",
		shipper: "福岡かすやINC",
		consignee: "平川マリーナマルシェ",
		status: "輸送中",
		deliveryDate: "",
		details: [
			{
				id: "1",
				departAt: "",
				arriveAt: "2026/1/19  09:00:00",
				fromLocation: "福岡倉庫",
				toLocation: "福岡かすやINC",
			},
			{
				id: "2",
				departAt: "2026/1/19  13:00:00",
				arriveAt: "2026/1/19  18:00:00",
				fromLocation: "福岡かすやINC",
				toLocation: "南九州物流センター",
			},
			{
				id: "3",
				departAt: "2026/1/20  08:00:00",
				arriveAt: "",
				fromLocation: "南九州物流センター",
				toLocation: "平川マリーナマルシェ",
			},
		],
	},
	{
		id: 2,
		trackingNo: "202601200002",
		departDate: "2026/1/19",
		shipper: "福岡倉庫",
		consignee: "福岡商店",
		deliveryDate: "",
		status: "受付",
		details: [
			{
				id: "1",
				departAt: "",
				arriveAt: "2026/1/19  09:00:00",
				fromLocation: "福岡倉庫",
				toLocation: "福岡かすやINC",
			},
		],
	},
	{
		id: 3,
		trackingNo: "202601200003",
		departDate: "2026/1/18",
		shipper: "鳥栖倉庫",
		consignee: "業務スーパー 谷山店",
		deliveryDate: "2026/1/19",
		status: "到着済",
		details: [
			{
				id: "1",
				departAt: "",
				arriveAt: "2026/1/18  12:00:00",
				fromLocation: "鳥栖倉庫",
				toLocation: "鳥栖営業所",
			},
			{
				id: "2",
				departAt: "2026/1/18  14:00:00",
				arriveAt: "2026/1/18  18:00:00",
				fromLocation: "鳥栖営業所",
				toLocation: "福岡かすやINC",
			},
			{
				id: "3",
				departAt: "2026/1/19  08:00:00",
				arriveAt: "2026/1/19  12:00:00",
				fromLocation: "福岡かすやINC",
				toLocation: "南九州物流センター",
			},
			{
				id: "4",
				departAt: "2026/1/19  15:00:00",
				arriveAt: "2026/1/19  17:00:00",
				fromLocation: "南九州物流センター",
				toLocation: "業務スーパー 谷山店",
			},
		],
	},
];

const applyStatuses = (state: TrackingFormState): TrackingFormState => {
	const next: TrackingFormState = {
		primary: { value: state.primary.value, status: "" },
		secondary: { value: state.secondary.value, status: "" },
		tertiary: { value: state.tertiary.value, status: "" },
	};

	(Object.keys(next) as Array<keyof TrackingFormState>).forEach((key) => {
		const inputValue = next[key].value.trim();
		const matchedRow = TRACKING_DATA.find((row) => row.trackingNo === inputValue);
		next[key].status = matchedRow ? matchedRow.status : inputValue ? "該当なし" : "";
	});

	return next;
};

const filterRows = (state: TrackingFormState): TrackingResult[] => {
	const activeNos = Object.values(state)
		.map((entry) => entry.value.trim())
		.filter((value) => value.length > 0);

	if (activeNos.length === 0) {
		return TRACKING_DATA;
	}

	return TRACKING_DATA.filter((row) => activeNos.includes(row.trackingNo));
};

const INITIAL_FORM_STATE: TrackingFormState = applyStatuses({
	primary: { value: "202601200001", status: "" },
	secondary: { value: "202601200002", status: "" },
	tertiary: { value: "202601200003", status: "" },
});

export default function Transport050Client() {
	const [formState, setFormState] = useState<TrackingFormState>(INITIAL_FORM_STATE);

	const [tableRows, setTableRows] = useState<TrackingResult[]>(() => filterRows(INITIAL_FORM_STATE));

	const handleTrackingChange = (key: keyof TrackingFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value.trim();
		setFormState((prev) => ({
			...prev,
			[key]: {
				value: inputValue,
				status: "",
			},
		}));
	};

	const handleSearch = () => {
		setFormState((prev) => {
			const next = applyStatuses(prev);
			setTableRows(filterRows(next));
			return next;
		});
	};

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-2">
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel
								required={true}
								label="伝票No/問い合わせNo"
								style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
							>
								<CommonInputBox
									id="trackingNoPrimary"
									value={formState.primary.value}
									placeholder="伝票No/問い合わせNoを入力"
									onChange={handleTrackingChange("primary")}
								/>
							</CommonGroupLabel>
						</Col>
					</Row>
					<Row className="gx-1 gy-2 mb-2">
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel
								required={false}
								label="伝票No/問い合わせNo"
								style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
							>
								<CommonInputBox
									id="trackingNoSecondary"
									value={formState.secondary.value}
									placeholder="伝票No/問い合わせNoを入力"
									onChange={handleTrackingChange("secondary")}
								/>
							</CommonGroupLabel>
						</Col>
					</Row>
					<Row className="gx-1 gy-2 mb-2">
						<Col md={12} lg={4} xxl={4}>
							<CommonGroupLabel
								required={false}
								label="伝票No/問い合わせNo"
								style={{ gridTemplateColumns: "10rem minmax(0, 1fr)" }}
							>
								<CommonInputBox
									id="trackingNoTertiary"
									value={formState.tertiary.value}
									placeholder="伝票No/問い合わせNoを入力"
									onChange={handleTrackingChange("tertiary")}
								/>
							</CommonGroupLabel>
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
							<span className="table-header-text">伝票No/問い合わせNo</span>
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
