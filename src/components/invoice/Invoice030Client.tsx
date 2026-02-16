"use client";

import { CSSProperties, Fragment } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, CommonDateRangeBox, RequiredMark } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type BillingTrendRow = {
	// 請求先
	billingCustomer: string;
	// 運賃
	fare: number[];
	// 立替金
	advance: number[];
};

type MonthInfo = {
	label: string;
	year: number;
	month: number;
};

type Invoice030ClientProps = {
	localMonth: string;
};

const billingCustomerColWidthRem = 10;
const typeColWidthRem = 6;
const totalColWidthRem = 7;

const rem = (value: number) => `${value}rem`;

const stickyOffsets = {
	first: rem(0),
	second: rem(billingCustomerColWidthRem),
	third: rem(billingCustomerColWidthRem + typeColWidthRem),
};

const makeStickyStyle = (left: string, backgroundColor = "#fff", zIndex = 3): CSSProperties => ({
	position: "sticky",
	left,
	backgroundColor,
	zIndex,
});

const toPastYearMonths = (monthValue: string): MonthInfo[] => {
	const [yearText, monthText] = monthValue.split("-");
	const year = Number(yearText);
	const month = Number(monthText);
	if (!year || !month) {
		return [];
	}

	return Array.from({ length: 6 }, (_, index) => {
		const date = new Date(year, month - 1 - index, 1);
		return {
			label: `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}`,
			year: date.getFullYear(),
			month: date.getMonth() + 1,
		};
	});
};

const toPreviousMonth = (monthValue: string): string => {
	const [yearText, monthText] = monthValue.split("-");
	const year = Number(yearText);
	const month = Number(monthText);
	if (!year || !month) {
		return "";
	}

	const date = new Date(year, month - 6, 1);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const formatAmount = (value: number) => value.toLocaleString("ja-JP");
const renderAmount = (value: number | null) => (value === null ? "" : formatAmount(value));

export default function Invoice030Client({ localMonth }: Invoice030ClientProps) {
	const deptList: ListItem[] = [
		{ key: "MIBRDC", value: "茨城センター" },
		{ key: "MFKSDC", value: "郡山センター" },
		{ key: "MGNMDC", value: "高崎センター" },
		{ key: "MTTGDC", value: "足利センター" },
		{ key: "MSTMDC", value: "岩槻センター" },
		{ key: "MTIBDC", value: "印西センター" },
		{ key: "OTKYBP", value: "東京神奈川委託先" },
	];

	const months = toPastYearMonths(localMonth);

	const rows: BillingTrendRow[] = [
		{
			billingCustomer: "茨城食品",
			fare: [210000, 220000, 150000, 150000, 150000, 220000, 220000, 150000, 150000, 210000, 150000, 150000],
			advance: Array(12).fill(0),
		},
		{
			billingCustomer: "千代川フード",
			fare: [150000, 170000, 130000, 130000, 130000, 170000, 170000, 130000, 130000, 150000, 130000, 130000],
			advance: Array(12).fill(0),
		},
		{
			billingCustomer: "前山商店",
			fare: [70000, 100000, 50000, 50000, 50000, 100000, 100000, 50000, 50000, 70000, 50000, 50000],
			advance: Array(12).fill(0),
		},
	];

	const monthlyTotals = months.map((_, index) => rows.reduce((sum, row) => sum + (row.fare[index] ?? 0), 0));

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={6} xxl={5}>
							<CommonGroupLabel required={true} label="請求年月">
								<CommonDateRangeBox
									id="invoiceMonth"
									defaultFromValue={toPreviousMonth(localMonth)}
									defaultToValue={localMonth}
									type="month"
								/>
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={true} label="売上計上部門">
								<CommonComboBox
									id="salesDept"
									list={deptList.filter((dept) => dept.key.startsWith("O"))}
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
				<div className="table-responsive border rounded">
					<Table className="mb-0 table-bordered table-sm table-striped align-middle text-nowrap">
						<thead>
							<tr className="table-primary">
								<th
									style={{
										minWidth: rem(billingCustomerColWidthRem),
										...makeStickyStyle(stickyOffsets.first, "var(--bs-table-bg)", 5),
									}}
								>
									<span className="table-header-text">請求先</span>
								</th>
								{months.map((month) => (
									<th key={`${month.year}-${month.month}`} className="text-center" style={{ minWidth: "6.5rem" }}>
										<div className="small fw-semibold">{month.label}</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr className="table-secondary">
								<td
									className="align-middle fw-bold"
									style={{
										minWidth: rem(billingCustomerColWidthRem),
										...makeStickyStyle(stickyOffsets.first, "#e9ecef", 5),
									}}
								>
									合計
								</td>
								{months.map((month, index) => (
									<td key={`total-${month.year}-${month.month}`} className="text-end fw-semibold">
										{renderAmount(monthlyTotals[index] ?? null)}
									</td>
								))}
							</tr>
							{rows.map((row) => {
								const fareTotal = row.fare.reduce((sum, value) => sum + value, 0);
								const advanceTotal = row.advance.reduce((sum, value) => sum + value, 0);
								const combinedTotal = fareTotal + advanceTotal;

								return (
									<Fragment key={row.billingCustomer}>
										<tr>
											<td
												className="align-middle fw-semibold bg-white"
												style={{
													minWidth: rem(billingCustomerColWidthRem),
													...makeStickyStyle(stickyOffsets.first, "#fff", 5),
												}}
											>
												{row.billingCustomer}
											</td>
											{months.map((month, index) => (
												<td key={`fare-${row.billingCustomer}-${month.label}`} className="text-end">
													{renderAmount(row.fare[index] ?? null)}
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
