"use client";

import { useMemo, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";

type ActivityLog = {
	id: number;
	title: string;
	detail: string;
};

export default function Salinv002Client() {
	const [dailyTime, setDailyTime] = useState("09:00");
	const [lastImmediateRun, setLastImmediateRun] = useState<string | null>(null);

	const formatDateTime = (date: Date) => {
		return new Intl.DateTimeFormat("ja-JP", {
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	const nextDailyExecution = useMemo(() => {
		const [hour, minute] = dailyTime.split(":").map(Number);
		if (Number.isNaN(hour) || Number.isNaN(minute)) {
			return "時間未設定";
		}
		const now = new Date();
		const next = new Date();
		next.setHours(hour);
		next.setMinutes(minute);
		next.setSeconds(0, 0);
		if (next <= now) {
			next.setDate(next.getDate() + 1);
		}
		return `${formatDateTime(next)} 頃`;
	}, [dailyTime]);

	const handleImmediateRun = () => {
		const now = new Date();
		const timestamp = formatDateTime(now);
		setLastImmediateRun(timestamp);
	};

	return (
		<Container fluid className="py-3">
			<Row className="justify-content-center">
				<Col xl={10} xxl={8}>
					<div className="panel-block p-3">
						<Alert variant={lastImmediateRun ?? "未実行"} className="mb-4">
							<span>最終記録</span>&nbsp;: &nbsp;
							{lastImmediateRun ?? "未実行"}
						</Alert>

						<Row className="g-3">
							<Col lg={6}>
								<Card className="shadow-sm border-0 h-100">
									<Card.Body className="d-flex flex-column gap-3">
										<div>
											<p className="fw-semibold mb-1">即時実行</p>
										</div>
										<Button className="btn btn-gradient w-100" onClick={handleImmediateRun}>
											即時実行
										</Button>
									</Card.Body>
								</Card>
							</Col>
							<Col lg={6}>
								<Card className="shadow-sm border-0 h-100">
									<Card.Body className="d-flex flex-column gap-3">
										<div>
											<p className="fw-semibold mb-1">日次スケジュール</p>
										</div>
										<Form>
											<Form.Label className="small text-muted mb-1">実行時刻</Form.Label>
											<Form.Control type="time" value={dailyTime} size="sm" onChange={(e) => setDailyTime(e.target.value)} />
										</Form>
										<Button className="btn btn-gradient w-100" onClick={(e) => setDailyTime(dailyTime)}>
											スケジュール設定
										</Button>
										<Button className="btn btn-gradient w-100">スケジュール停止</Button>
										<div className="d-flex align-items-center justify-content-between text-muted small">
											<span>次回予定</span>
											<span className="fw-semibold text-primary">{nextDailyExecution}</span>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
