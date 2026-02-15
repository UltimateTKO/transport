"use client";

import { Fragment, useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
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
	carKind: string;
	maxLoad: string;
	maxVolume: string;
	isFinal: boolean;
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

const formatNumber = (value: number) => value.toFixed(2).replace(/\.0+$/, "").replace(/\.$/, "");

const computeTotals = (stops: Array<RouteStop | null>) => {
	let weight = 0;
	let volume = 0;
	let slips = 0;

	stops.forEach((stop) => {
		if (!stop) return;
		const weightNum = parseFloat(stop.weight) || 0;
		const volumeNum = parseFloat(stop.volume) || 0;
		const slipsNum = parseInt(stop.slips, 10) || 0;
		weight += weightNum;
		volume += volumeNum;
		slips += slipsNum;
	});

	return {
		weight: `${formatNumber(weight)}Kg`,
		volume: `${formatNumber(volume)}m3`,
		slips: `${slips}伝票`,
	};
};

const initialRoutes: RoutePanel[] = [
	{
		id: "route-1",
		label: "茨城センター",
		carNo: "2232",
		carKind: "3トン平ボディ",
		maxLoad: "3,000Kg",
		maxVolume: "13m3",
		isFinal: true,
		totals: {
			weight: "110Kg",
			volume: "0.48m3",
			slips: "3伝票",
		},
		stops: [
			{
				id: "r1-1",
				tag: "CM",
				name: "七の庫",
				weight: "20Kg",
				volume: "0.12m3",
				slips: "1伝票",
				tempClass: "ambient",
			},
			{
				id: "r1-2",
				tag: "CM",
				name: "ジョティー 古河店",
				weight: "25Kg",
				volume: "0.18m3",
				slips: "1伝票",
				tempClass: "ambient",
			},
			{
				id: "r1-3",
				tag: "CM",
				name: "はのは",
				weight: "25Kg",
				volume: "0.18m3",
				slips: "1伝票",
				tempClass: "ambient",
			},
			null,
		],
	},
	{
		id: "route-2",
		label: "茨城センター",
		carNo: "2233",
		carKind: "2トン箱車",
		maxLoad: "2,000Kg",
		maxVolume: "10m3",
		isFinal: false,
		totals: {
			weight: "50Kg",
			volume: "1m3",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r2-1",
				tag: "CM",
				name: "ボストンズカフェ 古河店",
				weight: "50Kg",
				volume: "1m3",
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
		label: "茨城センター",
		carNo: "2234",
		carKind: "2トン冷蔵車",
		maxLoad: "1,500Kg",
		maxVolume: "9m3",
		isFinal: false,
		totals: {
			weight: "15Kg",
			volume: "1m3",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r3-1",
				tag: "CM",
				name: "丸満餃子",
				weight: "15Kg",
				volume: "1m3",
				slips: "1伝票",
				tempClass: "cool",
			},
			null,
			null,
			null,
		],
	},
	{
		id: "route-4",
		label: "関東運輸",
		carNo: "5222",
		carKind: "5トン冷凍車",
		maxLoad: "",
		maxVolume: "",
		isFinal: false,
		totals: {
			weight: "20Kg",
			volume: "1m3",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r4-1",
				tag: "CM",
				name: "ばんどう太郎 古河店",
				weight: "20Kg",
				volume: "1m3",
				slips: "1伝票",
				tempClass: "frozen",
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
	const [contextMenu, setContextMenu] = useState<{
		x: number;
		y: number;
		routeId: string;
		stopId: string;
	} | null>(null);

	// 営業所一覧
	const offices: ListItem[] = [
		{ key: "MIBRDC", value: "茨城センター" },
		{ key: "MFKSDC", value: "郡山センター" },
		{ key: "MGNMDC", value: "高崎センター" },
		{ key: "MTTGDC", value: "足利センター" },
		{ key: "MSTMDC", value: "岩槻センター" },
		{ key: "MTIBDC", value: "印西センター" },
		{ key: "OTKYBP", value: "東京神奈川委託先" },
	];
	const carriers: ListItem[] = [
		{ key: "Y0000", value: "関東運輸" },
		{ key: "Y1000", value: "茨城運送" },
		{ key: "Y1001", value: "谷原商運" },
	];
	const vehicleNumbers: ListItem[] = [
		{ key: "1001", value: "1001" },
		{ key: "1002", value: "1002" },
		{ key: "1003", value: "1003" },
		{ key: "2004", value: "2004" },
	];

	// ルートコースリスト
	const routeCourses: ListItem[] = [
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

	const handleStopDragStart = (routeId: string, stopIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
		const route = routes.find((r) => r.id === routeId);
		if (!route || route.isFinal) {
			event.preventDefault();
			return;
		}
		const stop = route.stops[stopIndex];
		if (!stop) return;
		setDraggedStop({ routeId, stopIndex });
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("text/plain", `${routeId}:${stopIndex}`);
	};

	const handleStopDragOver = (routeId: string, stopIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
		const targetRoute = routes.find((r) => r.id === routeId);
		if (!targetRoute || targetRoute.isFinal) return;
		event.preventDefault();
		setDragOverCell({ routeId, stopIndex });
	};

	const handleStopDrop = (routeId: string, stopIndex: number) => (event: React.DragEvent<HTMLDivElement>) => {
		const targetRoute = routes.find((r) => r.id === routeId);
		if (!targetRoute || targetRoute.isFinal) {
			setDragOverCell(null);
			return;
		}
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
		const sourceRoute = routes.find((r) => r.id === source.routeId);
		if (!sourceRoute || sourceRoute.isFinal) {
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

	const handleStopContextMenu = (routeId: string, stopId: string) => (event: React.MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setContextMenu({ x: event.clientX, y: event.clientY, routeId, stopId });
	};

	const toggleRoute = (id: string) => {
		setRoutes((prev) => prev.map((route) => (route.id === id ? { ...route, isFinal: !route.isFinal } : route)));
	};

	const activateAllRoutes = () => {
		setRoutes((prev) => prev.map((route) => ({ ...route, isFinal: true })));
	};

	const mapUrl =
		"https://www.google.com/maps/d/u/0/edit?hl=ja&mid=1KnslBXgeIdizdEWo6khCbAQOubMrNCc&ll=36.19108139248848%2C139.72453475&z=15";

	const handleMapClick = () => {
		const popup = window.open(mapUrl, "transport040-map", "popup=yes,width=1200,height=800,noopener,noreferrer");
		if (popup) {
			popup.opener = null;
		}
	};

	const maxStops = Math.max(...routes.map((route) => route.stops.length));
	const routesWithTotals = routes.map((route) => ({ ...route, totals: computeTotals(route.stops) }));

	useEffect(() => {
		if (!contextMenu) return;
		const closeMenu = () => setContextMenu(null);
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setContextMenu(null);
			}
		};
		window.addEventListener("click", closeMenu);
		window.addEventListener("contextmenu", closeMenu);
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("click", closeMenu);
			window.removeEventListener("contextmenu", closeMenu);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [contextMenu]);

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center justify-content-end gap-2">
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
						<Col md={12} xl={4}>
							<CommonGroupLabel required={true} label="営業所">
								<CommonComboBox
									id="office"
									list={offices.filter((office) => office.key.startsWith("M"))}
									showKey={true}
									defaultValue="MIBRDC"
								/>
							</CommonGroupLabel>
						</Col>
						<Col md={12} xl={4}>
							<CommonGroupLabel required={true} label="ルートコース">
								<CommonComboBox
									id="routeCourse"
									list={routeCourses.filter((course) => course.key.startsWith("RIBR0"))}
									defaultValue="RIBR001"
									showKey={true}
								/>
							</CommonGroupLabel>
						</Col>
						<Col md={12} xl={4}>
							<CommonGroupLabel required={false} label="運送会社">
								<CommonComboBox id="carrier" list={carriers} showKey={false} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} xl={3}>
							<CommonGroupLabel required={false} label="車両番号">
								<CommonComboBox id="vehicleNo" list={vehicleNumbers} showKey={false} />
							</CommonGroupLabel>
						</Col>
					</Row>

					<Row className="mt-3">
						<Col md={12} className="d-flex justify-content-center gap-2">
							<Button className="btn btn-gradient px-3">検索</Button>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
				<Row className="mt-3">
					<Col md={3} className="d-flex justify-content-start gap-2">
						<Button className="btn btn-gradient px-3" onClick={activateAllRoutes}>
							全体配車確定
						</Button>
						<Button className="btn btn-gradient px-3" onClick={handleMapClick}>
							マップ
						</Button>
					</Col>
					<Col md={9} className="d-flex flex-column align-items-end gap-1">
						<div className="d-flex justify-content-end gap-2">
							{/* 温度帯の説明 */}
							<span className="small text-muted">温度帯</span>
							<span className="small transport040-ambient">常温：黒字</span>
							<span className="small transport040-cool">クール：青字</span>
							<span className="small transport040-frozen">冷凍：橙字</span>
							<span className="small transport040-ultrafrozen">超低温：紫字</span>
						</div>
						<span className="small text-muted">ラベル右クリックで処理を選択</span>
					</Col>
				</Row>

				<div className="transport040-route-board">
					<div
						className="transport040-grid border rounded-3 shadow-sm"
						style={{ gridTemplateColumns: `180px repeat(${routes.length}, minmax(200px, 1fr))` }}
					>
						<div className="transport040-cell transport040-sticky bg-primary-subtle text-primary fw-semibold">
							配送ルート
						</div>
						{routesWithTotals.map((route) => (
							<div key={route.id} className="transport040-cell transport040-route-head bg-primary-subtle">
								<Row className="d-flex align-items-start">
									<Col xs="9" className="text-primary">
										<div className="badge bg-primary text-white">{route.label}</div>
										<div className="small">車番　　:{route.carNo}</div>
										<div className="small">車種　　: {route.carKind}</div>
										<div className="small">{route.maxLoad == "" ? "" : `最大重量: ${route.maxLoad}`}</div>
										<div className="small">{route.maxVolume == "" ? "" : `最大容積: ${route.maxVolume}`}</div>
									</Col>
									<Col xs="3" className="d-flex align-items-center">
										<Form.Check
											type="switch"
											id={`route-toggle-${route.id}`}
											checked={route.isFinal}
											onChange={() => toggleRoute(route.id)}
											className="ms-auto"
										/>
									</Col>
								</Row>
							</div>
						))}

						<div className="transport040-cell transport040-sticky bg-body-secondary text-secondary fw-semibold">
							出荷指示合計
						</div>
						{routesWithTotals.map((route) => (
							<div key={`${route.id}-totals`} className="transport040-cell bg-body-secondary">
								<div className="small text-muted text-end">{route.totals.weight}</div>
								<div className="small text-muted text-end">{route.totals.volume}</div>
								<div className="small text-muted text-end">{route.totals.slips}</div>
							</div>
						))}

						{Array.from({ length: maxStops }).map((_, rowIndex) => (
							<Fragment key={`stop-row-${rowIndex}`}>
								<div className="transport040-cell transport040-sticky text-center fw-semibold bg-light">
									{rowIndex + 1}
								</div>
								{routesWithTotals.map((route) => {
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
													className={`transport040-stop`}
													draggable={!route.isFinal}
													onDragStart={handleStopDragStart(route.id, rowIndex)}
													onDragEnd={handleStopDragEnd}
													onContextMenu={handleStopContextMenu(route.id, stop.id)}
												>
													<div className="d-flex align-items-center gap-2 mb-1">
														<span className={`fw-semibold transport040-${stop.tempClass}`}>{stop.name}</span>
													</div>
													<div className="small text-muted d-flex flex-column gap-1">
														{/* すべて右寄せにする */}
														<span className="text-end">{stop.weight}</span>
														<span className="text-end">{stop.volume}</span>
														<span className="text-end">{stop.slips}</span>
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
			{contextMenu ? (
				<div
					className="transport040-context-layer"
					onClick={() => setContextMenu(null)}
					onContextMenu={(event) => event.preventDefault()}
				>
					<div className="transport040-context-menu" style={{ top: contextMenu.y, left: contextMenu.x }} role="menu">
						<button
							type="button"
							className="btn btn-sm w-100 text-start"
							onClick={(event) => {
								event.stopPropagation();
								setContextMenu(null);
							}}
						>
							配送完了
						</button>
						<button
							type="button"
							className="btn btn-sm w-100 text-start"
							onClick={(event) => {
								event.stopPropagation();
								setContextMenu(null);
							}}
						>
							受取拒否
						</button>
						<button
							type="button"
							className="btn btn-sm w-100 text-start"
							onClick={(event) => {
								event.stopPropagation();
								setContextMenu(null);
							}}
						>
							不在再送
						</button>
					</div>
				</div>
			) : null}
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
					color: #333333;
				}

				.transport040-cool {
					color: #00aaff;
				}

				.transport040-frozen {
					color: #ffaa00;
				}

				.transport040-ultrafrozen {
					color: #5500ff;
				}

				.transport040-context-layer {
					position: fixed;
					inset: 0;
					z-index: 1080;
					pointer-events: auto;
				}

				.transport040-context-menu {
					position: absolute;
					min-width: 160px;
					background: #ffffff;
					border: 1px solid #cfe2ff;
					border-radius: 8px;
					box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
					padding: 6px;
					pointer-events: auto;
				}

				.transport040-context-menu button {
					border: none;
					background: transparent;
					padding: 8px 10px;
					border-radius: 6px;
					color: #0d6efd;
					font-weight: 600;
				}

				.transport040-context-menu button + button {
					margin-top: 4px;
				}

				.transport040-context-menu button:hover,
				.transport040-context-menu button:focus {
					background: #e7f1ff;
					outline: none;
				}
			`}</style>
		</Container>
	);
}
