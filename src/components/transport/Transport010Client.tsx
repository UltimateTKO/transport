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
	status: string;
};

type DeliveryInstructionHeader = {
	id: number;
	instructionNo: string;
	runDate: string;
	loadingDate: string;
	departureDate: string;
	unloadingPlanDate: string;
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
	note1: string;
	note2: string;
	note3: string;
	note4: string;
	quantityTotal: string;
	volume: string;
	weight: string;
	dimensionTotal: string;
	length: string;
	width: string;
	height: string;
	deliveryClass: string;
	dispatchTargetClass: string;
	temperatureBand: string;
	status: string;
	details: DeliveryInstructionDetail[];
};

type ListItem = { key: string; value: string };

type Transport010ClientProps = {
	localDate: string;
};

type DeliveryInstructionTableProps = {
	rows: DeliveryInstructionHeader[];
};

export default function Transport010Client({ localDate }: Transport010ClientProps) {
	const temperatureBandList: ListItem[] = [
		{ key: "ambient", value: "常温" },
		{ key: "cool", value: "クール" },
		{ key: "frozen", value: "冷凍" },
	];
	const statusList: ListItem[] = [
		{ key: "created", value: "データ作成" },
		{ key: "in_transit", value: "運行中" },
		{ key: "delivered", value: "配送完了" },
		{ key: "billed", value: "請求済" },
		{ key: "deleted", value: "削除" },
	];
	const rows: DeliveryInstructionHeader[] = [
		{
			id: 1,
			instructionNo: "TR-2026-0001",
			runDate: "2026/02/05",
			loadingDate: "2026/02/05",
			departureDate: "2026/02/05",
			unloadingPlanDate: "2026/02/06",
			officeCode: "南九州物流センター",
			inquirySlipNo: "20260001",
			shipperCode: "南九州物流センター",
			consigneeCode: "CNS-110",
			consigneeName: "業務スーパー 谷山店",
			consigneePostalCode: "891-0141",
			consigneeAddress: "鹿児島県鹿児島市谷山中央５丁目２９−29番6",
			consigneePhone: "099-1234-5678",
			consigneeFax: "099-1234-5679",
			consigneeAddressCode: "TK-101",
			consigneePrefectureCode: "46",
			consigneeAreaCode: "46201",
			consigneePrefecture: "鹿児島県",
			consigneeCity: "鹿児島市",
			consigneeTown: "谷山中央５丁目",
			requestedArrivalTime: "10:00-12:00",
			note1: "受付9:30",
			note2: "台車返却有",
			note3: "常温帯",
			note4: "-",
			quantityTotal: "12/36",
			volume: "1.8",
			weight: "230/210",
			dimensionTotal: "140",
			length: "40",
			width: "30",
			height: "20",
			deliveryClass: "通常",
			dispatchTargetClass: "対象",
			temperatureBand: "常温",
			status: "運行中",
			details: [
				{
					id: "1-1",
					instructionNo: "TR-2026-0001",
					detailNo: "001",
					productCode: "PRD-001",
					productName: "冷凍スープ",
					manufactureDate: "2026/09/20",
					bestBeforeDate: "2027/03/20",
					lotNo: "LOT-A101",
					quantity: "6",
					volume: "0.8",
					weight: "120/110",
					dimensionTotal: "40",
					length: "40",
					width: "30",
					height: "20",
					status: "運行中",
				},
				{
					id: "1-2",
					instructionNo: "TR-2026-0001",
					detailNo: "002",
					productCode: "PRD-014",
					productName: "加工肉セット",
					manufactureDate: "2026/10/01",
					bestBeforeDate: "2027/04/01",
					lotNo: "LOT-B220",
					quantity: "6",
					volume: "1.0",
					weight: "110/100",
					dimensionTotal: "100",
					length: "45",
					width: "35",
					height: "25",
					status: "運行中",
				},
			],
		},
		{
			id: 2,
			instructionNo: "TR-2026-0002",
			runDate: "2026/02/07",
			loadingDate: "2026/02/07",
			departureDate: "2026/02/07",
			unloadingPlanDate: "2026/02/08",
			officeCode: "南九州物流センター",
			inquirySlipNo: "20260002",
			shipperCode: "南九州物流センター",
			consigneeCode: "CNS-220",
			consigneeName: "喫茶店ひまわり・占い",
			consigneePostalCode: "891-0150",
			consigneeAddress: "鹿児島県鹿児島市坂之上６丁目３０−８",
			consigneePhone: "099-1111-2222",
			consigneeFax: "099-1111-2223",
			consigneeAddressCode: "OS-220",
			consigneePrefectureCode: "46",
			consigneeAreaCode: "46201",
			consigneePrefecture: "鹿児島県",
			consigneeCity: "鹿児島市",
			consigneeTown: "坂之上６丁目",
			requestedArrivalTime: "14:00-16:00",
			note1: "検品20分",
			note2: "冷凍帯注意",
			note3: "パレット回収",
			note4: "-",
			quantityTotal: "8/20",
			volume: "2.4",
			weight: "310/280",
			dimensionTotal: "160",
			length: "50",
			width: "40",
			height: "30",
			deliveryClass: "急ぎ",
			dispatchTargetClass: "対象",
			temperatureBand: "冷凍",
			status: "データ作成",
			details: [
				{
					id: "2-1",
					instructionNo: "TR-2026-0002",
					detailNo: "001",
					productCode: "PRD-031",
					productName: "冷凍うどん",
					manufactureDate: "2026/09/05",
					bestBeforeDate: "2027/03/05",
					lotNo: "LOT-C031",
					quantity: "5",
					volume: "1.2",
					weight: "180/160",
					dimensionTotal: "80",
					length: "50",
					width: "40",
					height: "30",
					status: "データ作成",
				},
				{
					id: "2-2",
					instructionNo: "TR-2026-0002",
					detailNo: "002",
					productCode: "PRD-044",
					productName: "冷凍フルーツ",
					manufactureDate: "2026/09/12",
					bestBeforeDate: "2027/03/12",
					lotNo: "LOT-D044",
					quantity: "3",
					volume: "1.2",
					weight: "130/120",
					dimensionTotal: "80",
					length: "45",
					width: "35",
					height: "25",
					status: "データ作成",
				},
			],
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
							<CommonGroupLabel required={false} label="問合せNo/伝票No">
								<CommonInputBox id="inquirySlipNo" defaultValue="" placeholder="問合せNo/伝票Noを入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={false} label="運行日">
								<CommonDateRangeBox id="runDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="受注営業所">
								<CommonInputBox id="officeCode" defaultValue="" placeholder="受注営業所を入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="出荷元">
								<CommonInputBox id="shipperCode" defaultValue="" placeholder="出荷元を入力" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="温度帯K">
								<CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={false} />
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
						配送完了
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
		<div className="table-responsive border rounded transport010-table">
			<Table className="mb-0 table-bordered table-hover table-sm table-striped">
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
							<span className="table-header-text">寸法(cm)</span>
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
										aria-label={`${row.instructionNo}の配送指示明細を${
											expandedRows.includes(row.id) ? "閉じる" : "開く"
										}`}
									>
										{expandedRows.includes(row.id) ? "-" : "+"}
									</Button>
								</td>
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.inquirySlipNo}</td>
								<td>{row.runDate}</td>
								<td>{row.loadingDate}</td>
								<td>{row.departureDate}</td>
								<td>{row.unloadingPlanDate}</td>
								<td>{row.officeCode}</td>
								<td>{row.shipperCode}</td>
								<td>{row.consigneeName}</td>
								<td>{row.consigneeAddress}</td>
								<td>{row.requestedArrivalTime}</td>
								<td>{row.quantityTotal}</td>
								<td>{row.volume}</td>
								<td>{row.weight}</td>
								<td>{row.dimensionTotal}</td>
								<td>{row.status}</td>
							</tr>

							{expandedRows.includes(row.id) && (
								<tr className="bg-light">
									<td></td>
									<td colSpan={16} className="p-0">
										<Table className="mb-0 w-75 table-sm table-bordered">
											<thead>
												<tr className="table-secondary">
													<th style={{ width: "2rem" }}>
														<Form.Check type="checkbox" />
													</th>
													<th>
														<span className="table-header-text">商品</span>
													</th>
													<th>
														<span className="table-header-text">製造年月日</span>
													</th>
													<th>
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
													<th>
														<span className="table-header-text">実重量/容積重</span>
													</th>
													<th>
														<span className="table-header-text">寸法</span>
													</th>
												</tr>
											</thead>
											<tbody>
												{row.details.map((detail) => (
													<tr key={detail.id}>
														<td>
															<Form.Check type="checkbox" />
														</td>
														<td>{detail.productName}</td>
														<td>{detail.manufactureDate}</td>
														<td>{detail.bestBeforeDate}</td>
														<td>{detail.lotNo}</td>
														<td className="text-end">{detail.quantity}</td>
														<td>{detail.volume}</td>
														<td>{detail.weight}</td>
														<td>{detail.dimensionTotal}</td>
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
