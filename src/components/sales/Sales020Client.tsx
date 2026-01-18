"use client";

import { Fragment } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, RequiredMark, CommonInputBox } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

// -----------------------------
// 売上推移表用データ型
// -----------------------------
type SalesTrendRow = {
	// 依頼元
	requestor: string;
	// 運賃
	fare: number[];
	// 立替金
	advance: number[];
};

type DayInfo = {
	day: number;
	weekday: string;
};

type Sales020ClientProps = {
	localMonth: string;
};

const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];

const toMonthDays = (monthValue: string): DayInfo[] => {
	const [yearText, monthText] = monthValue.split("-");
	const year = Number(yearText);
	const month = Number(monthText);
	if (!year || !month) {
		return [];
	}
	const lastDate = new Date(year, month, 0).getDate();
	return Array.from({ length: lastDate }, (_, index) => {
		const day = index + 1;
		const date = new Date(year, month - 1, day);
		return {
			day,
			weekday: weekdayLabels[date.getDay()],
		};
	});
};

const formatAmount = (value: number) => value.toLocaleString("ja-JP");

export default function Sales020Client({ localMonth }: Sales020ClientProps) {
	const deptList: ListItem[] = [
		{ key: "FOKFKC", value: "福岡かすやINC" },
		{ key: "FOKK2C", value: "福岡かすや第2センター" },
		{ key: "FOKFMC", value: "二又瀬物流センター" },
		{ key: "SAGTSE", value: "鳥栖営業所" },
		{ key: "KGSMKC", value: "南九州物流センター" },
		{ key: "KGSKMC", value: "鹿児島南センター" },
	];

	const days = toMonthDays(localMonth);
	const rows: SalesTrendRow[] = [
		{
			// 福岡倉庫
			requestor: "福岡倉庫",
			fare: [
				99000, 0, 0, 0, 0, 21000, 21000, 0, 0, 0, 0, 0, 9500, 9500, 0, 0, 0, 0, 0, 9500, 9500, 0, 0, 0, 0, 0, 9500,
				9500, 0, 0, 0, 0,
			],
			advance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		},
		{
			// 九州倉庫
			requestor: "九州倉庫",
			fare: [
				189000, 0, 0, 0, 0, 21000, 0, 0, 21000, 21000, 0, 0, 0, 0, 0, 21000, 21000, 0, 0, 0, 0, 0, 21000, 21000, 0, 0,
				0, 0, 0, 21000, 21000, 0,
			],
			advance: [
				10800, 0, 0, 0, 0, 1200, 0, 0, 1200, 1200, 0, 0, 0, 0, 0, 1200, 1200, 0, 0, 0, 0, 0, 1200, 1200, 0, 0, 0, 0, 0,
				1200, 1200, 0,
			],
		},
		{
			// 古賀倉庫
			requestor: "古賀倉庫",
			fare: [
				117000, 0, 0, 0, 0, 21000, 0, 0, 0, 12000, 12000, 0, 0, 0, 0, 0, 12000, 12000, 0, 0, 0, 0, 0, 12000, 12000, 0,
				0, 0, 0, 0, 12000, 12000,
			],
			advance: [
				15000, 0, 0, 0, 0, 3000, 0, 0, 0, 1500, 1500, 0, 0, 0, 0, 0, 1500, 1500, 0, 0, 0, 0, 0, 1500, 1500, 0, 0, 0, 0,
				0, 1500, 1500,
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
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={true} label="売上年月">
								<CommonInputBox id="salesMonth" type="month" defaultValue={localMonth} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={true} label="売上部門">
								<CommonComboBox id="salesDept" list={deptList} showKey={true} defaultValue="FOKFKC" />
							</CommonGroupLabel>
						</Col>

						<Col md={12} className="d-flex justify-content-center gap-2 mt-3">
							<Button className="btn btn-gradient px-3">検索</Button>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
				<div className="table-responsive border rounded">
					<Table className="mb-0 table-bordered table-sm table-striped align-middle text-nowrap">
						<thead>
							<tr className="table-primary">
								<th rowSpan={2} style={{ minWidth: "10rem" }}>
									<span className="table-header-text">依頼元</span>
								</th>
								<th rowSpan={2} style={{ minWidth: "6rem" }}>
									<span className="table-header-text">運賃/立替金</span>
								</th>
								<th rowSpan={2} style={{ minWidth: "6rem" }}>
									<span className="table-header-text">合計額</span>
								</th>
							</tr>
							<tr className="table-primary">
								{days.map((day) => (
									<th key={day.day} className="text-center" style={{ minWidth: "3.5rem" }}>
										<div className="small">{day.day}</div>
										<div className="small text-muted">({day.weekday})</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => {
								const fareTotal = row.fare.reduce((sum, value) => sum + value, 0);
								const advanceTotal = row.advance.reduce((sum, value) => sum + value, 0);
								const combinedTotal = fareTotal + advanceTotal;

								return (
									<Fragment key={row.requestor}>
										<tr>
											<td rowSpan={3} className="align-middle fw-semibold bg-white">
												{row.requestor}
											</td>
											<td className="bg-white">運賃</td>
											{row.fare.map((value, index) => (
												<td key={`fare-${row.requestor}-${index}`} className="text-end">
													{value ? formatAmount(value) : ""}
												</td>
											))}
											{/* <td className="text-end fw-semibold bg-white">{formatAmount(fareTotal)}</td> */}
										</tr>
										<tr>
											<td className="bg-white">立替金</td>
											{row.advance.map((value, index) => (
												<td key={`advance-${row.requestor}-${index}`} className="text-end">
													{value ? formatAmount(value) : ""}
												</td>
											))}
											{/* <td className="text-end fw-semibold bg-white">{formatAmount(advanceTotal)}</td> */}
										</tr>
										<tr className="table-secondary">
											<td className="fw-semibold">合計</td>
											{row.fare.map((value, index) => (
												<td key={`total-${row.requestor}-${index}`} className="text-end fw-semibold">
													{value + row.advance[index] ? formatAmount(value + row.advance[index]) : ""}
												</td>
											))}
											{/* <td className="text-end fw-semibold">{formatAmount(combinedTotal)}</td> */}
										</tr>
									</Fragment>
								);
							})}
						</tbody>
					</Table>
				</div>
			</section>
		</Container>
	);
}
