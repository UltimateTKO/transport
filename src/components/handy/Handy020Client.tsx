"use client";

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CommonComboBox, CommonGroupLabel, CommonInputBox } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type Handy020ClientProps = {
	localDate: string;
};

type HandyScreen = "route" | "scan" | "deduct";

export default function Handy020Client({ localDate }: Handy020ClientProps) {
	void localDate;

	// 車番（発営業所）一覧
	const viecleNums: ListItem[] = [
		{ key: "1", value: "1234" },
		{ key: "2", value: "5678" },
		{ key: "3", value: "9012" },
		{ key: "4", value: "3456" },
		{ key: "5", value: "7890" },
	];

	const routecourses: ListItem[] = [
		{ key: "OUADCOUGBO", value: "総合流通-ギンザー" },
		{ key: "OUADCONHBO", value: "総合流通-那覇営業所" },
		{ key: "OUADCONABO", value: "総合流通-あんしん館" },
		{ key: "OUADCONNBO", value: "総合流通-西原営業所" },
		{ key: "OUADCDNHDO", value: "総合流通-那覇港" },
		{ key: "OUADCCC001", value: "総合流通-コース1" },
		{ key: "OUADCCC002", value: "総合流通-コース2" },
		{ key: "OUADCCC003", value: "総合流通-コース3" },

		{ key: "OUGBOOUADC", value: "ギンザー-総合流通" },
		{ key: "OUGBOOUMDC", value: "ギンザー-港町物流センター" },
		{ key: "OUGBOCC001", value: "ギンザー-コース1" },
		{ key: "OUGBOCC002", value: "ギンザー-コース2" },
		{ key: "OUGBOCC003", value: "ギンザー-コース3" },

		{ key: "OUMDCOUGBO", value: "港町物流センター-ギンザー" },
		{ key: "OUMDCONFDC", value: "港町物流センター-西原FDC" },
		{ key: "OUMDCDNHDO", value: "港町物流センター-那覇港" },
		{ key: "OUMDCCC001", value: "港町物流センター-コース1" },
		{ key: "OUMDCCC002", value: "港町物流センター-コース2" },
		{ key: "OUMDCCC003", value: "港町物流センター-コース3" },

		{ key: "ONHBOOUADC", value: "那覇営業所-総合流通" },
		{ key: "ONHBOCC001", value: "那覇営業所-コース1" },
		{ key: "ONHBOCC002", value: "那覇営業所-コース2" },
		{ key: "ONHBOCC003", value: "那覇営業所-コース3" },

		{ key: "ONFDCOUMDC", value: "西原FDC-港町物流センター" },
		{ key: "ONFDCCC001", value: "西原FDC-コース1" },
		{ key: "ONFDCCC002", value: "西原FDC-コース2" },
		{ key: "ONFDCCC003", value: "西原FDC-コース3" },

		{ key: "ONABOOUADC", value: "あんしん館-総合流通" },
		{ key: "ONABOCC001", value: "あんしん館-コース1" },
		{ key: "ONABOCC002", value: "あんしん館-コース2" },
		{ key: "ONABOCC003", value: "あんしん館-コース3" },

		{ key: "ONNBOOUADC", value: "西原営業所-総合流通" },
		{ key: "ONNBOCC001", value: "西原営業所-コース1" },
		{ key: "ONNBOCC002", value: "西原営業所-コース2" },
		{ key: "ONNBOCC003", value: "西原営業所-コース3" },

		{ key: "DNHDOOUADC", value: "那覇港-総合流通" },
		{ key: "DNHDOOUMDC", value: "那覇港-港町物流センター" },
		{ key: "DNHDODOMDO", value: "那覇港-宮古港" },
		{ key: "DNHDODHTDO", value: "那覇港-博多港" },
		{ key: "DNHDODOODO", value: "那覇港-大阪港" },
		{ key: "DNHDODYHDO", value: "那覇港-横浜港" },

		{ key: "DOMDODNHDO", value: "宮古港-那覇港" },
		{ key: "DHTDODNHDO", value: "博多港-那覇港" },
		{ key: "DOODODNHDO", value: "大阪港-那覇港" },
		{ key: "DYHDODNHDO", value: "横浜港-那覇港" },

		{ key: "DOMDOZZZZZ", value: "宮古港-納品先" },
		{ key: "DHTDOZZZZZ", value: "博多港-納品先" },
		{ key: "DOODOZZZZZ", value: "大阪港-納品先" },
		{ key: "DYHDOZZZZZ", value: "横浜港-納品先" },
	];

	// 1画面目 -> 車番選択（route）
	// 2画面目 -> バーコード読み取り（scan）
	// 3画面目 -> 戻し処理（deduct）
	const [screen, setScreen] = useState<HandyScreen>("route");

	const [selectedViecleNum, setSelectedViecleNum] = useState("");
	const selectedViecleNumLabel = viecleNums.find((r) => r.key === selectedViecleNum)?.value ?? "";
	const [selectedRoute, setSelectedRoute] = useState("");
	const selectedRouteLabel = routecourses.find((r) => r.key === selectedRoute)?.value ?? "";
	const headerLabelBlock =
		selectedRouteLabel || selectedViecleNumLabel ? (
			<div className="text-muted small d-flex flex-column text-end gap-1">
				{selectedRouteLabel ? <span>{selectedRouteLabel}</span> : null}
				{selectedViecleNumLabel ? <span>{selectedViecleNumLabel}</span> : null}
			</div>
		) : null;

	const [labelNo, setLabelNo] = useState("");
	const [scannedLabels, setScannedLabels] = useState<string[]>([]);
	const scanCount = scannedLabels.length;

	const handleRouteConfirm = () => {
		if (!selectedViecleNum) return;
		// 車番確定 -> 読み取り画面へ（読み取り系はリセット）
		setScreen("scan");
		setLabelNo("");
		setScannedLabels([]);
	};

	const handleScanConfirm = () => {
		if (!labelNo.trim()) return;
		const code = labelNo.trim();

		setScannedLabels((prev) => [...prev, code]);
		setLabelNo("");
	};

	const handleScanRevert = () => {
		setScreen("deduct");
		setLabelNo("");
	};

	const handleDeductConfirm = () => {
		if (!labelNo.trim()) return;
		const code = labelNo.trim();

		setScannedLabels((prev) => {
			const idx = prev.lastIndexOf(code);
			console.log(`Deducting code ${code} at index ${idx}`);
			if (idx === -1) return prev;

			console.log("Code found, proceeding to deduct.");
			const updated = [...prev];
			updated.splice(idx, 1);
			return updated;
		});

		setLabelNo("");
	};

	const handleBackToScan = () => {
		setScreen("scan");
		setLabelNo("");
	};

	const handleComplete = () => {
		// 完了 -> 車番選択へ戻す（読み取り系はリセット）
		setScreen("route");
		setLabelNo("");
		setScannedLabels([]);
	};

	return (
		<div className="handy-terminal-stage">
			<div className="handy-terminal-frame">
				<div className="handy-terminal-screen">
					<section>
						{screen === "route" ? (
							<>
								<Form className="handy-form">
									<div className="handy-form-body">
										<Row className="gx-1 gy-2">
											<Col md={12}>
												<CommonGroupLabel
													required
													label="ルートコース"
													style={{ gridTemplateColumns: "6rem minmax(0, 1fr)" }}
												>
													<CommonComboBox
														id="operationRoute"
														list={routecourses.filter((route) => route.key.startsWith("OUG"))}
														showKey={true}
														value={selectedRoute}
														onChange={(e) => setSelectedRoute(e.target.value)}
													/>
												</CommonGroupLabel>
											</Col>
											<Col md={12}>
												<CommonGroupLabel required label="車番" style={{ gridTemplateColumns: "6rem minmax(0, 1fr)" }}>
													<CommonComboBox
														id="operationVehicleNum"
														list={viecleNums}
														showKey={false}
														value={selectedViecleNum}
														onChange={(e) => setSelectedViecleNum(e.target.value)}
													/>
												</CommonGroupLabel>
											</Col>
										</Row>
									</div>

									<div className="handy-terminal-actions">
										<Button
											type="button"
											className="btn btn-primary px-3"
											onClick={handleRouteConfirm}
											disabled={!selectedViecleNum}
										>
											決定
										</Button>
									</div>
								</Form>
							</>
						) : screen === "scan" ? (
							<>
								<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
									<span className="panel-block-title mb-0">
										発荷確認
										<br />
										-バーコード読み取り-
									</span>
									{headerLabelBlock}
								</header>

								<Form className="handy-form">
									<div className="handy-form-body">
										<Row className="gx-1 gy-2">
											<Col md={12}>
												<CommonGroupLabel
													required
													label="バーコード"
													style={{ gridTemplateColumns: "6rem minmax(0, 1fr)" }}
												>
													<CommonInputBox
														id="labelNo"
														value={labelNo}
														onChange={(e) => setLabelNo(e.target.value)}
														placeholder="バーコードを読み込み"
													/>
												</CommonGroupLabel>
											</Col>
										</Row>

										<Row className="gx-1 gy-2">
											<Col md={12}>
												<CommonGroupLabel
													required={false}
													label="個数"
													style={{ gridTemplateColumns: "6rem minmax(0, 1fr)" }}
												>
													<CommonInputBox id="scanCount" value={`${scanCount}個`} textAlign="right" readOnly />
												</CommonGroupLabel>
											</Col>
										</Row>
									</div>

									<div className="handy-terminal-actions">
										<Button
											type="button"
											className="btn btn-primary px-3"
											onClick={handleScanRevert}
											disabled={scannedLabels.length === 0}
											size="sm"
										>
											F2:戻す
										</Button>

										<Button
											type="button"
											className="btn btn-primary px-3"
											onClick={handleScanConfirm}
											disabled={!labelNo.trim()}
											size="sm"
										>
											決定
										</Button>

										<Button type="button" className="btn btn-outline-secondary px-4" onClick={handleComplete} size="sm">
											F3:完了
										</Button>
									</div>
								</Form>
							</>
						) : (
							<>
								<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
									<span className="panel-block-title mb-0">
										発荷確認
										<br />
										-戻し処理-
									</span>
									{headerLabelBlock}
								</header>

								<Form className="handy-form">
									<div className="handy-form-body">
										<Row className="gx-1 gy-2">
											<Col md={12}>
												<CommonGroupLabel
													required
													label="バーコード"
													style={{ gridTemplateColumns: "6rem minmax(0, 1fr)" }}
												>
													<CommonInputBox
														id="labelNoDeduct"
														value={labelNo}
														onChange={(e) => setLabelNo(e.target.value)}
														placeholder="戻したいバーコードを読み込み"
													/>
												</CommonGroupLabel>
											</Col>
										</Row>

										<Row className="gx-1 gy-2">
											<Col md={12}>
												<CommonGroupLabel
													required={false}
													label="個数"
													style={{ gridTemplateColumns: "6rem minmax(0, 1fr)" }}
												>
													<CommonInputBox id="scanCountDeduct" value={`${scanCount}個`} textAlign="right" readOnly />
												</CommonGroupLabel>
											</Col>
										</Row>
									</div>

									<div className="handy-terminal-actions">
										<Button
											type="button"
											className="btn btn-outline-secondary px-4"
											onClick={handleBackToScan}
											size="sm"
										>
											F2:発荷確認
										</Button>

										<Button
											type="button"
											className="btn btn-primary px-3"
											onClick={handleDeductConfirm}
											disabled={!labelNo.trim() || scanCount === 0}
											size="sm"
										>
											決定
										</Button>

										<Button type="button" className="btn btn-outline-secondary px-4" onClick={handleComplete} size="sm">
											F3:完了
										</Button>
									</div>
								</Form>
							</>
						)}
					</section>
				</div>
			</div>
		</div>
	);
}
