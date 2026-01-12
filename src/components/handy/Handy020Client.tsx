"use client";

import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { CommonComboBox, CommonGroupLabel, CommonInputBox } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type Handy020ClientProps = {
	localDate: string;
};

type HandyScreen = "route" | "scan";

export default function Handy020Client({ localDate }: Handy020ClientProps) {
	void localDate;

	// 営業所（発）一覧
	const operationRoutes: ListItem[] = [
		{ key: "1", value: "1234：福岡かすやINC" },
		{ key: "2", value: "5678：鹿児島南センター" },
		{ key: "3", value: "9012：川内営業所" },
		{ key: "4", value: "3456：加治木営業所" },
		{ key: "5", value: "7890：日置営業所" },
	];

	const [screen, setScreen] = useState<HandyScreen>("scan");
	const [selectedRoute, setSelectedRoute] = useState("");
	const [labelNo, setLabelNo] = useState("");
	const [scanCount, setScanCount] = useState(0);
	const [scanWeight, setScanWeight] = useState(0);
	const [scanVolume, setScanVolume] = useState(0);
	const [scannedLabels, setScannedLabels] = useState<string[]>([]);

	const selectedRouteLabel = operationRoutes.find((route) => route.key === selectedRoute)?.value ?? "";

	const handleRouteConfirm = () => {
		if (!selectedRoute) return;
		setScreen("scan");
		setLabelNo("");
		setScanCount(0);
		setScanWeight(0);
		setScanVolume(0);
		setScannedLabels([]);
	};

	const handleScanConfirm = () => {
		if (!labelNo.trim()) return;
		setScannedLabels((prev) => [...prev, labelNo.trim()]);
		setScanCount((prev) => prev + 1);
		setScanWeight((prev) => prev + 10); // 仮に10kg増加とする
		setScanVolume((prev) => prev + 1); // 仮に1m³増加とする
		setLabelNo("");
	};

	const handleScanRevert = () => {
		// 戻す処理（仮実装）
		setScannedLabels((prev) => {
			const index = prev.lastIndexOf(labelNo.trim());
			const newLabels = [...prev];
			newLabels.splice(index, 1);
			return newLabels;
		});
		setScanCount((prev) => prev - 1);
		setScanWeight((prev) => prev - 10); // 仮に10kg減少とする
		setScanVolume((prev) => prev - 1); // 仮に1m³減少とする
		setLabelNo("");
	};

	const handleComplete = () => {
		setScreen("route");
	};

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				{screen === "route" ? (
					<>
						<header className="panel-block-header d-flex align-items-center justify-content-between">
							<span className="panel-block-title mb-0">運行便選択</span>
						</header>
						<Form>
							<Row className="gx-1 gy-2 mb-3">
								<Col md={12} lg={6} xxl={4}>
									<CommonGroupLabel required label="車番：着営業所">
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
							{scannedLabels.length > 0 ? (
								<Row className="gx-1 gy-2 mb-3">
									<Col md={12} lg={6} xxl={4}>
										<div className="p-3 border rounded-3 bg-light">
											<div className="d-flex justify-content-between align-items-center mb-2">
												<span className="fw-semibold">スキャン済み荷札</span>
												<span className="text-muted small">
													{scannedLabels.length}件 / {scanWeight}kg
												</span>
											</div>
											<div className="d-flex flex-wrap gap-2">
												{scannedLabels.map((code, idx) => (
													<span key={`${code}-${idx}`} className="badge bg-primary-subtle text-primary border">
														{code}
													</span>
												))}
											</div>
										</div>
									</Col>
								</Row>
							) : null}
							<div className="d-flex justify-content-end">
								<Button
									type="button"
									className="btn btn-gradient px-4"
									onClick={handleRouteConfirm}
									disabled={!selectedRoute}
								>
									決定
								</Button>
							</div>
						</Form>
					</>
				) : (
					<>
						<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
							<span className="panel-block-title mb-0">荷札番号読み取り</span>
							<span className="text-muted small">荷札入力後、運行便選択へ</span>
						</header>
						<Form>
							<Row className="gx-1 gy-2 mb-2">
								<Col md={12} lg={6}>
									<CommonGroupLabel required label="荷札番号">
										<CommonInputBox
											id="labelNo"
											value={labelNo}
											onChange={(e) => setLabelNo(e.target.value)}
											placeholder="バーコードを読み込み"
										/>
									</CommonGroupLabel>
								</Col>
							</Row>
							<Row className="gx-1 gy-2 mb-2">
								<Col md={12} lg={4}>
									<CommonGroupLabel required={false} label="個数">
										<CommonInputBox id="scanCount" value={`${scanCount}個`} readOnly />
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4}>
									<CommonGroupLabel required={false} label="重量(kg)">
										<CommonInputBox id="scanWeight" value={`${scanWeight}kg`} readOnly />
									</CommonGroupLabel>
								</Col>
								<Col md={12} lg={4}>
									<CommonGroupLabel required={false} label="容積(m³)">
										<CommonInputBox id="scanVolume" value={`${scanVolume}m³`} readOnly />
									</CommonGroupLabel>
								</Col>
							</Row>
							<div className="d-flex flex-wrap justify-content-end gap-2">
								<Button
									type="button"
									className="btn btn-gradient px-4"
									onClick={handleScanRevert}
									disabled={scannedLabels.length === 0}
								>
									戻す
								</Button>
								<Button
									type="button"
									className="btn btn-gradient px-4"
									onClick={handleScanConfirm}
									disabled={!labelNo.trim()}
								>
									決定
								</Button>
								<Button type="button" className="btn btn-outline-secondary px-4" onClick={handleComplete}>
									完了
								</Button>
							</div>
						</Form>
					</>
				)}
			</section>
		</Container>
	);
}
