"use client";

import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { CommonComboBox, CommonGroupLabel, CommonInputBox } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type Handy010ClientProps = {
	localDate: string;
};

type HandyScreen = "route" | "scan";

export default function Handy010Client({ localDate }: Handy010ClientProps) {
	void localDate;

	// 営業所（発）一覧
	const operationRoutes: ListItem[] = [
		{ key: "1", value: "1234：福岡かすやINC" },
		{ key: "2", value: "5678：鹿児島南センター" },
		{ key: "3", value: "9012：川内営業所" },
		{ key: "4", value: "3456：加治木営業所" },
		{ key: "5", value: "7890：日置営業所" },
	];

	const [screen, setScreen] = useState<HandyScreen>("route");
	const [selectedRoute, setSelectedRoute] = useState("");
	const [labelNo, setLabelNo] = useState("");
	const [scanCount, setScanCount] = useState(0);

	const selectedRouteLabel = operationRoutes.find((route) => route.key === selectedRoute)?.value ?? "";

	const handleRouteConfirm = () => {
		if (!selectedRoute) return;
		setScreen("scan");
		setLabelNo("");
		setScanCount(0);
	};

	const handleScanConfirm = () => {
		if (!labelNo.trim()) return;
		setScanCount((prev) => prev + 1);
		setLabelNo("");
	};

	const handleComplete = () => {
		setScreen("route");
		setSelectedRoute("");
		setLabelNo("");
		setScanCount(0);
	};

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				{screen === "route" ? (
					<>
						<header className="panel-block-header d-flex align-items-center justify-content-between">
							<span className="panel-block-title mb-0">運行便選択</span>
							<span className="text-muted small">便確定後に荷札入力へ</span>
						</header>
						<Form>
							<Row className="gx-1 gy-2 mb-3">
								<Col md={12} lg={6} xxl={4}>
									<CommonGroupLabel required label="車番：発営業所">
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
							<span className="text-muted small">{selectedRouteLabel}</span>
						</header>
						<Form>
							<Row className="gx-1 gy-2 mb-3">
								<Col md={12} lg={6}>
									<CommonGroupLabel required label="運行便">
										<CommonInputBox id="selectedRoute" value={selectedRouteLabel} readOnly />
									</CommonGroupLabel>
								</Col>
							</Row>
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
							</Row>
							<div className="d-flex flex-wrap justify-content-end gap-2">
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
