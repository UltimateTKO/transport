"use client";

import { Fragment, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, CommonInputBox, RequiredMark } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type RouteStop = {
	id: string;
	tag: "CM" | "CN";
	name: string;
	weight: string;
	volume: string;
	slips: string;
	tempClass: "ambient" | "cool" | "frozen";
};

type RoutePanel = {
	id: string;
	label: string;
	carNo: string;
	isActive: boolean;
	totals: {
		weight: string;
		volume: string;
		slips: string;
	};
	stops: Array<RouteStop | null>;
};

type Transport040ClientProps = {
	localDate: string;
};

const initialRoutes: RoutePanel[] = [
	{
		id: "route-1",
		label: "CYUO : 中央",
		carNo: "1001",
		isActive: true,
		totals: {
			weight: "0M3Kg",
			volume: "0m",
			slips: "3伝票",
		},
		stops: [
			{
				id: "r1-1",
				tag: "CM",
				name: "テストマート",
				weight: "M3Kg",
				volume: "m3",
				slips: "1伝票",
				tempClass: "ambient",
			},
			{
				id: "r1-2",
				tag: "CM",
				name: "株式会社 北越",
				weight: "M3Kg",
				volume: "m3",
				slips: "1伝票",
				tempClass: "ambient",
			},
			{
				id: "r1-3",
				tag: "CM",
				name: "東北市場(発)",
				weight: "M3Kg",
				volume: "m3",
				slips: "1伝票",
				tempClass: "cool",
			},
			null,
		],
	},
	{
		id: "route-2",
		label: "CYUO : 中央",
		carNo: "2001",
		isActive: true,
		totals: {
			weight: "0M3Kg",
			volume: "0m",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r2-1",
				tag: "CM",
				name: "季節の贈箱",
				weight: "M3Kg",
				volume: "m3",
				slips: "1伝票",
				tempClass: "ambient",
			},
			null,
			null,
			null,
		],
	},
	{
		id: "route-3",
		label: "CYUO : 中央",
		carNo: "1001",
		isActive: false,
		totals: {
			weight: "0M3Kg",
			volume: "0m",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r3-1",
				tag: "CM",
				name: "(株)ありがとう",
				weight: "M3Kg",
				volume: "m3",
				slips: "1伝票",
				tempClass: "frozen",
			},
			null,
			null,
			null,
		],
	},
	{
		id: "route-4",
		label: "CYUO : 中央",
		carNo: "1003",
		isActive: true,
		totals: {
			weight: "0M3Kg",
			volume: "0m",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r4-1",
				tag: "CN",
				name: "Place金沢",
				weight: "M3Kg",
				volume: "m3",
				slips: "1伝票",
				tempClass: "cool",
			},
			null,
			null,
			null,
		],
	},
];

export default function Transport040Client({ localDate }: Transport040ClientProps) {
	const [routes, setRoutes] = useState<RoutePanel[]>(initialRoutes);
	const [draggedStop, setDraggedStop] = useState<{ routeId: string; stopIndex: number } | null>(null);
	const [dragOverCell, setDragOverCell] = useState<{ routeId: string; stopIndex: number } | null>(null);

	const warehouses: ListItem[] = [
		{ key: "41", value: "若瓦" },
		{ key: "42", value: "東北" },
		{ key: "43", value: "関西" },
	];
	const carriers: ListItem[] = [
		{ key: "C01", value: "中央輸送" },
		{ key: "C02", value: "北日本運送" },
	];
	const vehicleNumbers: ListItem[] = [
		{ key: "1001", value: "1001" },
		{ key: "1003", value: "1003" },
		{ key: "2001", value: "2001" },
	];
	const temperatureBands: ListItem[] = [
		{ key: "ambient", value: "常温" },
		{ key: "cool", value: "低温" },
		{ key: "frozen", value: "冷凍" },
	];

	const handleStopDragStart = (routeId: string, stopIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
		const stop = routes.find((r) => r.id === routeId)?.stops[stopIndex];
		if (!stop) return;
		setDraggedStop({ routeId, stopIndex });
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("text/plain", `${routeId}:${stopIndex}`);
	};

	const handleStopDragOver = (routeId: string, stopIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragOverCell({ routeId, stopIndex });
	};

	const handleStopDrop = (routeId: string, stopIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const data = event.dataTransfer.getData("text/plain");
		let source = draggedStop;
		if (data && data.includes(":")) {
			const [rid, idx] = data.split(":");
			source = { routeId: rid, stopIndex: Number(idx) };
		}
		if (!source) {
			setDragOverCell(null);
			return;
		}
		if (source.routeId === routeId && source.stopIndex === stopIndex) {
			setDragOverCell(null);
			setDraggedStop(null);
			return;
		}

		setRoutes((prev) => {
			const sourceRouteIndex = prev.findIndex((r) => r.id === source!.routeId);
			const targetRouteIndex = prev.findIndex((r) => r.id === routeId);
			if (sourceRouteIndex < 0 || targetRouteIndex < 0) return prev;
			const sourceStop = prev[sourceRouteIndex].stops[source.stopIndex];
			if (!sourceStop) return prev;

			const updated = prev.map((r) => ({ ...r, stops: [...r.stops] }));
			const targetStop = updated[targetRouteIndex].stops[stopIndex];
			updated[targetRouteIndex].stops[stopIndex] = sourceStop;
			updated[sourceRouteIndex].stops[source.stopIndex] = targetStop ?? null;
			return updated;
		});

		setDraggedStop(null);
		setDragOverCell(null);
	};

	const handleStopDragEnd = () => {
		setDraggedStop(null);
		setDragOverCell(null);
	};

	const toggleRoute = (id: string) => {
		setRoutes((prev) => prev.map((route) => (route.id === id ? { ...route, isActive: !route.isActive } : route)));
	};

	const maxStops = Math.max(...routes.map((route) => route.stops.length));

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form className="mt-2">
					<Row className="gx-2 gy-2 align-items-end">
						<Col md={4} xl={3}>
							<CommonGroupLabel required={true} label="運行日">
								<CommonInputBox id="operationDate" type="date" defaultValue={localDate} />
							</CommonGroupLabel>
						</Col>
						<Col md={4} xl={3}>
							<CommonGroupLabel required={true} label="倉庫">
								<CommonComboBox id="warehouse" list={warehouses} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={4} xl={3}>
							<CommonGroupLabel required={false} label="運送会社">
								<CommonComboBox id="carrier" list={carriers} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={4} xl={3}>
							<CommonGroupLabel required={false} label="車両番号">
								<CommonComboBox id="vehicleNo" list={vehicleNumbers} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={4} xl={3}>
							<CommonGroupLabel required={false} label="配送温度帯">
								<CommonComboBox id="temperatureBand" list={temperatureBands} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={4} xl={3} className="ms-auto"></Col>
					</Row>
				</Form>

				<div className="transport040-route-board">
					<div
						className="transport040-grid border rounded-3 shadow-sm"
						style={{ gridTemplateColumns: `180px repeat(${routes.length}, minmax(200px, 1fr))` }}
					>
						<div className="transport040-cell transport040-sticky bg-primary-subtle text-primary fw-semibold">
							配送ルート
						</div>
						{routes.map((route) => (
							<div key={route.id} className="transport040-cell transport040-route-head bg-primary-subtle">
								<div className="d-flex align-items-center gap-2">
									<span className="badge bg-primary text-white">{route.label}</span>
									<span className="fw-bold text-primary">{route.carNo}</span>
									<Form.Check
										type="switch"
										id={`route-toggle-${route.id}`}
										checked={route.isActive}
										onChange={() => toggleRoute(route.id)}
										className="ms-auto"
									/>
								</div>
							</div>
						))}

						<div className="transport040-cell transport040-sticky bg-body-secondary text-secondary fw-semibold">
							出荷指示合計
						</div>
						{routes.map((route) => (
							<div key={`${route.id}-totals`} className="transport040-cell bg-body-secondary">
								<div className="small text-muted">{route.totals.weight}</div>
								<div className="small text-muted">{route.totals.volume}</div>
								<div className="small text-muted">{route.totals.slips}</div>
							</div>
						))}

						{Array.from({ length: maxStops }).map((_, rowIndex) => (
							<Fragment key={`stop-row-${rowIndex}`}>
								<div className="transport040-cell transport040-sticky text-center fw-semibold bg-light">
									{rowIndex + 1}
								</div>
								{routes.map((route) => {
									const stop = route.stops[rowIndex];
									const isDragOver = dragOverCell?.routeId === route.id && dragOverCell.stopIndex === rowIndex;
									return (
										<div
											key={`${route.id}-stop-${rowIndex}`}
											className={`transport040-cell ${isDragOver ? "transport040-drag-over" : ""}`}
											onDragOver={handleStopDragOver(route.id, rowIndex)}
											onDrop={handleStopDrop(route.id, rowIndex)}
										>
											{stop ? (
												<div
													className={`transport040-stop transport040-${stop.tempClass}`}
													draggable
													onDragStart={handleStopDragStart(route.id, rowIndex)}
													onDragEnd={handleStopDragEnd}
												>
													<div className="d-flex align-items-center gap-2 mb-1">
														<span className="badge rounded-pill bg-info text-dark">{stop.tag}</span>
														<span className="fw-semibold text-primary">{stop.name}</span>
													</div>
													<div className="small text-muted d-flex gap-2">
														<span>{stop.weight}</span>
														<span>{stop.volume}</span>
														<span>{stop.slips}</span>
													</div>
												</div>
											) : null}
										</div>
									);
								})}
							</Fragment>
						))}
					</div>
				</div>
			</section>
			<section className="panel-block"></section>
			<style jsx>{`
				.transport040-route-board {
					overflow-x: auto;
					margin-top: 16px;
				}

				.transport040-grid {
					display: grid;
					grid-auto-rows: minmax(72px, auto);
					gap: 8px;
					padding: 10px;
					background: linear-gradient(180deg, #eef4ff 0%, #f7fbff 100%);
					border: 1px solid #cfe2ff;
				}

				.transport040-cell {
					background: #fff;
					border: 1px solid #cfe2ff;
					border-radius: 8px;
					padding: 10px;
					min-height: 72px;
				}

				.transport040-route-head {
					cursor: grab;
					user-select: none;
				}

				.transport040-drag-over {
					outline: 2px dashed #0d6efd;
					outline-offset: 0px;
				}

				.transport040-sticky {
					position: sticky;
					left: 0;
					z-index: 3;
				}

				.transport040-stop {
					border: 1px solid #d8e7ff;
					border-radius: 8px;
					padding: 8px;
					background: #f8fbff;
					height: 100%;
				}

				.transport040-ambient {
					background: #f5f9ff;
				}

				.transport040-cool {
					background: #e8f6ff;
				}

				.transport040-frozen {
					background: #e7f0ff;
				}
			`}</style>
		</Container>
	);
}
