"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import {
	CommonGroupLabel,
	CommonComboBox,
	CommonInputBox,
	RequiredMark,
	CommonDateRangeBox,
} from "@/components/CommonComponent";

type DeliveryInstructionDetail = {
	id: string;
	instructionNo: string;
	detailNo: string;
	productCode: string;
	productName: string;
	manufactureDate: string;
	bestBeforeDate: string;
	lotNo: string;
	quantity: string;
	volume: string;
	weight: string;
	dimensionTotal: string;
	length: string;
	width: string;
	height: string;
};

type DeliveryInstructionHeader = {
	id: number;
	instructionNo: string;
	runDate: string;
	loadingDate: string;
	departureDate: string;
	unloadingPlanDate: string;
	temperatureBand: string;
	orderSource: string;
	officeCode: string;
	inquirySlipNo: string;
	shipperCode: string;
	consigneeCode: string;
	consigneeName: string;
	consigneePostalCode: string;
	consigneeAddress: string;
	consigneePhone: string;
	consigneeFax: string;
	consigneeAddressCode: string;
	consigneePrefectureCode: string;
	consigneeAreaCode: string;
	consigneePrefecture: string;
	consigneeCity: string;
	consigneeTown: string;
	requestedArrivalTime: string;
	quantityTotal: string;
	volume: string;
	weight: string;
	dimensionTotal: string;
	status: string;
	details: DeliveryInstructionDetail[];
};

type ListItem = { key: string; value: string };

type Orders040ClientProps = {
	localDate: string;
};

type DeliveryInstructionTableProps = {
	rows: DeliveryInstructionHeader[];
};

/// 受注 - 配送照会
export default function Orders040Client({ localDate }: Orders040ClientProps) {
	const temperatureBandList: ListItem[] = [
		{ key: "T1", value: "常温" },
		{ key: "T2", value: "クール" },
		{ key: "T3", value: "冷凍" },
	];
	const statusList: ListItem[] = [
		{ key: "accepted", value: "受付" },
		{ key: "in_transit", value: "運行中" },
	];
	// 地点マスタ
	const locationList: ListItem[] = [
		{ key: "MIBRDC", value: "茨城センター" },
		{ key: "MFKSDC", value: "郡山センター" },
		{ key: "MGNMDC", value: "高崎センター" },
		{ key: "MTTGDC", value: "足利センター" },
		{ key: "MSTMDC", value: "岩槻センター" },
		{ key: "MTIBDC", value: "印西センター" },
		{ key: "OTKYBP", value: "東京神奈川委託先" },
	];
	const orderSourceList: ListItem[] = [
		{ key: "OS01", value: "茨城倉庫" },
		{ key: "OS02", value: "千代川倉庫" },
		{ key: "OS03", value: "前山倉庫" },
	];

	const rows: DeliveryInstructionHeader[] = [
		{
			id: 1,
			instructionNo: "20260001",
			runDate: "2026/02/17",
			loadingDate: "2026/02/17",
			departureDate: "2026/02/17",
			unloadingPlanDate: "2026/02/17",
			temperatureBand: "冷凍",
			orderSource: "茨城倉庫",
			officeCode: "茨城センター",
			inquirySlipNo: "20260001",
			shipperCode: "茨城センター",
			consigneeCode: "CNS-000",
			consigneeName: "ばんどう太郎 古河店",
			consigneePostalCode: "",
			consigneeAddress: "茨城県古河市牧野地0-0",
			consigneePhone: "",
			consigneeFax: "",
			consigneeAddressCode: "",
			consigneePrefectureCode: "",
			consigneeAreaCode: "",
			consigneePrefecture: "茨城県",
			consigneeCity: "古河市",
			consigneeTown: "牧野地",
			requestedArrivalTime: "15:00",
			quantityTotal: "10",
			volume: "0.12",
			weight: "20",
			dimensionTotal: "700",
			status: "運行中",
			details: [
				{
					id: "1-1",
					instructionNo: "20260001",
					detailNo: "001",
					productCode: "PRD-100",
					productName: "冷凍スープ",
					manufactureDate: "2026/02/01",
					bestBeforeDate: "2028/02/01",
					lotNo: "AA100021",
					quantity: "3",
					volume: "0.036",
					weight: "6",
					dimensionTotal: "210",
					length: "",
					width: "",
					height: "",
				},
				{
					id: "1-2",
					instructionNo: "20260001",
					detailNo: "002",
					productCode: "PRD-200",
					productName: "加工肉セット",
					manufactureDate: "2026/02/01",
					bestBeforeDate: "2028/02/01",
					lotNo: "AA200021",
					quantity: "7",
					volume: "0.084",
					weight: "14",
					dimensionTotal: "490",
					length: "",
					width: "",
					height: "",
				},
			],
		},
		{
			id: 2,
			instructionNo: "20260002",
			runDate: "2026/02/17",
			loadingDate: "2026/02/17",
			departureDate: "2026/02/17",
			unloadingPlanDate: "2026/02/19",
			temperatureBand: "常温",
			orderSource: "千代川倉庫",
			officeCode: "茨城センター",
			inquirySlipNo: "20260002",
			shipperCode: "千代川倉庫",
			consigneeCode: "CNS-001",
			consigneeName: "本宮柏屋",
			consigneePostalCode: "",
			consigneeAddress: "",
			consigneePhone: "",
			consigneeFax: "",
			consigneeAddressCode: "",
			consigneePrefectureCode: "",
			consigneeAreaCode: "",
			consigneePrefecture: "",
			consigneeCity: "",
			consigneeTown: "",
			requestedArrivalTime: "ー",
			quantityTotal: "20",
			volume: "0.24",
			weight: "40",
			dimensionTotal: "1400",
			status: "運行中",
			details: [],
		},
		{
			id: 3,
			instructionNo: "20260003",
			runDate: "2026/02/17",
			loadingDate: "2026/02/17",
			departureDate: "2026/02/17",
			unloadingPlanDate: "2026/02/17",
			orderSource: "前山倉庫",
			temperatureBand: "常温",
			officeCode: "茨城センター",
			inquirySlipNo: "20260003",
			shipperCode: "茨城センター",
			consigneeCode: "CNS-002",
			consigneeName: "ボストンズカフェ 古河店",
			consigneePostalCode: "",
			consigneeAddress: "茨城県古河市下大野0-0",
			consigneePhone: "",
			consigneeFax: "",
			consigneeAddressCode: "",
			consigneePrefectureCode: "",
			consigneeAreaCode: "",
			consigneePrefecture: "茨城県",
			consigneeCity: "古河市",
			consigneeTown: "下大野",
			requestedArrivalTime: "15:00",
			quantityTotal: "30",
			volume: "0.36",
			weight: "50",
			dimensionTotal: "2100",
			status: "運行中",
			details: [],
		},
		{
			id: 4,
			instructionNo: "20260004",
			runDate: "2026/02/17",
			loadingDate: "2026/02/17",
			departureDate: "2026/02/17",
			unloadingPlanDate: "2026/02/17",
			orderSource: "千代川倉庫",
			temperatureBand: "クール",
			officeCode: "茨城センター",
			inquirySlipNo: "20260004",
			shipperCode: "茨城センター",
			consigneeCode: "CNS-003",
			consigneeName: "丸満餃子",
			consigneePostalCode: "",
			consigneeAddress: "茨城県古河市本町0-0-0",
			consigneePhone: "",
			consigneeFax: "",
			consigneeAddressCode: "",
			consigneePrefectureCode: "",
			consigneeAreaCode: "",
			consigneePrefecture: "茨城県",
			consigneeCity: "古河市",
			consigneeTown: "本町",
			requestedArrivalTime: "15:00",
			quantityTotal: "5",
			volume: "0.06",
			weight: "15",
			dimensionTotal: "350",
			status: "受付",
			details: [],
		},
		{
			id: 5,
			instructionNo: "20260005",
			runDate: "2026/02/17",
			loadingDate: "2026/01/16",
			departureDate: "2026/02/17",
			unloadingPlanDate: "2026/02/17",
			orderSource: "前山倉庫",
			temperatureBand: "常温",
			officeCode: "茨城センター",
			inquirySlipNo: "20260005",
			shipperCode: "茨城センター",
			consigneeCode: "CNS-004",
			consigneeName: "七の庫",
			consigneePostalCode: "",
			consigneeAddress: "茨城県古河市下辺見0-0",
			consigneePhone: "",
			consigneeFax: "",
			consigneeAddressCode: "",
			consigneePrefectureCode: "",
			consigneeAreaCode: "",
			consigneePrefecture: "茨城県",
			consigneeCity: "古河市",
			consigneeTown: "下辺見",
			requestedArrivalTime: "ー",
			quantityTotal: "10",
			volume: "0.12",
			weight: "20",
			dimensionTotal: "700",
			status: "受付",
			details: [],
		},
		{
			id: 6,
			instructionNo: "20260006",
			runDate: "2026/02/17",
			loadingDate: "2026/01/16",
			departureDate: "2026/02/17",
			unloadingPlanDate: "2026/02/17",
			orderSource: "茨城倉庫",
			temperatureBand: "常温",
			officeCode: "茨城センター",
			inquirySlipNo: "20260006",
			shipperCode: "茨城センター",
			consigneeCode: "CNS-005",
			consigneeName: "ジョティー 古河店",
			consigneePostalCode: "",
			consigneeAddress: "茨城県古河市東0-0-0",
			consigneePhone: "",
			consigneeFax: "",
			consigneeAddressCode: "",
			consigneePrefectureCode: "",
			consigneeAreaCode: "",
			consigneePrefecture: "茨城県",
			consigneeCity: "古河市",
			consigneeTown: "東",
			requestedArrivalTime: "ー",
			quantityTotal: "15",
			volume: "0.18",
			weight: "25",
			dimensionTotal: "1050",
			status: "受付",
			details: [],
		},
		{
			id: 7,
			instructionNo: "20260007",
			runDate: "2026/02/17",
			loadingDate: "2026/01/16",
			departureDate: "2026/02/17",
			unloadingPlanDate: "2026/02/17",
			orderSource: "茨城倉庫",
			temperatureBand: "常温",
			officeCode: "茨城センター",
			inquirySlipNo: "20260007",
			shipperCode: "茨城センター",
			consigneeCode: "CNS-006",
			consigneeName: "はのは",
			consigneePostalCode: "",
			consigneeAddress: "茨城県古河市上辺見0",
			consigneePhone: "",
			consigneeFax: "",
			consigneeAddressCode: "",
			consigneePrefectureCode: "",
			consigneeAreaCode: "",
			consigneePrefecture: "茨城県",
			consigneeCity: "古河市",
			consigneeTown: "上辺見",
			requestedArrivalTime: "ー",
			quantityTotal: "15",
			volume: "0.18",
			weight: "25",
			dimensionTotal: "1050",
			status: "受付",
			details: [],
		},
	];

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={true} label="受注営業所">
								<CommonComboBox id="officeCode" list={locationList} showKey={true} defaultValue="OUADC" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="問合せNo/伝票No">
								<CommonInputBox id="inquirySlipNo" defaultValue="" placeholder="問合せNo/伝票Noを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={false} label="受注日">
								<CommonDateRangeBox id="runDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="発注元">
								<CommonComboBox id="orderSource" list={orderSourceList} showKey={true} defaultValue="OS01" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="温度帯K">
								<CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="ステータス">
								<CommonComboBox id="status" list={statusList} showKey={false} />
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
					<Button type="button" className="btn btn-gradient px-3">
						キャンセル
					</Button>
				</div>
				<DeliveryInstructionTable rows={rows} />

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

					<div className="small text-muted">全 0 アイテム中 0 から 0 を表示中</div>
				</footer>

			</section>
		</Container>
	);
}

function DeliveryInstructionTable({ rows }: DeliveryInstructionTableProps) {
	const [expandedRows, setExpandedRows] = useState<number[]>([]);
	const toggleRow = (id: number) => {
		setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
	};

	return (
		<div className="table-responsive border rounded">
			<Table className="mb-0 table-bordered table-sm table-striped align-middle text-nowrap">
				<thead>
					<tr className="table-primary">
						<th style={{ width: "2.5rem" }}></th>
						<th style={{ width: "2rem" }}>
							<Form.Check type="checkbox" />
						</th>
						<th>
							<span className="table-header-text">問合せNo/伝票No</span>
						</th>
						<th>
							<span className="table-header-text">運行日</span>
						</th>
						<th>
							<span className="table-header-text">積込日</span>
						</th>
						<th>
							<span className="table-header-text">出発日</span>
						</th>
						<th>
							<span className="table-header-text">荷下予定日</span>
						</th>
						<th>
							<span className="table-header-text">温度帯</span>
						</th>
						<th>
							<span className="table-header-text">発注元</span>
						</th>
						<th>
							<span className="table-header-text">受注営業所</span>
						</th>
						<th>
							<span className="table-header-text">出荷元</span>
						</th>
						<th>
							<span className="table-header-text">納品先</span>
						</th>
						<th>
							<span className="table-header-text">納品先住所</span>
						</th>
						<th>
							<span className="table-header-text">指定着時間</span>
						</th>
						<th>
							<span className="table-header-text">合計個数</span>
						</th>
						<th>
							<span className="table-header-text">容積</span>
						</th>
						<th>
							<span className="table-header-text">実重量/容積重</span>
						</th>
						<th>
							<span className="table-header-text">寸法</span>
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
									{row.details.length > 0 ? (
										<Button
											variant="outline-primary"
											size="sm"
											className="px-2 py-0"
											onClick={() => toggleRow(row.id)}
											aria-label={`${row.instructionNo}の配送指示明細を${expandedRows.includes(row.id) ? "閉じる" : "開く"}`}
										>
											{expandedRows.includes(row.id) ? "-" : "+"}
										</Button>
									) : null}
								</td>
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.inquirySlipNo}</td>
								<td>{row.runDate}</td>
								<td>{row.loadingDate}</td>
								<td>{row.departureDate}</td>
								<td>{row.unloadingPlanDate}</td>
								<td>{row.temperatureBand}</td>
								<td>{row.orderSource}</td>
								<td>{row.officeCode}</td>
								<td>{row.shipperCode}</td>
								<td>{row.consigneeName}</td>
								<td>{row.consigneeAddress}</td>
								<td>{row.requestedArrivalTime}</td>
								<td className="text-end">{row.quantityTotal}</td>
								<td className="text-end">{row.volume}</td>
								<td className="text-end">{row.weight}</td>
								<td className="text-end">{row.dimensionTotal}</td>
								<td>{row.status}</td>
							</tr>

							{expandedRows.includes(row.id) && row.details.length > 0 && (
								<tr className="bg-light">
									<td></td>
									<td colSpan={18} className="p-0">
										<div className="table-responsive border rounded w-75">
											<Table className="mb-0 table-bordered table-sm table-striped align-middle">
												<thead>
													<tr className="table-secondary">
														<th>
															<span className="table-header-text">商品</span>
														</th>
														<th style={{ width: "2rem" }}>
															<span className="table-header-text">製造年月日</span>
														</th>
														<th style={{ width: "2rem" }}>
															<span className="table-header-text">賞味期限</span>
														</th>
														<th>
															<span className="table-header-text">ロット番号</span>
														</th>
														<th>
															<span className="table-header-text">個数</span>
														</th>
														<th>
															<span className="table-header-text">容積</span>
														</th>
														<th style={{ width: "2rem" }}>
															<span className="table-header-text">実重量/容積重</span>
														</th>
														<th>
															<span className="table-header-text">寸法</span>
														</th>
														<th>
															<span className="table-header-text">寸法</span>
														</th>
													</tr>
												</thead>
												<tbody>
													{row.details.map((detail) => (
														<tr key={detail.id}>
															<td>{detail.productName}</td>
															<td>{detail.manufactureDate}</td>
															<td>{detail.bestBeforeDate}</td>
															<td>{detail.lotNo}</td>
															<td className="text-end">{detail.quantity}</td>
															<td className="text-end">{detail.volume}</td>
															<td className="text-end">{detail.weight}</td>
															<td className="text-end">{detail.dimensionTotal}</td>
															<td>{detail.length}</td>
														</tr>
													))}
												</tbody>
											</Table>
										</div>
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
