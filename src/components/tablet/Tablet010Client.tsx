"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
	CommonComboBox,
	CommonComboBoxInputable,
	CommonGroupLabel,
	CommonInputBox,
} from "@/components/CommonComponent";

type Tablet010ClientProps = {
	deliveryDateTime: string;
};

type ScreenMode = "form" | "signature";

export default function Tablet010Client({ deliveryDateTime }: Tablet010ClientProps) {
	const destinationList = useMemo(() => [{ key: "D001", value: "オーズカンパニー" }], []);

	const receiverList = useMemo(
		() => [
			{ key: "A1001", value: "宮里　元" },
			{ key: "A1002", value: "仲村渠　裕也" },
			{ key: "A1003", value: "阿波根　耕哉" },
		],
		[],
	);

	const [mode, setMode] = useState<ScreenMode>("form");
	const [destination, setDestination] = useState(() => destinationList[0]?.key ?? "");
	const [receiver, setReceiver] = useState("");
	const [message, setMessage] = useState("タブレット上で納品内容を確認してください。");
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);

	const vehicleNo = "2233";

	const handleReceive = () => {
		if (!destination || !receiver) {
			setMessage("納品先と受領者を選択してください。");
			return;
		}
		setMessage("受領内容を記録しました。サインを取得してください。");
	};

	const handleSign = () => {
		setMode("signature");
		setMessage("サインを手書きで入力してください。");
	};

	const handleBack = () => {
		setMode("form");
		setMessage("入力内容を確認してください。");
	};

	const clearSignature = () => {
		const canvas = canvasRef.current;
		const ctx = contextRef.current;
		if (!canvas || !ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	useEffect(() => {
		if (mode !== "signature") return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);
			ctx.lineWidth = 2.8;
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.strokeStyle = "#111";
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);
		contextRef.current = ctx;

		let drawing = false;

		const getPos = (event: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			return {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
			};
		};

		const handlePointerDown = (event: PointerEvent) => {
			event.preventDefault();
			drawing = true;
			canvas.setPointerCapture(event.pointerId);
			const { x, y } = getPos(event);
			ctx.beginPath();
			ctx.moveTo(x, y);
		};

		const handlePointerMove = (event: PointerEvent) => {
			if (!drawing) return;
			const { x, y } = getPos(event);
			ctx.lineTo(x, y);
			ctx.stroke();
		};

		const handlePointerUp = (event: PointerEvent) => {
			drawing = false;
			canvas.releasePointerCapture(event.pointerId);
			ctx.closePath();
		};

		canvas.addEventListener("pointerdown", handlePointerDown);
		canvas.addEventListener("pointermove", handlePointerMove);
		canvas.addEventListener("pointerup", handlePointerUp);
		canvas.addEventListener("pointerleave", handlePointerUp);

		return () => {
			canvas.removeEventListener("pointerdown", handlePointerDown);
			canvas.removeEventListener("pointermove", handlePointerMove);
			canvas.removeEventListener("pointerup", handlePointerUp);
			canvas.removeEventListener("pointerleave", handlePointerUp);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [mode]);

	return (
		<div className="tablet-stage">
			<div className="tablet-frame">
				<div className="tablet-screen">
					<section className="panel-block tablet-panel">
						{mode === "form" ? (
							<Form className="tablet-form">
								<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
									<div>
										<p className="panel-block-title mb-1">tablet010 受領</p>
										<p className="text-muted small mb-0">タブレット内で受領情報を確認してください。</p>
									</div>
									<div className="d-flex align-items-center gap-2 text-muted small">
										<span className="badge bg-light text-dark border">サイン待ち</span>
										<span className="badge bg-primary-subtle text-primary border border-primary-subtle">
											オンライン
										</span>
									</div>
								</header>

								<div className="tablet-fields">
									<CommonGroupLabel required label="納品先">
										<CommonComboBox
											id="delivery-place"
											list={destinationList}
											showKey
											value={destination}
											onChange={(e) => setDestination(e.target.value)}
										/>
									</CommonGroupLabel>

									<CommonGroupLabel required={false} label="納品日時">
										<CommonInputBox id="delivery-datetime" value={deliveryDateTime} readOnly />
									</CommonGroupLabel>

									<CommonGroupLabel required={false} label="車番">
										<CommonInputBox id="vehicle-no" value={vehicleNo} readOnly />
									</CommonGroupLabel>

									<CommonGroupLabel required label="受領者選択">
										<CommonComboBoxInputable
											id="receiver"
											list={receiverList}
											showKey
											value={receiver}
											onChange={(e) => setReceiver(e.target.value)}
										/>
									</CommonGroupLabel>
								</div>

								<div className="text-muted small">{message}</div>

								<div className="tablet-actions">
									<Button variant="primary" className="px-4" onClick={handleReceive}>
										受領
									</Button>
									<Button variant="outline-dark" className="px-4" onClick={handleSign}>
										サイン
									</Button>
								</div>
							</Form>
						) : (
							<div className="tablet-signature">
								<header className="panel-block-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
									<div>
										<p className="panel-block-title mb-1">受領サイン入力</p>
										<p className="text-muted small mb-0">タブレットの枠内で手書き入力ができます。</p>
									</div>
									<div className="d-flex flex-wrap gap-2 small">
										<span className="badge bg-secondary-subtle text-secondary-emphasis border">
											受領者: {receiver || "未選択"}
										</span>
										<span className="badge bg-light text-dark border">納品先: {destination || "未選択"}</span>
									</div>
								</header>

								<div className="tablet-summary small text-muted">
									<span>納品日時: {deliveryDateTime}</span>
									<span>車番: {vehicleNo}</span>
								</div>

								<div className="signature-board">
									<div className="signature-board-label">サイン欄</div>
									<canvas ref={canvasRef} className="signature-canvas" />
								</div>

								<div className="tablet-actions">
									<Button variant="outline-secondary" className="px-3" onClick={clearSignature}>
										クリア
									</Button>
									<Button variant="secondary" className="px-3" onClick={handleBack}>
										入力に戻る
									</Button>
								</div>
							</div>
						)}
					</section>
				</div>
			</div>
		</div>
	);
}
