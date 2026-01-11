"use client";

import { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, CommonInputBox } from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type HandyNoInfo = { no: string; itemName: string; quantity: number };

type Handy020ClientProps = {
	localDate: string;
};

type VehicleForm = {
	id: number;
	vehicleNumber: string;
	inquiryNos: { value: string; itemName: string; quantity: string }[];
};

export default function Handy020Client({ localDate }: Handy020ClientProps) {
	const handyNoInfos: HandyNoInfo[] = [
		{ no: "1234567890", itemName: "商品A", quantity: 10 },
		{ no: "0987654321", itemName: "商品B", quantity: 5 },
		{ no: "1122334455", itemName: "商品C", quantity: 20 },
		{ no: "5566778899", itemName: "商品D", quantity: 15 },
	];

	const officeList: ListItem[] = [
		{ key: "0001", value: "本社" },
		{ key: "0002", value: "南九州物流センター" },
		{ key: "0003", value: "鹿児島南センター" },
		{ key: "0004", value: "川内営業所" },
		{ key: "0005", value: "加治木営業所" },
		{ key: "0006", value: "日置営業所" },
		{ key: "0007", value: "都城営業所" },
		{ key: "0008", value: "都城フローズンセンター" },
		{ key: "0009", value: "二又瀬物流センター" },
		{ key: "0010", value: "福岡かすやINC" },
		{ key: "0011", value: "鳥栖営業所" },
		{ key: "0012", value: "福岡かすや第2センター" },
	];

	const vehicleNumberList: ListItem[] = [
		{ key: "1", value: "1234" },
		{ key: "2", value: "5678" },
		{ key: "3", value: "9012" },
	];

	const defaultVehicleNumber = vehicleNumberList[0]?.key ?? "";

	const [vehicleForms, setVehicleForms] = useState<VehicleForm[]>([
		{ id: 0, vehicleNumber: defaultVehicleNumber, inquiryNos: [{ value: "", itemName: "", quantity: "" }] },
	]);

	const applyHandyNoInfo = (handyNo: string) => {
		const hit = handyNoInfos.find((info) => info.no === handyNo.trim());
		return {
			itemName: hit?.itemName ?? "",
			quantity: hit ? String(hit.quantity) : "",
		};
	};

	const handleAddVehicleForm = () => {
		setVehicleForms((prev) => [
			...prev,
			{ id: prev.length, vehicleNumber: defaultVehicleNumber, inquiryNos: [{ value: "", itemName: "", quantity: "" }] },
		]);
	};

	const handleVehicleChange = (formId: number, value: string) => {
		setVehicleForms((prev) => prev.map((form) => (form.id === formId ? { ...form, vehicleNumber: value } : form)));
	};

	const handleAddInquiryNo = (formId: number) => {
		setVehicleForms((prev) =>
			prev.map((form) =>
				form.id === formId
					? { ...form, inquiryNos: [...form.inquiryNos, { value: "", itemName: "", quantity: "" }] }
					: form
			)
		);
	};

	const handleChangeInquiryNo = (formId: number, index: number, value: string) => {
		const info = applyHandyNoInfo(value);
		setVehicleForms((prev) =>
			prev.map((form) =>
				form.id === formId
					? {
							...form,
							inquiryNos: form.inquiryNos.map((item, idx) => (idx === index ? { ...item, value, ...info } : item)),
					  }
					: form
			)
		);
	};

	const handleScanInquiryNo = (formId: number, index: number) => {
		const scanTarget = handyNoInfos[0];
		if (!scanTarget) return;

		setVehicleForms((prev) =>
			prev.map((form) =>
				form.id === formId
					? {
							...form,
							inquiryNos: form.inquiryNos.map((entry, idx) =>
								idx === index
									? { value: scanTarget.no, itemName: scanTarget.itemName, quantity: String(scanTarget.quantity) }
									: entry
							),
					  }
					: form
			)
		);
	};

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<Form>
					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xxl={3}>
							<CommonGroupLabel required={false} label="営業所">
								<CommonComboBox id="office" list={officeList} showKey={false} defaultValue="0010" />
							</CommonGroupLabel>
						</Col>
					</Row>

					{vehicleForms.map((form) => (
						<div key={`vehicle-form-${form.id}`} className="mb-3">
							<Row className="gx-1 gy-2 mb-2">
								<Col md={12} lg={5} xxl={4}>
									<CommonGroupLabel required={false} label="車両番号">
										<CommonComboBox
											id={`vehicleNumber-${form.id}`}
											list={vehicleNumberList}
											showKey={false}
											value={form.vehicleNumber}
											onChange={(e) => handleVehicleChange(form.id, e.target.value)}
										/>
									</CommonGroupLabel>
								</Col>
							</Row>

							<Row className="gx-1 gy-2 mb-2">
								<Col md={12}>
									{form.inquiryNos.map((entry, index) => (
										<div key={`handy-no-${form.id}-${index}`}>
											<Row>
												<Col md={12} lg={4}>
													<CommonGroupLabel required={false} label="問い合わせNo">
														<div className="d-flex align-items-center gap-2">
															<CommonInputBox
																id={`handyNo-${form.id}-${index}`}
																value={entry.value}
																onChange={(e) => handleChangeInquiryNo(form.id, index, e.target.value)}
																placeholder="問い合わせNoを入力"
															/>
															<Button
																type="button"
																className="btn btn-gradient w-50"
																onClick={() => handleScanInquiryNo(form.id, index)}
																size="sm"
															>
																スキャン
															</Button>
														</div>
													</CommonGroupLabel>
												</Col>
												<Col md={12} lg={4}>
													<CommonGroupLabel required={false} label="商品名">
														<CommonInputBox
															id={`handyNoInfoItem-${form.id}-${index}`}
															value={entry.itemName}
															readOnly
														/>
													</CommonGroupLabel>
												</Col>
												<Col md={12} lg={4}>
													<CommonGroupLabel required={false} label="数量">
														<CommonInputBox
															id={`handyNoInfoQuantity-${form.id}-${index}`}
															value={entry.quantity}
															readOnly
														/>
													</CommonGroupLabel>
												</Col>
											</Row>
										</div>
									))}
								</Col>
							</Row>
							<Row className="gx-1 gy-2 mb-2">
								<Col md={12} lg={5} xxl={4}>
									<Button type="button" className="btn btn-gradient btn-sm" onClick={() => handleAddInquiryNo(form.id)}>
										問い合わせ行追加
									</Button>
								</Col>
							</Row>
						</div>
					))}

					<Row className="gx-1 gy-2 mb-2">
						<Col md={12} lg={5} xxl={4}>
							<Button type="button" className="btn btn-gradient w-50" onClick={handleAddVehicleForm} size="sm">
								車両切替
							</Button>
						</Col>
					</Row>
				</Form>
			</section>
		</Container>
	);
}
