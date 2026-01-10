"use client";

import { useMemo, useState } from "react";
import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap";
import { CommonComboBox, CommonGroupLabel, CommonInputBox, RequiredMark } from "@/components/CommonComponent";
import Result001Client from "@/components/result/Result001Client";
import { buildResult001Fixture } from "@/app/panels/result/result001Fixtures";

type DispatchsPanelProps = {
	groupId?: string;
	childId?: string;
};

export default function Dispatch002Client(props: DispatchsPanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const [showResultModal, setShowResultModal] = useState(false);
	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
	const offices = [
		{ key: "1", value: "営業１" },
		{ key: "2", value: "営業２" },
	];
	const assignees = [{ key: "ADMIN", value: "管理ユーザー" }];
	// 配車明細(ダミーデータ)
	const dispatchDetails = [
		{
			// 配車No
			id: 1,
			// 配車明細No
			detailId: 1,
			// 車輛番号
			carNumber: "",
			// 車輛種別1
			vehicleType1: "ドライウィング",
			// 車輛種別2
			vehicleType2: "4.0t",
			// 得意先
			client: "得意先1",
			loadDate: "2025/10/25",
			arrivalDate: "2025/10/26",
			loadSite: "東京 DC",
			arrivalSite: "仙台 HPC",
			vehicleCount: 2,
			company: "一次輸送株式会社",
			secondaryCompany: "二次輸送株式会社",
			carNumbers: ["001", "002"],
			fare: "¥120,000",
			status: "配車未確定",
		},
		{
			// 配車No
			id: 1,
			// 配車明細No
			detailId: 2,
			// 車輛番号
			carNumber: "",
			// 車輛種別1
			vehicleType1: "ドライウィング",
			// 車輛種別2
			vehicleType2: "4.0t",
			// 得意先
			client: "得意先2",
			loadDate: "2025/10/25",
			arrivalDate: "2025/10/26",
			loadSite: "東京 DC",
			arrivalSite: "仙台 HPC",
			vehicleCount: 1,
			company: "一次輸送株式会社",
			secondaryCompany: "二次輸送株式会社",
			carNumbers: ["003"],
			fare: "¥120,000",
			status: "配車未確定",
		},
	];

	const resultProps = useMemo(() => buildResult001Fixture(), []);

	const openResultModal = () => setShowResultModal(true);
	const closeResultModal = () => setShowResultModal(false);

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={true} label={"運行日"}>
								<CommonInputBox id="tsumiDate" type="date" defaultValue={localDate} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={true} label={"管轄営業所"}>
								<CommonComboBox id="officeInCharge" list={offices} showKey={false} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label={"担当者"}>
								<CommonComboBox id="tantosha" list={assignees} showKey={false} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label={"受注No"}>
								<CommonInputBox id="orderNo" defaultValue={""} placeholder={"受注番号を入力"} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label={"配車No"}>
								<CommonInputBox id="dispatchNo" defaultValue={""} placeholder={"管理番号を入力"} />
							</CommonGroupLabel>
						</Col>

						<Col md={12} lg={4} xxl={3}>
							<div className="d-flex justify-content-end gap-2 mt-3 col-12">
								<Button className="btn btn-gradient px-3">検索</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</section>

			<section className="panel-block">
				<div className="d-flex justify-content-start gap-2 mb-3">
					<Button className="btn btn-gradient px-3">輸送依頼書</Button>
					<Button className="btn btn-gradient px-3">車番連絡票</Button>
					<Button className="btn btn-gradient px-3">運行予定表</Button>
					<Button className="btn btn-gradient px-3" onClick={openResultModal}>
						配送完了
					</Button>
				</div>
				<div className="row g-3 row-cols-1 row-cols-lg-2">
					{dispatchDetails.map((row) => (
						<div key={row.detailId}>
							<article className="panel-card h-100">
								<header className="panel-card-header px-3 py-2">
									<Row className="d-flex flex-wrap align-items-center gap-3">
										<Col md={1}>
											<Form.Check type="checkbox" id={`dispatch-select-${row.detailId}`} />
										</Col>
										<Col md={6}>
											{/* 車輛種別1 */}
											<span className="fw-semibold">
												{row.vehicleType1}：{row.vehicleType2}
											</span>
										</Col>
										<Col md={3}>
											{/* ステータス */}
											<span className="badge bg-secondary">{row.status}</span>
										</Col>
										<Col md={1}></Col>
										<Col md={5}>
											{/* 車輛番号入力ボックス */}
											<CommonInputBox id={`carNumber-${row.detailId}`} defaultValue={row.carNumber} placeholder={"車番入力"} />
										</Col>
										<Col md={4}>
											<div className="ms-auto d-flex align-items-center gap-2">
												<span className="panel-label mb-0">運賃</span>
												{/* 運賃入力ボックス */}
												<CommonInputBox
													id={`fare-${row.detailId}`}
													defaultValue={row.fare}
													placeholder={"運賃入力"}
													type="number"
													textAlign="right"
												/>
											</div>
										</Col>
									</Row>
								</header>
								<div className="panel-card-body">
									<div className="panel-form-row">
										<span className="panel-label">得意先</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<span>{row.client}</span>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">運行日</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<span>{row.loadDate}</span>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">積地 / 着地</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<span>{row.loadSite}</span>
											<span className="text-muted">→</span>
											<span>宇都宮DC</span>
											<span className="text-muted">→</span>
											<span>{row.arrivalSite}</span>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">車輌数</span>
										<span>{row.vehicleCount}</span>
									</div>
									{/* 自車or庸車のラジオボタン */}
									<div className="panel-form-row">
										<span className="panel-label">車輌区分</span>
										<div className="d-flex flex-wrap align-items-center gap-3">
											<Form.Check type="radio" label="自車" name={`vehicleType-${row.id}`} />
											<Form.Check type="radio" label="庸車" name={`vehicleType-${row.id}`} />
										</div>
									</div>

									{/*  */}

									{/* 輸送会社 */}
									<div className="panel-form-row">
										<span className="panel-label">一次</span>
										<span>{row.company}</span>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">二次会社</span>
										<span>{row.secondaryCompany}</span>
									</div>
								</div>
							</article>
						</div>
					))}
				</div>
			</section>

			<Modal show={showResultModal} onHide={closeResultModal} size="xl" fullscreen="lg-down" scrollable>
				<Modal.Header closeButton className="border-0">
					<Modal.Title>配送完了</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light">
					<Result001Client
						localDate={resultProps.localDate}
						driverList={resultProps.driverList}
						vehicleList={resultProps.vehicleList}
						completionReasons={resultProps.completionReasons}
						paymentMethods={resultProps.paymentMethods}
						stopSummaries={resultProps.stopSummaries}
					/>
				</Modal.Body>
				<Modal.Footer className="border-0 pt-0">
					<Button variant="secondary" onClick={closeResultModal}>
						閉じる
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}
