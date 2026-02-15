"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { Container, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, RequiredMark, CommonDateRangeBox } from "@/components/CommonComponent";
import { BsTruck } from "react-icons/bs";

type VehicleNumber = {
	id: number;
	vehicleNo: string;
	provisionalVehicleNo: string;
	driverName: string;
	assistant: string;
	driverPhone: string;
	status: string;
	operationDate: string;
	loadingDate: string;
	departureDate: string;
	unloadingDate: string;
	dispatchDeptCode: string;
	temperatureBand: string;
	ownCharterClass: string;
	transportDeptCode: string;
};

type OperationPlanRow = {
	id: number;
	routeCourse: string;
	fromLocation: string;
	toLocation: string;
	vehicles: VehicleNumber[];
	transportType: string;
};

type ContextMenuState = {
	x: number;
	y: number;
	vehicle: VehicleNumber | null;
	show: boolean;
};

type ListItem = { key: string; value: string };

type Operation020ClientProps = {
	localDate: string;
};

type OperationTableProps = {
	rows: OperationPlanRow[];
};

/// 車番確定画面
export default function Operation020Client({ localDate }: Operation020ClientProps) {
	const temperatureBandList: ListItem[] = [
		{ key: "T1", value: "常温" },
		{ key: "T2", value: "冷蔵" },
		{ key: "T3", value: "冷凍" },
		{ key: "T4", value: "超低温" },
	];
	const transportList: ListItem[] = [
		{ key: "01", value: "集荷" },
		// { key: "02", value: "ドレージ" },
		{ key: "03", value: "地域外幹線" },
		{ key: "04", value: "地域内幹線" },
		{ key: "05", value: "配送" },
		{ key: "06", value: "委託" },
		// { key: "07", value: "海運" },
	];
	// 運送業者マスタ
	const carriers: ListItem[] = [
		{ key: "C1001", value: "関東運輸" },
		{ key: "C1002", value: "茨城運送" },
		{ key: "C1003", value: "谷原商運" },
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

	const operationPlans: OperationPlanRow[] = [
		{
			id: 1,
			routeCourse: "茨城センター→郡山センター",
			fromLocation: "茨城センター",
			toLocation: "郡山センター",
			transportType: "地域外幹線",
			vehicles: [
				{
					id: 1,
					vehicleNo: "1233",
					provisionalVehicleNo: "1001",
					driverName: "村田　一郎",
					assistant: "",
					driverPhone: "090-0000-0000",
					status: "データ作成",
					operationDate: "2026/02/17",
					loadingDate: "2026/02/16",
					departureDate: "2026/02/17",
					unloadingDate: "2026/02/17",
					dispatchDeptCode: "茨城センター",
					temperatureBand: "常温",
					ownCharterClass: "自",
					transportDeptCode: "",
				},
				{
					id: 2,
					vehicleNo: "1234",
					provisionalVehicleNo: "1002",
					driverName: "田中　次郎",
					assistant: "",
					driverPhone: "090-1111-1111",
					status: "データ作成",
					operationDate: "2026/02/17",
					loadingDate: "2026/02/17",
					departureDate: "2026/02/17",
					unloadingDate: "2026/02/17",
					dispatchDeptCode: "茨城センター",
					temperatureBand: "常温",
					ownCharterClass: "自",
					transportDeptCode: "",
				},
			],
		},
		{
			id: 2,
			routeCourse: "茨城センター→印西センター",
			fromLocation: "茨城センター",
			toLocation: "印西センター",
			transportType: "地域外幹線",
			vehicles: [
				{
					id: 1,
					vehicleNo: "1324",
					provisionalVehicleNo: "1003",
					driverName: "山岡　直樹",
					assistant: "",
					driverPhone: "090-2222-2222",
					status: "データ作成",
					operationDate: "2026/02/17",
					loadingDate: "2026/02/17",
					departureDate: "2026/02/17",
					unloadingDate: "2026/02/17",
					dispatchDeptCode: "茨城センター",
					temperatureBand: "常温",
					ownCharterClass: "自",
					transportDeptCode: "",
				},
			],
		},
		{
			id: 3,
			routeCourse: "茨城センター→関東運輸",
			fromLocation: "茨城センター",
			toLocation: "関東運輸",
			transportType: "委託",
			vehicles: [
				{
					id: 1,
					vehicleNo: "5123",
					provisionalVehicleNo: "9999",
					driverName: "",
					assistant: "",
					driverPhone: "",
					status: "データ作成",
					operationDate: "2026/02/17",
					loadingDate: "2026/02/17",
					departureDate: "2026/02/17",
					unloadingDate: "2026/02/18",
					dispatchDeptCode: "茨城センター",
					temperatureBand: "常温",
					ownCharterClass: "庸",
					transportDeptCode: "関東運輸",
				},
			],
		},
		{
			id: 4,
			routeCourse: "高崎センター→茨城センター",
			fromLocation: "高崎センター",
			toLocation: "茨城センター",
			transportType: "地域外幹線",
			vehicles: [
				{
					id: 1,
					vehicleNo: "2132",
					provisionalVehicleNo: "2001",
					driverName: "木村　雄二",
					assistant: "",
					driverPhone: "090-3333-3333",
					status: "データ作成",
					operationDate: "2026/02/17",
					loadingDate: "2026/02/16",
					departureDate: "2026/02/17",
					unloadingDate: "2026/02/17",
					dispatchDeptCode: "高崎センター",
					temperatureBand: "常温",
					ownCharterClass: "自",
					transportDeptCode: "",
				},
			],
		},
		{
			id: 5,
			routeCourse: "足利センター→茨城センター",
			fromLocation: "足利センター",
			toLocation: "茨城センター",
			transportType: "地域外幹線",
			vehicles: [
				{
					id: 1,
					vehicleNo: "3131",
					provisionalVehicleNo: "3001",
					driverName: "小山　信二",
					assistant: "",
					driverPhone: "090-4444-4444",
					status: "データ作成",
					operationDate: "2026/02/17",
					loadingDate: "2026/02/16",
					departureDate: "2026/02/17",
					unloadingDate: "2026/02/17",
					dispatchDeptCode: "足利センター",
					temperatureBand: "常温",
					ownCharterClass: "自",
					transportDeptCode: "沖縄物流",
				},
			],
		},
	];
	const [filteredRows, setFilteredRows] = useState<OperationPlanRow[]>(operationPlans);
	const [officeCode, setOfficeCode] = useState("MIBRDC");

	const handleSearch = (event?: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		const officeName = locationList.find((location) => location.key === officeCode)?.value ?? "";
		const nextRows = officeName
			? operationPlans.filter((plan) => plan.fromLocation === officeName || plan.toLocation === officeName)
			: operationPlans;
		setFilteredRows(nextRows);
	};

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form onSubmit={handleSearch}>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required label="運行日">
								<CommonDateRangeBox id="operationDate" defaultFromValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={false} label="営業所">
								<CommonComboBox
									id="office"
									list={locationList}
									showKey={true}
									value={officeCode}
									onChange={(event) => setOfficeCode(event.target.value)}
								/>
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="温度帯K">
								<CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="運送K">
								<CommonComboBox id="transportType" list={transportList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={5} xxl={4}>
							<CommonGroupLabel required={false} label="運送業者CD">
								<CommonComboBox id="carrierCode" list={carriers} showKey={true} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} className="d-flex justify-content-center gap-2 mt-3">
							<Button type="submit" className="btn btn-gradient px-3">
								検索
							</Button>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
				<OperationPlanPanels rows={filteredRows} />
			</section>
		</Container>
	);
}

function OperationPlanPanels({ rows }: OperationTableProps) {
	const EMPTY_TO_LABEL = "To未設定";
	const toLabel = (route: OperationPlanRow) => {
		const destination = route.toLocation?.trim();
		if (destination) return destination;
		const typeLabel = route.transportType?.trim();
		return typeLabel || EMPTY_TO_LABEL;
	};

	const fromOptions = useMemo(
		() => Array.from(new Set(rows.map((route) => route.fromLocation).filter(Boolean))),
		[rows],
	);
	const [selectedFrom, setSelectedFrom] = useState(fromOptions[0] ?? "");

	useEffect(() => {
		if (fromOptions.length === 0) {
			setSelectedFrom("");
			return;
		}
		if (!fromOptions.includes(selectedFrom)) {
			setSelectedFrom(fromOptions[0]);
		}
	}, [fromOptions, selectedFrom]);

	const toCards = useMemo(() => {
		const candidates = rows.filter((route) => route.fromLocation === selectedFrom);
		const buckets = new Map<string, OperationPlanRow>();
		candidates.forEach((route) => {
			const label = toLabel(route);
			if (!buckets.has(label)) {
				buckets.set(label, route);
			}
		});
		return Array.from(buckets.entries()).map(([label, route]) => ({ label, route }));
	}, [rows, selectedFrom]);

	const toOptions = toCards.map((card) => card.label);
	const [selectedTo, setSelectedTo] = useState(toOptions[0] ?? "");

	useEffect(() => {
		if (toOptions.length === 0) {
			setSelectedTo("");
			return;
		}
		if (!toOptions.includes(selectedTo)) {
			setSelectedTo(toOptions[0]);
		}
	}, [selectedFrom, selectedTo, toOptions]);

	const selectedRoute = rows.find(
		(route) => route.fromLocation === selectedFrom && toLabel(route) === (selectedTo || EMPTY_TO_LABEL),
	);
	const vehicles = selectedRoute?.vehicles ?? [];
	const isSeaTransport = selectedRoute?.transportType === "海運";
	const transportIcon = isSeaTransport ? (
		<Image src="/shipicon.png" alt="船" width={32} height={32} priority />
	) : (
		<BsTruck size={32} className="text-primary" />
	);

	const fromSummaries = useMemo(() => {
		const summary = new Map<string, { destinations: Set<string>; vehicleCount: number }>();
		rows.forEach((route) => {
			const current = summary.get(route.fromLocation) ?? { destinations: new Set<string>(), vehicleCount: 0 };
			current.destinations.add(toLabel(route));
			current.vehicleCount += route.vehicles.length;
			summary.set(route.fromLocation, current);
		});
		return summary;
	}, [rows]);

	const [contextMenu, setContextMenu] = useState<ContextMenuState>({ x: 0, y: 0, vehicle: null, show: false });

	const handleContextMenu = (event: MouseEvent, vehicle: VehicleNumber) => {
		event.preventDefault();
		setContextMenu({ x: event.clientX, y: event.clientY, vehicle, show: true });
	};

	const hideContextMenu = () => setContextMenu((prev) => ({ ...prev, show: false, vehicle: null }));

	useEffect(() => {
		hideContextMenu();
	}, [selectedFrom, selectedTo, rows]);

	if (rows.length === 0) {
		return <div className="text-muted">条件に合うルートがありません。</div>;
	}

	return (
		<Row className="gy-3">
			<Col lg={3} className="d-flex flex-column gap-2">
				{fromOptions.map((fromLocation) => {
					const isSelected = fromLocation === selectedFrom;
					const summary = fromSummaries.get(fromLocation);
					const vehicleCount = summary?.vehicleCount ?? 0;
					const destinationCount = summary?.destinations.size ?? 0;
					return (
						<button
							type="button"
							key={fromLocation}
							onClick={() => {
								setSelectedFrom(fromLocation);
								hideContextMenu();
							}}
							className={`w-100 text-start border rounded p-3 shadow-sm d-flex flex-column gap-2 ${
								isSelected ? "bg-primary text-white border-primary" : "bg-light text-body"
							}`}
						>
							<div className="fw-semibold">{fromLocation}</div>
							<div className="small d-flex justify-content-between align-items-center">
								<span>To: {destinationCount} 件</span>
								<Badge bg={isSelected ? "light" : "secondary"} text={isSelected ? "dark" : undefined}>
									{vehicleCount} 台
								</Badge>
							</div>
						</button>
					);
				})}
			</Col>

			<Col lg={6} onClick={hideContextMenu} className="position-relative">
				<div className="d-flex align-items-center justify-content-center gap-3 mb-3">
					<span className="fw-semibold">{selectedFrom || "From未選択"}</span>
					{transportIcon}
					<span className="fw-semibold">{selectedTo || "To未選択"}</span>
				</div>
				<div className="border rounded p-3 bg-white shadow-sm h-80">
					{selectedRoute ? (
						<div className="d-flex flex-column gap-3 h-100">
							<div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
								<div className="d-flex flex-column">
									<div className="small text-muted">運送区分: {selectedRoute.transportType || "-"} </div>
								</div>
								<Badge bg="info" text="dark">
									{vehicles.length} 台
								</Badge>
							</div>
							{vehicles.length > 0 ? (
								<div className="d-flex flex-column gap-3">
									{vehicles.map((vehicle) => (
										<div
											key={vehicle.id}
											className="border rounded p-3 bg-light h-100 d-flex flex-column gap-2"
											onContextMenu={(event) => handleContextMenu(event, vehicle)}
										>
											<div className="d-flex flex-wrap align-items-center gap-2">
												<Badge bg="secondary" text="light">
													{vehicle.status}
												</Badge>
												<span className="small">温度帯: {vehicle.temperatureBand || "-"}</span>
												<span className="small">自/傭: {vehicle.ownCharterClass || "-"}</span>
												<span className="small">運送会社: {vehicle.transportDeptCode || "-"}</span>
											</div>
											<div className="small d-flex flex-wrap gap-3">
												<span>配車部門: {vehicle.dispatchDeptCode}</span>
												<span>
													{isSeaTransport ? "船名" : "車番"}: {vehicle.vehicleNo}
												</span>
												{!isSeaTransport && <span>仮車番: {vehicle.provisionalVehicleNo}</span>}
											</div>
											{!isSeaTransport && (
												<div className="small d-flex flex-wrap gap-3">
													<span>ドライバー: {vehicle.driverName}</span>
													<span>助手: {vehicle.assistant || "ー"}</span>
													<span>電話番号: {vehicle.driverPhone}</span>
												</div>
											)}
											<div className="small d-flex flex-wrap gap-3">
												<span>
													{isSeaTransport ? "出港日" : "運行日"}: {vehicle.operationDate}
												</span>
												<span>積込日: {vehicle.loadingDate}</span>
											</div>
											<div className="small d-flex flex-wrap gap-3">
												{!isSeaTransport && <span>出発日: {vehicle.departureDate}</span>}
												<span>
													{isSeaTransport ? "入港日" : "荷卸日"}: {vehicle.unloadingDate}
												</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="text-muted">車番情報がありません</div>
							)}
						</div>
					) : (
						<div className="text-muted">FromとToを選択してください。</div>
					)}
				</div>
				{contextMenu.show && contextMenu.vehicle && (
					<div
						className="position-fixed bg-white border rounded shadow-sm"
						style={{ top: contextMenu.y, left: contextMenu.x, zIndex: 1080, minWidth: "160px" }}
						onClick={(event) => event.stopPropagation()}
					>
						<Button variant="link" className="w-100 text-start px-3 py-2" onClick={hideContextMenu}>
							車番入力
						</Button>
						<Button variant="link" className="w-100 text-start px-3 py-2" onClick={hideContextMenu}>
							ドライバー選択
						</Button>
					</div>
				)}
			</Col>

			<Col lg={3} className="d-flex flex-column gap-2">
				{toCards.map(({ label, route }) => {
					const isSelected = label === selectedTo;
					return (
						<button
							type="button"
							key={label}
							onClick={() => {
								setSelectedTo(label);
								hideContextMenu();
							}}
							className={`w-100 text-start border rounded p-3 shadow-sm d-flex flex-column gap-2 ${
								isSelected ? "bg-primary text-white border-primary" : "bg-light text-body"
							}`}
						>
							<div className="fw-semibold">{label}</div>
							<div className="text-muted small">{route.routeCourse || "ルート未設定"}</div>
						</button>
					);
				})}
			</Col>
		</Row>
	);
}
