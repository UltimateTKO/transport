"use client";

import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
					<span className="panel-block-title mb-0">荷札番号読み取り</span>
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
			</section>
		</Container>
	);
}
