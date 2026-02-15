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
		{ key: "RIBRFKS", value: "茨城-郡山" },
		{ key: "RIBRGNM", value: "茨城-高崎" },
		{ key: "RIBRTTG", value: "茨城-足利" },
		{ key: "RIBRSTM", value: "茨城-岩槻" },
		{ key: "RIBRTIB", value: "茨城-印西" },
		{ key: "RIBRTKY", value: "茨城-東京" },
		{ key: "RIBR001", value: "茨城コース1" },
		{ key: "RIBR002", value: "茨城コース2" },
		{ key: "RIBR003", value: "茨城コース3" },
		{ key: "RFKSIBR", value: "郡山-茨城" },
		{ key: "RFKS001", value: "郡山コース1" },
		{ key: "RFKS002", value: "郡山コース2" },
		{ key: "RFKS003", value: "郡山コース3" },
		{ key: "RGNMIBR", value: "高崎-茨城" },
		{ key: "RGNM001", value: "高崎コース1" },
		{ key: "RGNM002", value: "高崎コース2" },
		{ key: "RGNM003", value: "高崎コース3" },
		{ key: "RTTGIBR", value: "足利-茨城" },
		{ key: "RTTG001", value: "足利コース1" },
		{ key: "RTTG002", value: "足利コース2" },
		{ key: "RTTG003", value: "足利コース3" },
		{ key: "RSTMIBR", value: "岩槻-茨城" },
		{ key: "RSTM001", value: "岩槻コース1" },
		{ key: "RSTM002", value: "岩槻コース2" },
		{ key: "RSTM003", value: "岩槻コース3" },
		{ key: "RTIBIBR", value: "印西-茨城" },
		{ key: "RTIB001", value: "印西コース1" },
		{ key: "RTIB002", value: "印西コース2" },
		{ key: "RTIB003", value: "印西コース3" },
		{ key: "RTKYIBR", value: "東京-茨城" },
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
														list={routecourses.filter((route) => route.key.startsWith("RIBR"))}
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
