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
	const operationRoutes: ListItem[] = [
		{ key: "1", value: "1234：福岡かすやINC" },
		{ key: "2", value: "5678：鹿児島南センター" },
		{ key: "3", value: "9012：川内営業所" },
		{ key: "4", value: "3456：加治木営業所" },
		{ key: "5", value: "7890：日置営業所" },
	];

	// 1画面目 -> 車番選択（route）
	// 2画面目 -> バーコード読み取り（scan）
	// 3画面目 -> 戻し処理（deduct）
	const [screen, setScreen] = useState<HandyScreen>("route");

	const [selectedRoute, setSelectedRoute] = useState("");
	const selectedRouteLabel = operationRoutes.find((r) => r.key === selectedRoute)?.value ?? "";

	const [labelNo, setLabelNo] = useState("");
	const [scanCount, setScanCount] = useState(0);
	const [scannedLabels, setScannedLabels] = useState<string[]>([]);

	const handleRouteConfirm = () => {
		if (!selectedRoute) return;
		// 車番確定 -> 読み取り画面へ（読み取り系はリセット）
		setScreen("scan");
		setLabelNo("");
		setScanCount(0);
		setScannedLabels([]);
	};

	const handleScanConfirm = () => {
		if (!labelNo.trim()) return;
		const code = labelNo.trim();

		setScannedLabels((prev) => [...prev, code]);
		setScanCount((prev) => prev + 1);
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
			// 見つかったときだけ count を減らす（同じイベント内でOK）
			setScanCount((c) => Math.max(0, c - 1));

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
		setScanCount(0);
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
												<CommonGroupLabel required label="車番" style={{ gridTemplateColumns: "6rem minmax(0, 1fr)" }}>
													<CommonComboBox
														id="operationRoute"
														list={operationRoutes}
														showKey={false}
														value={selectedRoute}
														onChange={(e) => setSelectedRoute(e.target.value)}
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
											disabled={!selectedRoute}
										>
											決定
										</Button>
									</div>
								</Form>
							</>
						) : screen === "scan" ? (
							<>
								<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
									<span className="panel-block-title mb-0">発荷確認 -バーコード読み取り-</span>
									{selectedRouteLabel ? <span className="text-muted small">{selectedRouteLabel}</span> : null}
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
									<span className="panel-block-title mb-0">発荷確認 -戻し処理-</span>
									{selectedRouteLabel ? <span className="text-muted small">{selectedRouteLabel}</span> : null}
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
											戻る
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
