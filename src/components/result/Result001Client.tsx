"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import { CommonComboBox, CommonGroupLabel, CommonInputBox, CommonTextAreaBox, RequiredMark } from "@/components/CommonComponent";
import { BsClipboardCheck, BsClockHistory } from "react-icons/bs";

type ListItem = { key: string; value: string };

export type ResultStopSummary = {
	id: string;
	destination: string;
	plannedTime: string;
	actualTime: string;
	cases: number;
	cod: number;
	status: "completed" | "partial" | "missed";
	memo?: string;
};

type Result001ClientProps = {
	localDate: string;
	driverList: ListItem[];
	vehicleList: ListItem[];
	completionReasons: ListItem[];
	paymentMethods: ListItem[];
	stopSummaries: ResultStopSummary[];
};

type CustomChargeRow = {
	id: string;
	label: string;
	amount: number;
	memo: string;
};

const statusLabels: Record<ResultStopSummary["status"], string> = {
	completed: "完了",
	partial: "一部未完",
	missed: "未完了",
};

const statusVariants: Record<ResultStopSummary["status"], string> = {
	completed: "success",
	partial: "warning",
	missed: "secondary",
};

const paymentCodeLabels: Record<string, string> = {
	"01": "売上",
	"02": "立替",
};

const toNumber = (value: string) => {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
};

const minutesDiff = (from: string, to: string) => {
	const [fromH, fromM] = from.split(":").map(Number);
	const [toH, toM] = to.split(":").map(Number);
	if ([fromH, fromM, toH, toM].some((v) => Number.isNaN(v))) return 0;
	return Math.max((toH - fromH) * 60 + (toM - fromM), 0);
};

export default function Result001Client(props: Result001ClientProps) {
	const { localDate, driverList, vehicleList, completionReasons, paymentMethods, stopSummaries } = props;

	const [completionStatus, setCompletionStatus] = useState<ResultStopSummary["status"]>("completed");
	const [driver, setDriver] = useState(driverList[0]?.key ?? "");
	const [vehicle, setVehicle] = useState(vehicleList[0]?.key ?? "");
	const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]?.key ?? "");
	const [reason, setReason] = useState(completionReasons[0]?.key ?? "");
	const [departTime, setDepartTime] = useState("07:30");
	const [arrivalTime, setArrivalTime] = useState("09:00");
	const [completeTime, setCompleteTime] = useState("11:50");
	const [charges, setCharges] = useState({
		freight: 42000,
		highway: 2800,
		parking: 1200,
		handling: 1200,
		cashOnDelivery: 0,
	});
	const [customCharges, setCustomCharges] = useState<CustomChargeRow[]>([]);
	const [stopRows, setStopRows] = useState<ResultStopSummary[]>(stopSummaries);
	const [checklist, setChecklist] = useState({
		slipCollected: true,
		signCollected: true,
		returnables: false,
		incident: false,
	});

	const totalCharge = useMemo(() => {
		const baseSum = Object.values(charges).reduce((sum, value) => sum + value, 0);
		const customSum = customCharges.reduce((sum, row) => sum + row.amount, 0);
		return baseSum + customSum;
	}, [charges, customCharges]);
	const totalCollection = useMemo(() => stopRows.reduce((sum, row) => sum + row.cod, 0), [stopRows]);
	const statusCounts = useMemo(() => {
		const counts: Record<ResultStopSummary["status"], number> = { completed: 0, partial: 0, missed: 0 };
		stopRows.forEach((row) => {
			counts[row.status] += 1;
		});
		return counts;
	}, [stopRows]);

	const dwellMinutes = useMemo(() => minutesDiff(arrivalTime, completeTime), [arrivalTime, completeTime]);
	const tripMinutes = useMemo(() => minutesDiff(departTime, completeTime), [departTime, completeTime]);
	const dwellText = dwellMinutes === 0 ? "-" : `${Math.floor(dwellMinutes / 60)}h${dwellMinutes % 60}m`;
	const tripText = tripMinutes === 0 ? "-" : `${Math.floor(tripMinutes / 60)}h${tripMinutes % 60}m`;

	const chargeRows: { key: keyof typeof charges; label: string; placeholder: string; paymentCode: "01" | "02" }[] = [
		{ key: "freight", label: "運賃", placeholder: "走行ベース", paymentCode: "01" },
		{ key: "highway", label: "高速/ETC", placeholder: "明細計", paymentCode: "02" },
		{ key: "parking", label: "駐車場", placeholder: "領収証", paymentCode: "02" },
		{ key: "handling", label: "荷役・待機", placeholder: "荷役/附帯", paymentCode: "02" },
	];

	const handleChargeChange = (key: keyof typeof charges) => (e: React.ChangeEvent<HTMLInputElement>) =>
		setCharges((prev) => ({ ...prev, [key]: toNumber(e.target.value) }));

	const addCustomChargeRow = () => {
		setCustomCharges((prev) => [...prev, { id: `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`, label: "", amount: 0, memo: "" }]);
	};

	const handleCustomLabelChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomCharges((prev) => prev.map((row) => (row.id === id ? { ...row, label: e.target.value } : row)));
	};

	const handleCustomAmountChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomCharges((prev) => prev.map((row) => (row.id === id ? { ...row, amount: toNumber(e.target.value) } : row)));
	};

	const handleCustomMemoChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomCharges((prev) => prev.map((row) => (row.id === id ? { ...row, memo: e.target.value } : row)));
	};

	const updateStopRow = (id: string, updater: (row: ResultStopSummary) => ResultStopSummary) => {
		setStopRows((prev) => prev.map((row) => (row.id === id ? updater(row) : row)));
	};

	const handleStopStatusChange = (id: string, value: ResultStopSummary["status"]) => {
		updateStopRow(id, (row) => ({ ...row, status: value }));
	};

	const handleStopCodChange = (id: string, value: string) => {
		updateStopRow(id, (row) => ({ ...row, cod: toNumber(value) }));
	};

	const handleStopCasesChange = (id: string, value: string) => {
		updateStopRow(id, (row) => ({ ...row, cases: toNumber(value) }));
	};

	const handleStopActualTimeChange = (id: string, value: string) => {
		updateStopRow(id, (row) => ({ ...row, actualTime: value }));
	};

	const handleStopMemoChange = (id: string, value: string) => {
		updateStopRow(id, (row) => ({ ...row, memo: value }));
	};

	return (
		<Container fluid>
			<Form>
				<section className="panel-block mb-4">
					<header className="panel-block-header d-flex align-items-center gap-2">
						<RequiredMark />
						<span className="small fw-semibold">は入力必須項目です</span>
					</header>

					<Row className="gx-3 gy-3">
						<Col xl={8}>
							<article className="panel-card h-100">
								<header className="panel-card-header px-3 py-2 d-flex flex-wrap align-items-center gap-2 justify-content-between">
									<div className="d-flex align-items-center gap-2">
										<span className="fw-semibold">配送実績入力</span>
										<Badge bg={statusVariants[completionStatus]}>{statusLabels[completionStatus]}</Badge>
									</div>
									<div className="d-flex align-items-center gap-2 small text-muted">
										<BsClockHistory />
										<span>滞在 {dwellText}</span>
										<span className="text-muted">/ 運行 {tripText}</span>
									</div>
								</header>
								<div className="panel-card-body">
									<Row className="gx-2 gy-3">
										<Col md={4}>
											<CommonGroupLabel required label="運行日">
												<CommonInputBox id="resultDate" type="date" defaultValue={localDate} className="w-auto" />
											</CommonGroupLabel>
										</Col>
										<Col md={4}>
											<CommonGroupLabel required={false} label="配車No">
												<CommonInputBox id="routeNumber" defaultValue="0001" placeholder="配車Noを入力" />
											</CommonGroupLabel>
										</Col>
										<Col md={4}>
											<CommonGroupLabel required label="配送結果">
												<Form.Select
													size="sm"
													value={completionStatus}
													onChange={(e) => setCompletionStatus(e.target.value as ResultStopSummary["status"])}
												>
													<option value="completed">完了</option>
													<option value="partial">一部未完</option>
													<option value="missed">未完了</option>
												</Form.Select>
											</CommonGroupLabel>
										</Col>

										<Col md={6}>
											<CommonGroupLabel required label="乗務員">
												<CommonComboBox
													id="driver"
													list={driverList}
													showKey={true}
													value={driver}
													onChange={(e) => setDriver(e.target.value)}
												/>
											</CommonGroupLabel>
										</Col>
										<Col md={6}>
											<CommonGroupLabel required label="車輛">
												<CommonComboBox
													id="vehicle"
													list={vehicleList}
													showKey={true}
													value={vehicle}
													onChange={(e) => setVehicle(e.target.value)}
												/>
											</CommonGroupLabel>
										</Col>

										<Col md={6}>
											<CommonGroupLabel required={false} label="完了/遅延理由">
												<CommonComboBox
													id="completionReason"
													list={completionReasons}
													showKey={false}
													value={reason}
													onChange={(e) => setReason(e.target.value)}
												/>
											</CommonGroupLabel>
										</Col>

										<Col md={4}>
											<CommonGroupLabel required label="出発時刻">
												<CommonInputBox
													id="departTime"
													type="time"
													className="w-100"
													value={departTime}
													onChange={(e) => setDepartTime(e.target.value)}
												/>
											</CommonGroupLabel>
										</Col>
										<Col md={4}>
											<CommonGroupLabel required label="現着時刻">
												<CommonInputBox
													id="arrivalTime"
													type="time"
													className="w-100"
													value={arrivalTime}
													onChange={(e) => setArrivalTime(e.target.value)}
												/>
											</CommonGroupLabel>
										</Col>
										<Col md={4}>
											<CommonGroupLabel required label="完了時刻">
												<CommonInputBox
													id="completeTime"
													type="time"
													className="w-100"
													value={completeTime}
													onChange={(e) => setCompleteTime(e.target.value)}
												/>
											</CommonGroupLabel>
										</Col>

										<Col md={12}>
											<CommonGroupLabel required={false} label="備考・現場メモ">
												<CommonTextAreaBox
													id="resultMemo"
													rows={3}
													defaultValue="横浜北DCで代引き12,000円回収済。新横浜で数量差異(1cs)あり、担当者と確認中。"
												/>
											</CommonGroupLabel>
										</Col>
									</Row>
								</div>
							</article>
						</Col>

						<Col xl={4}>
							<article className="panel-card h-100">
								<header className="panel-card-header px-3 py-2">
									<div className="d-flex flex-wrap align-items-center gap-2">
										<BsClipboardCheck />
										<span className="fw-semibold">検収・完了チェック</span>
									</div>
								</header>
								<div className="panel-card-body d-flex flex-column gap-3">
									<div className="d-flex align-items-center gap-2 flex-wrap">
										<Badge bg="success" pill>
											完了 {statusCounts.completed}
										</Badge>
										<Badge bg="warning" pill className="text-dark">
											一部 {statusCounts.partial}
										</Badge>
										<Badge bg="secondary" pill>
											未完 {statusCounts.missed}
										</Badge>
										<div className="ms-auto text-end">
											<div className="small text-muted">回収金額</div>
											<div className="fw-bold">{totalCollection.toLocaleString()} 円</div>
										</div>
									</div>

									<div className="d-flex flex-column gap-2">
										<Form.Check
											id="slip-collected"
											label="伝票・サインを回収済み"
											checked={checklist.signCollected}
											onChange={(e) => setChecklist((prev) => ({ ...prev, signCollected: e.target.checked }))}
										/>
										<Form.Check
											id="slip-return"
											label="返品/持ち帰りあり"
											checked={checklist.returnables}
											onChange={(e) => setChecklist((prev) => ({ ...prev, returnables: e.target.checked }))}
										/>
										<Form.Check
											id="incident-report"
											label="事故・遅延など報告事項あり"
											checked={checklist.incident}
											onChange={(e) => setChecklist((prev) => ({ ...prev, incident: e.target.checked }))}
										/>
										<Form.Check
											id="slip-sorted"
											label="伝票仕分け済み（センター提出）"
											checked={checklist.slipCollected}
											onChange={(e) => setChecklist((prev) => ({ ...prev, slipCollected: e.target.checked }))}
										/>
									</div>

									<Row className="gx-2 gy-2">
										<Col md={6}>
											<CommonGroupLabel required={false} label="受領者氏名">
												<CommonInputBox id="receiverName" placeholder="例: 田中様" />
											</CommonGroupLabel>
										</Col>
										<Col md={6}>
											<CommonGroupLabel required={false} label="検収担当">
												<CommonInputBox id="inspector" placeholder="検収担当" />
											</CommonGroupLabel>
										</Col>
									</Row>

									<div className="border rounded px-3 py-2 bg-light">
										<div className="small text-muted mb-1">サマリ</div>
										<div className="d-flex flex-wrap gap-3">
											<div>
												<span className="fw-semibold">完了</span>
												<div className="text-muted small">
													{statusCounts.completed} / {stopRows.length} 件
												</div>
											</div>
											<div>
												<span className="fw-semibold">滞在</span>
												<div className="text-muted small">{dwellText}</div>
											</div>
											<div>
												<span className="fw-semibold">運行</span>
												<div className="text-muted small">{tripText}</div>
											</div>
										</div>
									</div>
								</div>
							</article>
						</Col>
					</Row>
				</section>

				<section className="panel-block mb-4">
					<header className="panel-block-title">金額入力</header>
					<div className="table-responsive border rounded">
						<Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
							<thead>
								<tr className="table-primary">
									<th style={{ width: "20%" }}>項目</th>
									<th style={{ width: "20%" }}>金額</th>
									<th style={{ width: "10%" }}>売上/立替</th>
									<th>メモ</th>
								</tr>
							</thead>
							<tbody>
								{chargeRows.map((row) => (
									<tr key={row.key}>
										<td className="align-middle">{row.label}</td>
										<td>
											<InputGroup>
												<CommonInputBox
													id={`charge-${row.key}`}
													type="number"
													className="text-end"
													value={charges[row.key].toString()}
													onChange={handleChargeChange(row.key)}
												/>
												<InputGroup.Text className="fs-6">円</InputGroup.Text>
											</InputGroup>
										</td>
										<td className="align-middle text-center">
											<span>{paymentCodeLabels[row.paymentCode]}</span>
										</td>
										<td>
											<Form.Control size="sm" type="text" placeholder={row.placeholder} />
										</td>
									</tr>
								))}
								{customCharges.map((row) => (
									<tr key={row.id}>
										<td>
											<Form.Control
												size="sm"
												type="text"
												placeholder="項目名を入力"
												value={row.label}
												onChange={handleCustomLabelChange(row.id)}
											/>
										</td>
										<td>
											<InputGroup>
												<CommonInputBox
													id={`charge-${row.id}`}
													type="number"
													className="text-end"
													value={row.amount.toString()}
													onChange={handleCustomAmountChange(row.id)}
												/>
												<InputGroup.Text className="fs-6">円</InputGroup.Text>
											</InputGroup>
										</td>
										<td className="align-middle text-center">
											<span>{paymentCodeLabels["02"]}</span>
										</td>
										<td>
											<Form.Control
												size="sm"
												type="text"
												placeholder="備考"
												value={row.memo}
												onChange={handleCustomMemoChange(row.id)}
											/>
										</td>
									</tr>
								))}
								<tr>
									<td colSpan={4} className="text-center">
										<Button size="sm" variant="outline-primary" onClick={addCustomChargeRow}>
											+ 行を追加
										</Button>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr className="table-secondary">
									<th>合計</th>
									<th className="text-end">{totalCharge.toLocaleString()} 円</th>
									<th className="text-muted small">代引/立替 {totalCollection.toLocaleString()} 円</th>
								</tr>
							</tfoot>
						</Table>
					</div>
					<div className="d-flex justify-content-between align-items-center mt-2 px-3 py-2 bg-light border rounded">
						<div className="small text-muted">回収予定（代引/立替）</div>
						<div className="fw-bold">{totalCollection.toLocaleString()} 円</div>
					</div>
				</section>

				<section className="panel-block">
					<header className="panel-block-title">経路</header>
					<div className="table-responsive border rounded">
						<Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
							<thead>
								<tr className="table-primary">
									<th style={{ width: "5%" }}>順</th>
									<th style={{ width: "28%" }}>納品先</th>
									<th style={{ width: "15%" }}>到着時刻</th>
									<th style={{ width: "15%" }}>出発時刻</th>
									<th style={{ width: "10%" }}>ケース数</th>
									<th style={{ width: "12%" }}>ステータス</th>
									<th>メモ</th>
								</tr>
							</thead>
							<tbody>
								{stopRows.map((row, index) => (
									<tr key={row.id}>
										<td className="text-center align-middle">{index + 1}</td>
										<td>
											<div className="fw-semibold">{row.destination}</div>
											<div className="small text-muted">計画 {row.plannedTime}</div>
										</td>
										<td>
											<CommonInputBox
												id={`actual-${row.id}`}
												type="time"
												className="w-100"
												value={row.actualTime}
												onChange={(e) => handleStopActualTimeChange(row.id, e.target.value)}
											/>
										</td>
										<td>
											<CommonInputBox
												id={`actual-${row.id}`}
												type="time"
												className="w-100"
												value={row.actualTime}
												onChange={(e) => handleStopActualTimeChange(row.id, e.target.value)}
											/>
										</td>
										<td>
											<InputGroup>
												<CommonInputBox
													id={`cod-${row.id}`}
													type="number"
													className="text-end"
													value={row.cod.toString()}
													onChange={(e) => handleStopCodChange(row.id, e.target.value)}
												/>
												<InputGroup.Text className="fs-6">円</InputGroup.Text>
											</InputGroup>
										</td>
										<td>
											<Form.Select
												size="sm"
												value={row.status}
												onChange={(e) => handleStopStatusChange(row.id, e.target.value as ResultStopSummary["status"])}
											>
												<option value="completed">完了</option>
												<option value="partial">一部</option>
												<option value="missed">未完</option>
											</Form.Select>
										</td>
										<td>
											<Form.Control
												id={`memo-${row.id}`}
												size="sm"
												type="text"
												value={row.memo ?? ""}
												onChange={(e) => handleStopMemoChange(row.id, e.target.value)}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</section>

				<div className="d-flex w-100 justify-content-end mt-4 gap-2">
					<Button className="btn btn-gradient px-4 py-2">下書き保存</Button>
					<Button className="btn btn-gradient px-4 py-2">実績を登録</Button>
				</div>
			</Form>
		</Container>
	);
}
