"use client";

import { CSSProperties, Fragment, useState } from "react";
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

const requestorColWidthRem = 10;
const typeColWidthRem = 6;
const totalColWidthRem = 6;

const rem = (value: number) => `${value}rem`;

const stickyOffsets = {
	first: rem(0),
	second: rem(requestorColWidthRem),
	third: rem(requestorColWidthRem + typeColWidthRem),
};

const makeStickyStyle = (left: string, backgroundColor = "#fff", zIndex = 3): CSSProperties => ({
	position: "sticky",
	left,
	backgroundColor,
	zIndex,
});

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
const renderAmount = (value: number | null) => (value === null ? "" : formatAmount(value));

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
	const baseRows: SalesTrendRow[] = [
		{
			requestor: "福岡倉庫",
			fare: [
				99000, 0, 0, 0, 0, 21000, 21000, 0, 0, 0, 0, 0, 9500, 9500, 0, 0, 0, 0, 0, 9500, 9500, 0, 0, 0, 0, 0, 9500,
				9500, 0, 0, 0, 0,
			],
			advance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		},
		{
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

	const altRows: SalesTrendRow[] = baseRows.map((row) => ({
		requestor: `${row.requestor}`,
		fare: row.fare.map((value) => Math.round(value * 1.1)),
		advance: row.advance,
	}));

	const rowSets: SalesTrendRow[][] = [baseRows, altRows];
	const [rowSetIndex, setRowSetIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const rows = rowSets[rowSetIndex];

	const handleRecalculate = async () => {
		if (isLoading) return;
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setRowSetIndex((prev) => (prev + 1) % rowSets.length);
		setIsLoading(false);
	};

	return (
		<Container fluid>
			{isLoading ? (
				<div
					className="position-fixed top-50 start-50 translate-middle d-flex flex-column align-items-center gap-2"
					style={{ zIndex: 1050 }}
				>
					<div className="spinner-border text-primary" role="status" aria-hidden="true" />
					<span className="text-muted small">再計算中...</span>
				</div>
			) : null}

			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
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

						<Col md={6} className="d-flex justify-content-center gap-2 mt-3">
							<Button
								type="button"
								className="btn btn-gradient px-3 d-flex align-items-center gap-2"
								onClick={handleRecalculate}
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
										<span>処理中...</span>
									</>
								) : (
									<span>再計算</span>
								)}
							</Button>
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
								<th
									rowSpan={2}
									style={{
										minWidth: rem(requestorColWidthRem),
										...makeStickyStyle(stickyOffsets.first, "var(--bs-table-bg)", 6),
									}}
								>
									<span className="table-header-text">依頼元</span>
								</th>
								<th
									rowSpan={2}
									style={{
										minWidth: rem(typeColWidthRem),
										...makeStickyStyle(stickyOffsets.second, "var(--bs-table-bg)", 6),
									}}
								>
									<span className="table-header-text">運賃/立替金</span>
								</th>
								<th
									rowSpan={2}
									style={{
										minWidth: rem(totalColWidthRem),
										...makeStickyStyle(stickyOffsets.third, "var(--bs-table-bg)", 6),
									}}
								>
									<span className="table-header-text">合計額</span>
								</th>
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
								const visibleFare = days.map((day, index) => (day.day >= 20 ? null : (row.fare[index + 1] ?? null)));
								const visibleAdvance = days.map((day, index) =>
									day.day >= 20 ? null : (row.advance[index + 1] ?? null),
								);
								const fareFirst = row.fare[0] ?? null;
								const advanceFirst = row.advance[0] ?? null;
								const combinedFirst =
									fareFirst === null && advanceFirst === null ? null : (fareFirst ?? 0) + (advanceFirst ?? 0);

								return (
									<Fragment key={row.requestor}>
										<tr>
											<td
												rowSpan={3}
												className="align-middle fw-semibold bg-white"
												style={{
													minWidth: rem(requestorColWidthRem),
													...makeStickyStyle(stickyOffsets.first, "#fff", 5),
												}}
											>
												{row.requestor}
											</td>
											<td
												className="bg-white"
												style={{
													minWidth: rem(typeColWidthRem),
													...makeStickyStyle(stickyOffsets.second, "#fff", 4),
												}}
											>
												運賃
											</td>
											<td
												className="text-end fw-semibold bg-white"
												style={{
													minWidth: rem(totalColWidthRem),
													...makeStickyStyle(stickyOffsets.third, "#fff", 4),
												}}
											>
												{renderAmount(fareFirst)}
											</td>
											{visibleFare.map((value, index) => (
												<td key={`fare-${row.requestor}-${index}`} className="text-end">
													{renderAmount(value)}
												</td>
											))}
										</tr>
										<tr>
											<td
												className="bg-white"
												style={{
													minWidth: rem(typeColWidthRem),
													...makeStickyStyle(stickyOffsets.second, "#fff", 4),
												}}
											>
												立替金
											</td>
											<td
												className="text-end fw-semibold bg-white"
												style={{
													minWidth: rem(totalColWidthRem),
													...makeStickyStyle(stickyOffsets.third, "#fff", 4),
												}}
											>
												{renderAmount(advanceFirst)}
											</td>
											{visibleAdvance.map((value, index) => (
												<td key={`advance-${row.requestor}-${index}`} className="text-end">
													{renderAmount(value)}
												</td>
											))}
										</tr>
										<tr className="table-secondary">
											<td
												className="fw-semibold"
												style={{
													minWidth: rem(typeColWidthRem),
													...makeStickyStyle(stickyOffsets.second, "#e9ecef", 4),
												}}
											>
												合計
											</td>
											<td
												className="text-end fw-semibold"
												style={{
													minWidth: rem(totalColWidthRem),
													...makeStickyStyle(stickyOffsets.third, "#e9ecef", 4),
												}}
											>
												{renderAmount(combinedFirst)}
											</td>
											{visibleFare.map((value, index) => (
												<td key={`total-${row.requestor}-${index}`} className="text-end fw-semibold">
													{renderAmount(value === null ? null : value + (visibleAdvance[index] ?? 0))}
												</td>
											))}
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
