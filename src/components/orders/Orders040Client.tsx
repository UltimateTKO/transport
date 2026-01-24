"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col, Modal } from "react-bootstrap";
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
	receiver: string;
	status: string;
	details: DeliveryInstructionDetail[];
};

type ListItem = { key: string; value: string };

type Orders040ClientProps = {
	localDate: string;
};

type DeliveryInstructionTableProps = {
	rows: DeliveryInstructionHeader[];
	onShowSignature: (row: DeliveryInstructionHeader) => void;
};

export default function Orders040Client({ localDate }: Orders040ClientProps) {
	const temperatureBandList: ListItem[] = [
		{ key: "T1", value: "常温" },
		{ key: "T2", value: "冷蔵" },
		{ key: "T3", value: "冷凍" },
		{ key: "T4", value: "超低温" },
	];
	const statusList: ListItem[] = [
		{ key: "created", value: "データ作成" },
		{ key: "in_transit", value: "運行中" },
		{ key: "delivered", value: "配送完了" },
		{ key: "billed", value: "請求済" },
		{ key: "deleted", value: "削除" },
	];
	// 地点マスタ
	const locationList: ListItem[] = [
		{ key: "OUADC", value: "あんしん総合流通センター" },
		{ key: "OUGBO", value: "キンザー営業所" },
		{ key: "OUMDC", value: "港町物流センター" },
		{ key: "ONHBO", value: "那覇営業所" },
		{ key: "ONFDC", value: "西原FDC" },
		{ key: "ONABO", value: "あんしん館" },
		{ key: "ONNBO", value: "西原営業所" },
		{ key: "DNHDO", value: "那覇港" },
		{ key: "ROMPL", value: "宮古委託先" },
		{ key: "RHTPL", value: "博多委託先" },
		{ key: "ROOPL", value: "大阪委託先" },
		{ key: "RYHPL", value: "横浜委託先" },
		{ key: "DOMDO", value: "平良港" },
		{ key: "DHTDO", value: "博多港" },
		{ key: "DOODO", value: "大阪港" },
		{ key: "DYHDO", value: "横浜港" },
	];
	const orderSourceList: ListItem[] = [
		{ key: "OS01", value: "沖縄第一倉庫" },
		{ key: "OS02", value: "琉球物流" },
		{ key: "OS03", value: "友睦物流" },
	];

	const [showSignatureModal, setShowSignatureModal] = useState(false);
	const [selectedInstructionNo, setSelectedInstructionNo] = useState<string | null>(null);
	const [selectedReceiver, setSelectedReceiver] = useState<string | null>(null);

	const handleShowSignature = (row: DeliveryInstructionHeader) => {
		setSelectedInstructionNo(row.instructionNo);
		setSelectedReceiver(row.receiver);
		setShowSignatureModal(true);
	};

	const handleCloseSignature = () => {
		setShowSignatureModal(false);
		setSelectedInstructionNo(null);
		setSelectedReceiver(null);
	};
	const rows: DeliveryInstructionHeader[] = [
		{
			id: 1,
			instructionNo: "2026010001",
			runDate: "2026/01/28",
			loadingDate: "2026/01/28",
			departureDate: "2026/01/28",
			unloadingPlanDate: "",
			temperatureBand: "常温",
			orderSource: "沖縄第一倉庫",
			officeCode: "あんしん総合流通センター",
			inquirySlipNo: "2026010001",
			shipperCode: "キンザー営業所",
			consigneeCode: "CNS-001",
			consigneeName: "宗像堂",
			consigneePostalCode: "901-0000",
			consigneeAddress: "沖縄県宜野湾市嘉数0-0-0",
			consigneePhone: "098-000-0000",
			consigneeFax: "098-000-0001",
			consigneeAddressCode: "ON-001",
			consigneePrefectureCode: "47",
			consigneeAreaCode: "47206",
			consigneePrefecture: "沖縄県",
			consigneeCity: "宜野湾市",
			consigneeTown: "嘉数",
			requestedArrivalTime: "",
			quantityTotal: "10",
			volume: "0.12",
			weight: "20",
			dimensionTotal: "700",
			status: "運行中",
			receiver: "",
			details: [
				{
					id: "1-1",
					instructionNo: "2026010001",
					detailNo: "001",
					productCode: "PRD-001",
					productName: "加工食品",
					manufactureDate: "2026/01/10",
					bestBeforeDate: "2026/07/10",
					lotNo: "20260110",
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
					instructionNo: "2026010001",
					detailNo: "002",
					productCode: "PRD-002",
					productName: "出汁スープ",
					manufactureDate: "2026/01/15",
					bestBeforeDate: "2026/07/15",
					lotNo: "20260115",
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
			instructionNo: "2026010002",
			runDate: "2026/01/28",
			loadingDate: "2026/01/28",
			departureDate: "2026/01/28",
			unloadingPlanDate: "",
			orderSource: "沖縄第一倉庫",
			temperatureBand: "常温",
			officeCode: "あんしん総合流通センター",
			inquirySlipNo: "2026010002",
			shipperCode: "キンザー営業所",
			consigneeCode: "CNS-002",
			consigneeName: "たぬき弁当",
			consigneePostalCode: "901-0001",
			consigneeAddress: "沖縄県浦添市城間0-0-0",
			consigneePhone: "098-000-0002",
			consigneeFax: "098-000-0003",
			consigneeAddressCode: "ON-002",
			consigneePrefectureCode: "47",
			consigneeAreaCode: "47207",
			consigneePrefecture: "沖縄県",
			consigneeCity: "浦添市",
			consigneeTown: "城間",
			requestedArrivalTime: "",
			quantityTotal: "20",
			volume: "0.24",
			weight: "40",
			dimensionTotal: "1400",
			status: "運行中",
			receiver: "",
			details: [],
		},
		{
			id: 3,
			instructionNo: "2026010003",
			runDate: "2026/01/28",
			loadingDate: "2026/01/28",
			departureDate: "2026/01/28",
			unloadingPlanDate: "2026/01/28",
			orderSource: "琉球物流",
			temperatureBand: "常温",
			officeCode: "あんしん総合流通センター",
			inquirySlipNo: "2026010003",
			shipperCode: "キンザー営業所",
			consigneeCode: "CNS-003",
			consigneeName: "牛吉 牧港店",
			consigneePostalCode: "901-0002",
			consigneeAddress: "沖縄県宜野湾市嘉数0-0-1",
			consigneePhone: "098-000-0004",
			consigneeFax: "098-000-0005",
			consigneeAddressCode: "ON-003",
			consigneePrefectureCode: "47",
			consigneeAreaCode: "47206",
			consigneePrefecture: "沖縄県",
			consigneeCity: "宜野湾市",
			consigneeTown: "嘉数",
			requestedArrivalTime: "8:00-12:00",
			quantityTotal: "30",
			volume: "0.36",
			weight: "50",
			dimensionTotal: "2100",
			status: "配送完了",
			receiver: "秋葉　光慶",
			details: [],
		},
		{
			id: 4,
			instructionNo: "2026010004",
			runDate: "2026/01/28",
			loadingDate: "2026/01/28",
			departureDate: "2026/01/28",
			unloadingPlanDate: "2026/01/28",
			orderSource: "友睦物流",
			temperatureBand: "冷凍",
			officeCode: "あんしん総合流通センター",
			inquirySlipNo: "2026010004",
			shipperCode: "キンザー営業所",
			consigneeCode: "CNS-004",
			consigneeName: "イタリアン料理 mou",
			consigneePostalCode: "901-0003",
			consigneeAddress: "沖縄県宜野湾市志真志0-0-0",
			consigneePhone: "098-000-0006",
			consigneeFax: "098-000-0007",
			consigneeAddressCode: "ON-004",
			consigneePrefectureCode: "47",
			consigneeAreaCode: "47206",
			consigneePrefecture: "沖縄県",
			consigneeCity: "宜野湾市",
			consigneeTown: "志真志",
			requestedArrivalTime: "14:00-16:00",
			quantityTotal: "5",
			volume: "0.06",
			weight: "15",
			dimensionTotal: "350",
			status: "データ作成",
			receiver: "",
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
								<CommonComboBox
									id="officeCode"
									list={locationList.filter((location) => location.key.startsWith("O"))}
									showKey={true}
									defaultValue="O001"
								/>
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
				<DeliveryInstructionTable rows={rows} onShowSignature={handleShowSignature} />

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

				<Modal show={showSignatureModal} onHide={handleCloseSignature} centered size="lg">
					<Modal.Header closeButton>
						<Modal.Title>受領確認{selectedInstructionNo ? ` - ${selectedInstructionNo}` : ""}</Modal.Title>
					</Modal.Header>
					<Modal.Body className="text-center">
						{selectedReceiver && <div className="mb-3 fw-semibold">{selectedReceiver}</div>}
						<img src="/サイン秋葉.png" alt="受領サイン" className="img-fluid" />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseSignature}>
							閉じる
						</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</Container>
	);
}

function DeliveryInstructionTable({ rows, onShowSignature }: DeliveryInstructionTableProps) {
	const [expandedRows, setExpandedRows] = useState<number[]>(() =>
		rows.filter((row) => row.details.length > 0).map((row) => row.id),
	);
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
							<span className="table-header-text">受注日</span>
						</th>
						<th>
							<span className="table-header-text">納品指定日</span>
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
							<span className="table-header-text">受領者</span>
						</th>
						<th>
							<span className="table-header-text">サイン</span>
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
										aria-label={`${row.instructionNo}の配送指示明細を${expandedRows.includes(row.id) ? "閉じる" : "開く"}`}
									>
										{expandedRows.includes(row.id) ? "-" : "+"}
									</Button>
								</td>
								<td>
									<Form.Check type="checkbox" />
								</td>
								<td>{row.inquirySlipNo}</td>
								<td>{row.runDate}</td>
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
								<td>{row.receiver}</td>
								<td>
									{row.receiver ? (
										<Button
											variant="link"
											type="button"
											className="p-0 text-decoration-none"
											onClick={() => onShowSignature(row)}
										>
											受領ボタン
										</Button>
									) : (
										""
									)}
								</td>
								<td>{row.status}</td>
							</tr>

							{expandedRows.includes(row.id) && (
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
