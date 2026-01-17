"use client";

import { Fragment, useState } from "react";
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

const initialRoutes: RoutePanel[] = [
	{
		id: "route-1",
		label: "南九州物流センター",
		carNo: "1001",
		carKind: "3トン平ボディ",
		maxLoad: "3,000Kg",
		maxVolume: "13㎥",
		isFinal: true,
		totals: {
			weight: "30Kg",
			volume: "15㎥",
			slips: "3伝票",
		},
		stops: [
			{
				id: "r1-1",
				tag: "CM",
				name: "ホームプラザナフコ 谷山店",
				weight: "10Kg",
				volume: "5㎥",
				slips: "1伝票",
				tempClass: "ambient",
			},
			{
				id: "r1-2",
				tag: "CM",
				name: "コメダ珈琲店 鹿児島七ツ島店",
				weight: "10Kg",
				volume: "3㎥",
				slips: "1伝票",
				tempClass: "ambient",
			},
			{
				id: "r1-3",
				tag: "CM",
				name: "喫茶店ひまわり・占い",
				weight: "10Kg",
				volume: "2㎥",
				slips: "1伝票",
				tempClass: "ambient",
			},
			null,
		],
	},
	{
		id: "route-2",
		label: "南九州物流センター",
		carNo: "1002",
		carKind: "2トン箱車",
		maxLoad: "2,000Kg",
		maxVolume: "10㎥",
		isFinal: false,
		totals: {
			weight: "40Kg",
			volume: "5㎥",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r2-1",
				tag: "CM",
				name: "平川マリーナマルシェ",
				weight: "40Kg",
				volume: "4㎥",
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
		label: "南九州物流センター",
		carNo: "1003",
		carKind: "2トン冷蔵車",
		maxLoad: "1,500Kg",
		maxVolume: "9㎥",
		isFinal: false,
		totals: {
			weight: "15Kg",
			volume: "5㎥",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r3-1",
				tag: "CM",
				name: "サンキュー和田店",
				weight: "15Kg",
				volume: "4㎥",
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
		label: "鹿児島総合",
		carNo: "2004",
		carKind: "5トン冷凍車",
		maxLoad: "4,500Kg",
		maxVolume: "30㎥",
		isFinal: false,
		totals: {
			weight: "1Kg",
			volume: "5㎥",
			slips: "1伝票",
		},
		stops: [
			{
				id: "r4-1",
				tag: "CN",
				name: "業務スーパー谷山店",
				weight: "1Kg",
				volume: "5㎥",
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

	// 営業所一覧
	const offices: ListItem[] = [
		{ key: "FOKFKC", value: "福岡かすやINC" },
		{ key: "FOKK2C", value: "福岡かすや第2センター" },
		{ key: "FOKFMC", value: "二又瀬物流センター" },
		{ key: "SAGTSE", value: "鳥栖営業所" },
		{ key: "KGSMKC", value: "南九州物流センター" },
		{ key: "KGSKMC", value: "鹿児島南センター" },
		{ key: "KGSKUE", value: "川内営業所" },
		{ key: "KGSKKE", value: "加治木営業所" },
		{ key: "KGSHOE", value: "日置営業所" },
		{ key: "MYZMJE", value: "都城営業所" },
		{ key: "MYZMJF", value: "都城フローズンセンター" },
		{ key: "OITITK", value: "大分委託先" },
	];
	const carriers: ListItem[] = [
		{ key: "Y0000", value: "園田陸運 株式会社" },
		{ key: "Y1000", value: "南九州トランスポート" },
		{ key: "Y1001", value: "九州第一運輸" },
		{ key: "Y1002", value: "福岡貨物運送株式会社" },
		{ key: "Y1003", value: "鹿児島総合運送" },
	];
	const vehicleNumbers: ListItem[] = [
		{ key: "1001", value: "1001" },
		{ key: "1002", value: "1002" },
		{ key: "1003", value: "1003" },
		{ key: "2004", value: "2004" },
	];

	// ルートコースリスト
	const routeCourses: ListItem[] = [
		{ key: "MTKSY001", value: "かすや-二又瀬" },
		{ key: "MTKSY002", value: "かすや-鳥栖" },
		{ key: "MTKSY003", value: "かすや-南九州" },
		{ key: "MTKSY004", value: "かすや-都城" },
		{ key: "MTKSY005", value: "かすや-都城F" },
		{ key: "MTKSY006", value: "かすや-かすや第2" },
		{ key: "MTKSY007", value: "かすや-大分" },

		{ key: "CSKSY001", value: "かすやコース1" },
		{ key: "CSKSY002", value: "かすやコース2" },
		{ key: "CSKSY003", value: "かすやコース3" },

		{ key: "CSKSYSECOND001", value: "かすや第2コース1" },
		{ key: "CSKSYSECOND002", value: "かすや第2コース2" },
		{ key: "CSKSYSECOND003", value: "かすや第2コース3" },

		{ key: "CSFMS001", value: "二又瀬コース1" },
		{ key: "CSFMS002", value: "二又瀬コース1" },
		{ key: "CSFMS003", value: "二又瀬コース1" },

		{ key: "CSTOS001", value: "鳥栖コース1" },
		{ key: "CSTOS002", value: "鳥栖コース2" },
		{ key: "CSTOS003", value: "鳥栖コース3" },

		{ key: "MTMKS001", value: "南九州-鹿児島南" },
		{ key: "MTMKS002", value: "南九州-川内" },
		{ key: "MTMKS003", value: "南九州-加治木" },
		{ key: "MTMKS004", value: "南九州-日置" },

		{ key: "CSMKS001", value: "南九州コース1" },
		{ key: "CSMKS002", value: "南九州コース2" },
		{ key: "CSMKS003", value: "南九州コース3" },

		{ key: "CSKGS001", value: "鹿児島南コース1" },
		{ key: "CSKGS002", value: "鹿児島南コース2" },
		{ key: "CSKGS003", value: "鹿児島南コース3" },

		{ key: "CSKCH001", value: "川内コース1" },
		{ key: "CSKCH002", value: "川内コース2" },
		{ key: "CSKCH003", value: "川内コース3" },

		{ key: "CSKKJK001", value: "加治木コース1" },
		{ key: "CSKKJK002", value: "加治木コース2" },
		{ key: "CSKKJK003", value: "加治木コース3" },

		{ key: "KGSHOEC001", value: "日置コース1" },
		{ key: "KGSHOEC002", value: "日置コース2" },

		{ key: "CSMNJ001", value: "都城コース1" },
		{ key: "CSMNJ002", value: "都城コース2" },
		{ key: "CSMNJ003", value: "都城コース3" },

		{ key: "CSMNJF001", value: "都城Fコース1" },
		{ key: "CSMNJF002", value: "都城Fコース2" },
		{ key: "CSMNJF003", value: "都城Fコース3" },

		// { key: "FOKFMCK001", value: "二又瀬-かすや" },
		// { key: "SAGTKAS001", value: "鳥栖-かすや" },
		// { key: "KGSMKCK005", value: "南九州-かすや" },
		// { key: "MYZMJEK001", value: "都城-かすや" },
		// { key: "MYZMJFK001", value: "都城F-かすや" },
		// { key: "FOKK2CK001", value: "かすや第2-かすや" },
		// { key: "OITITKK001", value: "大分-かすや" },

		// { key: "KGSKMCK001", value: "鹿児島南-南九州" },
		// { key: "KGSKUEK001", value: "川内-南九州" },
		// { key: "KGSKKEK001", value: "加治木-南九州" },
		// { key: "KGSHOEK001", value: "日置-南九州" },
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

	const toggleRoute = (id: string) => {
		setRoutes((prev) => prev.map((route) => (route.id === id ? { ...route, isFinal: !route.isFinal } : route)));
	};

	const activateAllRoutes = () => {
		setRoutes((prev) => prev.map((route) => ({ ...route, isFinal: true })));
	};

	const mapUrl =
		"https://www.google.com/maps/d/u/0/edit?mid=1z3uHVCAoh7JqeNNRr2HovTmQD1SU-6Y&hl=ja&ll=31.490663202239276%2C130.53182827145432&z=13";

	const handleMapClick = () => {
		const popup = window.open(mapUrl, "transport040-map", "popup=yes,width=1200,height=800,noopener,noreferrer");
		if (popup) {
			popup.opener = null;
		}
	};

	const maxStops = Math.max(...routes.map((route) => route.stops.length));

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
								<CommonComboBox id="office" list={offices} showKey={true} defaultValue="KGSMKC" readOnly />
							</CommonGroupLabel>
						</Col>
						<Col md={12} xl={4}>
							<CommonGroupLabel required={true} label="ルートコース">
								<CommonComboBox
									id="routeCourse"
									list={routeCourses.filter((course) => course.key.includes("CS") && course.key.includes("MKS"))}
									defaultValue="CSMKS001"
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
					<Col md={6} className="d-flex justify-content-start gap-2">
						<Button className="btn btn-gradient px-3" onClick={activateAllRoutes}>
							全体配車確定
						</Button>
						<Button className="btn btn-gradient px-3" onClick={handleMapClick}>
							マップ
						</Button>
					</Col>
					<Col md={6} className="d-flex justify-content-end gap-2">
						{/* 温度帯の説明 */}
						<span className="small text-muted">温度帯</span>
						<span className="small transport040-ambient">常温：黒字</span>
						<span className="small transport040-cool">クール：青字</span>
						<span className="small transport040-frozen">冷凍：橙字</span>
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
						{routes.map((route) => (
							<div key={route.id} className="transport040-cell transport040-route-head bg-primary-subtle">
								<Row className="d-flex align-items-start">
									<Col xs="9" className="text-primary">
										<div className="badge bg-primary text-white">{route.label}</div>
										<div className="small">車番　　:{route.carNo}</div>
										<div className="small">車種　　: {route.carKind}</div>
										<div className="small">最大重量: {route.maxLoad}</div>
										<div className="small">最大容積: {route.maxVolume}</div>
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
						{routes.map((route) => (
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
													className={`transport040-stop`}
													draggable={!route.isFinal}
													onDragStart={handleStopDragStart(route.id, rowIndex)}
													onDragEnd={handleStopDragEnd}
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
			`}</style>
		</Container>
	);
}
