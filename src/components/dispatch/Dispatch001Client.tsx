"use client";

import { useState, useMemo } from "react";
import { Container, Button, Form, Table } from "react-bootstrap";
import {
	CommonGroupLabel,
	CommonComboBox,
	CommonInputBox,
	CommonRadio,
	RequiredMark,
} from "@/components/CommonComponent";

type ListItem = { key: string; value: string };

type Dispatch001ClientProps = {
	localDate: string;
	officeList: ListItem[];
	clientList: ListItem[];
	startList: ListItem[];
	endList: ListItem[];
	itemGroupList: ListItem[];
	vehicleTypeList: ListItem[];
	vehicleLoadsList: ListItem[];
	defaultVehicleCount?: number;
};

export default function Dispatch001Client(props: Dispatch001ClientProps) {
	const {
		localDate,
		officeList,
		clientList,
		startList,
		endList,
		itemGroupList,
		vehicleTypeList,
		vehicleLoadsList,
		defaultVehicleCount = 1,
	} = props;

	// ← ここがポイント：車輛台数の状態
	const [vehicleCount, setVehicleCount] = useState<number>(defaultVehicleCount);

	const rows = useMemo(() => Array.from({ length: Math.max(0, vehicleCount) }, (_, i) => i), [vehicleCount]);

	// 中継地追加ボタン押下時の処理
	const onClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		setVehicleCount(vehicleCount + 1);
	};
	// 中継地削除ボタン押下時の処理
	const onClickRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		setVehicleCount(Math.max(0, vehicleCount - 1));
	};

	// 自車の時に返すコンポーネント
	const SelfVehiclePanel = () => {
		return rows.map((i) => (
			<tr key={i}>
				<td>
					<Button className="btn btn-gradient px-3" onClick={onClickAdd}>
						中継地追加
					</Button>
					{
						/* 2行目以降に中継地削除を設ける */
						i > 0 && (
							<Button className="btn btn-gradient px-3" onClick={onClickRemove}>
								中継地削除
							</Button>
						)
					}
				</td>
				<td>
					{/* 積地名と卸地名のコンボボックスを表示 */}
					<div className="d-flex gap-2">
						<Form.Select size="sm" id={`vehicleType-${i}`}>
							{startList.map((item) => (
								<option key={item.key.trim()} value={item.value.trim()}>
									{item.value.trim()}
								</option>
							))}
						</Form.Select>
					</div>
				</td>
				<td>
					<Form.Select size="sm" id={`vehicleLoad-${i}`}>
						{endList.map((item) => (
							<option key={item.key.trim()} value={item.value.trim()}>
								{item.value.trim()}
							</option>
						))}
					</Form.Select>
				</td>
				<td>
					<Form.Control id={`shippingDestination-${i}`} className="text-end" size="sm" type="text" />
				</td>
			</tr>
		));
	};

	return (
		<Container fluid>
			<section className="panel-block mb-4">
				<header className="panel-block-header d-flex align-items-center gap-2">
					<RequiredMark />
					<span className="small fw-semibold">は入力必須項目です</span>
				</header>

				<Form className="panel-field-grid">
					{/* 得意先名称 */}
					<CommonGroupLabel colMdNumber={7} required label="得意先名称">
						<CommonInputBox id="clientName" defaultValue={clientList[0]?.value} readOnly={true} />
					</CommonGroupLabel>

					{/* 運行日 */}
					<CommonGroupLabel colMdNumber={4} required label="運行日">
						<CommonInputBox id="shippingDate" type="date" defaultValue={localDate} />
					</CommonGroupLabel>

					{/* 積地名 */}
					<CommonGroupLabel colMdNumber={7} required label="積地名">
						<CommonInputBox id="shippingOrigin" defaultValue={startList[0]?.value} readOnly={true} />
					</CommonGroupLabel>

					{/* 卸地 */}
					<CommonGroupLabel colMdNumber={7} required label="卸地">
						<CommonInputBox id="shippingDestination" defaultValue={endList[1]?.value} readOnly={true} />
					</CommonGroupLabel>

					{/* 総積載量 */}
					<CommonGroupLabel colMdNumber={3} required label="積載量">
						<CommonInputBox id="vehicleWeight" type="text" defaultValue="10" />
					</CommonGroupLabel>

					{/* 品群 */}
					<CommonGroupLabel colMdNumber={7} required label="品群">
						{/* <CommonComboBox id="itemGroup" list={itemGroupList} /> */}
					</CommonGroupLabel>

					{/* 自車or庸車をラジオボタンで選択し、選択によって皇族パネルの表示内容を変える。 */}
					<CommonGroupLabel colMdNumber={5} required label="自車/庸車">
						<CommonRadio
							id="selfOrCharter"
							list={[
								{ key: "self", value: "自車" },
								{ key: "charter", value: "庸車" },
							]}
							defaultCheckIndex={0}
							onChange={() => {}}
						/>
					</CommonGroupLabel>
				</Form>
			</section>

			<section className="panel-block">
				<header className="panel-block-title">車輛情報</header>
				<div className="table-responsive border rounded">
					<Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
						<thead>
							<tr className="table-primary">
								<th style={{ width: "15rem" }}></th>
								<th>積地名</th>
								<th>卸地名</th>
								<th>車番</th>
							</tr>
						</thead>
						<tbody>{SelfVehiclePanel()}</tbody>
					</Table>
				</div>
			</section>

			<div className="d-flex w-100 justify-content-end mt-4">
				<Button className="btn btn-gradient px-4 py-2">登録 [F3]</Button>
			</div>
		</Container>
	);
}
