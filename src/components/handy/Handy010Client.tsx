"use client";

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CommonComboBox, CommonGroupLabel, CommonInputBox } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type Handy010ClientProps = {
	localDate: string;
};

export default function Handy010Client({ localDate }: Handy010ClientProps) {
	void localDate;

	const [labelNo, setLabelNo] = useState("");
	const [scanCount, setScanCount] = useState(0);

	const handleScanConfirm = () => {
		if (!labelNo.trim()) return;
		setScanCount((prev) => prev + 1);
		setLabelNo("");
	};

	const handleComplete = () => {
		setLabelNo("");
		setScanCount(0);
	};

	return (
		<div className="handy-terminal-stage">
			<div className="handy-terminal-frame">
				<div className="handy-terminal-screen">
					<section className="">
						<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
							<span className="panel-block-title mb-0">荷札番号読み取り</span>
						</header>
						<Form className="handy-form">
							<div className="handy-form-body">
								<Row className="gx-1 gy-2">
									<Col md={12}>
										<CommonGroupLabel required label="荷札番号" style={{ gridTemplateColumns: "5rem minmax(0, 1fr)" }}>
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
											style={{ gridTemplateColumns: "5rem minmax(0, 1fr)" }}
										>
											<CommonInputBox id="scanCount" value={`${scanCount}個`} readOnly />
										</CommonGroupLabel>
									</Col>
								</Row>
							</div>
							<div className="handy-terminal-actions">
								<Button
									type="button"
									className="btn btn-primary px-4"
									onClick={handleScanConfirm}
									disabled={!labelNo.trim()}
								>
									決定
								</Button>
								<Button type="button" className="btn btn-outline-success px-4" onClick={handleComplete}>
									F3:完了
								</Button>
							</div>
						</Form>
					</section>
				</div>
			</div>
		</div>
	);
}
