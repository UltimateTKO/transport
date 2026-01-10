"use client";

import { useState, useMemo, useTransition } from "react";
import { Container, Button, Form, Table, InputGroup, Row, Col } from "react-bootstrap";
import {
	CommonGroupLabel,
	CommonComboBox,
	CommonInputBox,
	RequiredMark,
	CommonComboBoxInputable,
	CommonTextAreaBox,
} from "@/components/CommonComponent";
import {
	fetchPrefectures,
	fetchCities,
	fetchTowns,
	getStartEndAddress,
	fetchAddressByPostalCode,
} from "@/app/api/orders/Orders001Action";
import { BsTruck } from "react-icons/bs";

type ListItem = { key: string; value: string };

type Orders001ClientProps = {
	localDate: string;
	officeList: ListItem[];
	clientList: ListItem[];
	startList: ListItem[];
	endList: ListItem[];
	itemGroupList: ListItem[];
	vehicleTypeList: ListItem[];
	vehicleLoadsList: ListItem[];
	defaultVehicleCount?: number;
	prefecturesList?: any;
};

/**
 * Orders001Clientクライアントコンポーネント
 * @param props
 * @returns コンポーネント
 */
export default function Orders001Client(props: Orders001ClientProps) {
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
		prefecturesList,
	} = props;
	// 車輛台数の状態
	const [vehicleCount, setVehicleCount] = useState<number>(defaultVehicleCount);

	const rows = useMemo(() => Array.from({ length: Math.max(0, vehicleCount) }, (_, i) => i), [vehicleCount]);

	const handleVehicleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const n = Number(e.target.value);
		// 負数・NaNは0に丸め、上限を付けたい場合はここで制御
		setVehicleCount(Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0);
	};

	// 出荷元名称リストの状態
	const [startPlaceNameOptions, setStartPlaceNameOptions] = useState("");
	// 郵便番号テキストの状態(出荷元)
	const [startPlacePostalCode, setStartPlacePostalCode] = useState("");
	// 県リストの状態(出荷元)
	const [startPlaceKenValue, setStartPlaceKenValue] = useState("");
	// 市町村リストの状態(出荷元)
	const [startPlaceShiOptions, setStartPlaceShiOptions] = useState<{ value: string }[]>([]);
	// 市町村選択値の状態(出荷元)
	const [startPlaceShiValue, setStartPlaceShiValue] = useState("");
	// 市町村取得のためのトランジション(出荷元)
	const [isPendingStartPlaceShi, startTransitionStartPlaceShi] = useTransition();
	// 町域リストの状態(出荷元)
	const [startPlaceChoOptions, setStartPlaceChoOptions] = useState<{ value: string }[]>([]);
	// 町域選択値の状態(出荷元)
	const [startPlaceChoValue, setStartPlaceChoValue] = useState("");
	// 町域取得のためのトランジション(出荷元)
	const [isPendingStartPlaceCho, startTransitionStartPlaceCho] = useTransition();

	// 郵便番号入力後の住所セット処理(出荷元)
	const getStartPlaceAddressByPostalCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("郵便番号入力後の住所セット処理(出荷元)");
		const selectedValue = e.target.value.replace("-", "").trim();
		const { prefecture, city, town } = await fetchAddressByPostalCode(selectedValue);

		// M040_StartEndから選択された出荷先名称の県・市町村・町域を取得して各リストを更新
		setStartPlaceKenValue(prefecture);
		loadAddressStart(prefecture, city, town);
	};

	// 住所項目のセット共通処理
	const loadAddressStart = (prefecture: string, city: string = "", town: string = "") => {
		startTransitionStartPlaceShi(() => {
			const a = fetchCities(prefecture).then((options) => {
				console.log(city);
				console.log(options);
				setStartPlaceShiOptions(options);
				setStartPlaceShiValue(city);
			});
		});
		if (city !== "") {
			startTransitionStartPlaceCho(() => {
				fetchTowns(prefecture, city).then((options) => {
					setStartPlaceChoOptions(options);
					setStartPlaceChoValue(town);
				});
			});
		}
	};

	// 出荷元名称選択時の県・市町村・町域リスト更新処理
	const getStartPlaceNameData = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setStartPlaceNameOptions(selectedValue);
		// M040_StartEndから選択された出荷元名称の県・市町村・町域を取得して各リストを更新
		// 会社コードは、現時点でCP001を固定値で渡す（TODO）
		const { prefecture, city, town, postalCode } = await getStartEndAddress("CP001", selectedValue);

		// M040_StartEndから選択された出荷元名称の郵便番号・県・市町村・町域を取得して各リストを更新
		setStartPlacePostalCode(postalCode);
		setStartPlaceKenValue(prefecture);
		loadAddressStart(prefecture, city, town);
	};

	// 県選択時の市町村データ取得処理(出荷元)
	const getFetchCityDataStart = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		// 県コード(startPlaceKen)を引数に市町村データを取得
		const prefecture = e.target.value;
		setStartPlaceKenValue(prefecture);
		loadAddressStart(prefecture);
	};

	// 市区町村選択時の町域データ取得処理(出荷元)
	const getFetchTownsDataStart = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		// 県コード(startPlaceKen)と市区町村コード(startPlaceShi)を引数に町域データを取得
		const city = e.target.value;
		setStartPlaceShiValue(city);

		loadAddressStart(startPlaceKenValue, city);
	};

	const handleStartPlaceChoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStartPlaceChoValue(e.target.value);
	};

	// 出荷先名称リストの状態
	const [endPlaceNameOptions, setEndPlaceNameOptions] = useState("");
	// 郵便番号テキストの状態(出荷先)
	const [endPlacePostalCode, setEndPlacePostalCode] = useState("");
	// 県リストの状態(出荷先)
	const [endPlaceKenValue, setEndPlaceKenValue] = useState("");
	// 市町村リストの状態(出荷先)
	const [endPlaceShiOptions, setEndPlaceShiOptions] = useState<{ value: string }[]>([]);
	// 市町村選択値の状態(出荷先)
	const [endPlaceShiValue, setEndPlaceShiValue] = useState("");
	// 市町村取得のためのトランジション(出荷先)
	const [isPendingEndPlaceShi, startTransitionEndPlaceShi] = useTransition();
	// 町域リストの状態(出荷先)
	const [endPlaceChoOptions, setEndPlaceChoOptions] = useState<{ value: string }[]>([]);
	// 町域選択値の状態(出荷先)
	const [endPlaceChoValue, setEndPlaceChoValue] = useState("");
	// 町域取得のためのトランジション(出荷先)
	const [isPendingEndPlaceCho, startTransitionEndPlaceCho] = useTransition();

	// 郵便番号入力後の住所セット処理(出荷先)
	const getEndPlaceAddressByPostalCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("郵便番号入力後の住所セット処理(出荷先)");
		const selectedValue = e.target.value.replace("-", "").trim();
		const { prefecture, city, town } = await fetchAddressByPostalCode(selectedValue);

		// M040_StartEndから選択された出荷先名称の県・市町村・町域を取得して各リストを更新
		setEndPlaceKenValue(prefecture);
		loadAddressEnd(prefecture, city, town);
	};

	// 住所項目のセット共通処理
	const loadAddressEnd = (prefecture: string, city: string = "", town: string = "") => {
		startTransitionEndPlaceShi(() => {
			const a = fetchCities(prefecture).then((options) => {
				setEndPlaceShiOptions(options);
				setEndPlaceShiValue(city);
			});
		});
		if (city !== "") {
			startTransitionEndPlaceCho(() => {
				fetchTowns(prefecture, city).then((options) => {
					setEndPlaceChoOptions(options);
					setEndPlaceChoValue(town);
				});
			});
		}
	};

	// 出荷先名称選択時の県・市町村・町域リスト更新処理
	const getEndPlaceNameData = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setEndPlaceNameOptions(selectedValue);
		// M040_StartEndから選択された出荷先名称の県・市町村・町域を取得して各リストを更新
		// 会社コードは、現時点でCP001を固定値で渡す（TODO）
		const { prefecture, city, town, postalCode } = await getStartEndAddress("CP001", selectedValue);

		// M040_StartEndから選択された出荷先名称の郵便番号・県・市町村・町域を取得して各リストを更新
		setEndPlacePostalCode(postalCode);
		setEndPlaceKenValue(prefecture);
		loadAddressEnd(prefecture, city, town);
	};

	// 県選択時の市町村データ取得処理(出荷先)
	const getFetchCityDataEnd = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		// 県コード(endPlaceKen)を引数に市町村データを取得
		const prefectures = e.target.value;
		setEndPlaceKenValue(prefectures);
		loadAddressEnd(prefectures);
	};

	// 市区町村選択時の町域データ取得処理(出荷先)
	const getFetchTownsDataEnd = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		// 県コード(endPlaceKen)と市区町村コード(endPlaceShi)を引数に町域データを取得
		const city = e.target.value;
		loadAddressEnd(endPlaceKenValue, city);
	};

	const handleEndPlaceChoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEndPlaceChoValue(e.target.value);
	};

	return (
		<Container fluid>
			<Form id="orderEntryForm">
				<section className="panel-block mb-4">
					<header className="panel-block-header d-flex align-items-center gap-2">
						<RequiredMark />
						<span className="small fw-semibold">は入力必須項目です</span>
					</header>

					<Row className="gx-1 gy-2 mb-4">
						<Col md={12} lg={4} xl={3}>
							{/* 受注日(デフォルトは今日の日付) */}
							<CommonGroupLabel required label="受注日">
								<CommonInputBox
									id="orderDate"
									type="date"
									placeholder="受注日を入力してください"
									defaultValue={localDate}
								/>
							</CommonGroupLabel>
						</Col>
						<Col md={0} lg={2} xl={3}>
							<></>
						</Col>
						<Col md={12} lg={4} xl={3}>
							{/* 受注No入力 */}
							<CommonGroupLabel required={false} label="受注No">
								<CommonInputBox id="orderNo" type="text" maxLength={10} placeholder="受注Noを入力してください" />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={6} xl={5}>
							{/* 得意先 */}
							<CommonGroupLabel required label="得意先">
								<CommonComboBox id="client" list={clientList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={0} lg={1}>
							<></>
						</Col>
						<Col md={12} lg={5}>
							{/* 受注部門 */}
							<CommonGroupLabel required label="受注部門">
								<CommonComboBox id="office" list={officeList} showKey={true} />
							</CommonGroupLabel>
						</Col>
						<Col md={12} lg={6} xl={5}>
							{/* 品群 */}
							<CommonGroupLabel required label="品群">
								<CommonComboBox id="itemGroup" list={itemGroupList} showKey={true} />
							</CommonGroupLabel>
						</Col>
					</Row>

					{/* 出荷元情報入力パネル→出荷先情報入力パネルを表示 */}
					<Row className="g-3 align-items-center">
						{/* 出荷元情報パネル */}
						<Col xs={12} lg={5} id="startInfo">
							<article className="panel-card h-100">
								<header className="panel-card-header px-3 py-2">
									<div className="d-flex flex-wrap align-items-center gap-3">
										<span className="fw-semibold">出荷元情報</span>
									</div>
								</header>
								<div className="panel-card-body">
									<div className="panel-form-row">
										<span className="panel-label">積日</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonInputBox id="startDate" type="date" defaultValue={localDate} className="w-auto" />
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">出荷元</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBoxInputable
												id="startPlace"
												list={startList}
												className="w-100"
												showKey={true}
												onChange={getStartPlaceNameData}
												value={startPlaceNameOptions}
											/>
										</div>
									</div>
									<div className="panel-form-row-4col">
										<span className="panel-label">〒</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonInputBox
												id="endPostalCode"
												type="text"
												pattern="\d{3}-\d{4}"
												className="w-100"
												value={startPlacePostalCode}
												onChange={(e) => setStartPlacePostalCode(e.target.value)}
												onBlur={getStartPlaceAddressByPostalCode}
											/>
										</div>
										<span className="panel-label">県</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBox
												id="startPlaceKen"
												list={prefecturesList}
												showKey={false}
												className="col-md-12"
												onChange={getFetchCityDataStart}
												defaultValue=""
												value={startPlaceKenValue}
											/>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">市区町村</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBox
												id="startPlaceShi"
												list={startPlaceShiOptions}
												showKey={false}
												className="col"
												readOnly={isPendingStartPlaceShi}
												defaultValue=""
												value={startPlaceShiValue}
												onChange={getFetchTownsDataStart}
											/>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">町域</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBox
												id="startPlaceCho"
												list={startPlaceChoOptions}
												showKey={false}
												className="col"
												readOnly={isPendingStartPlaceCho}
												onChange={handleStartPlaceChoChange}
												value={startPlaceChoValue}
											/>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">電話番号</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonInputBox
												id="startPlacePhoneNumber"
												type="text"
												className="w-auto"
												// value={startPlacePhoneNumber}
												// onChange={(e) => setStartPlacePhoneNumber(e.target.value)}
												// onBlur={getStartPlaceAddressByPostalCode}
											/>
										</div>
									</div>
								</div>
							</article>
						</Col>
						<Col xs={12} lg={2}>
							<Row className="d-flex flex-column align-items-center">
								<Col xs={12} md={4} lg={12} className="text-center">
									{/* 距離入力 km */}
									<InputGroup>
										<CommonInputBox id="distance" type="number" className="w-50 fs-7 text-end" placeholder="距離 km" />
										<InputGroup.Text className="fs-6 fw-lighter">km</InputGroup.Text>
									</InputGroup>
								</Col>
								<Col xs={12} md={4} lg={12} className="text-center">
									<BsTruck size={64} />
								</Col>
								<Col xs={12} md={4} lg={12} className="text-center">
									{/* タリフ */}
									<InputGroup>
										<CommonInputBox id="tariff" type="number" className="w-50 fs-7 text-end" placeholder="タリフ" />
										<InputGroup.Text className="fs-6 fw-lighter">km</InputGroup.Text>
									</InputGroup>
								</Col>
							</Row>
						</Col>
						{/* 出荷先情報パネル */}
						<Col xs={12} lg={5} id="endInfo">
							<article className="panel-card h-100">
								<header className="panel-card-header px-3 py-2">
									<div className="d-flex flex-wrap align-items-center gap-3">
										<span className="fw-semibold">出荷先情報</span>
									</div>
								</header>
								<div className="panel-card-body">
									<div className="panel-form-row">
										<span className="panel-label">着日</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonInputBox id="endDate" type="date" defaultValue={localDate} className="w-auto" />
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">出荷先</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBoxInputable
												id="endPlace"
												list={endList}
												className="w-100"
												showKey={true}
												onChange={getEndPlaceNameData}
												value={endPlaceNameOptions}
											/>
										</div>
									</div>
									<div className="panel-form-row-4col">
										<span className="panel-label">〒</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonInputBox
												id="endPostalCode"
												type="text"
												pattern="\d{3}-\d{4}"
												className="w-100"
												value={endPlacePostalCode}
												onChange={(e) => setEndPlacePostalCode(e.target.value)}
												onBlur={getEndPlaceAddressByPostalCode}
											/>
										</div>
										<span className="panel-label">県</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBox
												id="endPlaceKen"
												list={prefecturesList}
												className="col-md-12"
												showKey={false}
												onChange={getFetchCityDataEnd}
												defaultValue=""
												value={endPlaceKenValue}
											/>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">市区町村</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBox
												id="endPlaceShi"
												list={endPlaceShiOptions}
												className="col"
												showKey={false}
												readOnly={isPendingEndPlaceShi}
												defaultValue=""
												value={endPlaceShiValue}
												onChange={getFetchTownsDataEnd}
											/>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">町域</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonComboBox
												id="endPlaceCho"
												list={endPlaceChoOptions}
												className="col"
												showKey={false}
												readOnly={isPendingEndPlaceCho}
												onChange={handleEndPlaceChoChange}
												value={endPlaceChoValue}
											/>
										</div>
									</div>
									<div className="panel-form-row">
										<span className="panel-label">電話番号</span>
										<div className="d-flex flex-wrap align-items-center gap-2">
											<CommonInputBox
												id="endPlacePhoneNumber"
												type="text"
												className="w-auto"
												// value={endPlacePhoneNumber}
												// onChange={(e) => setEndPlacePhoneNumber(e.target.value)}
												// onBlur={getEndPlaceAddressByPostalCode}
											/>
										</div>
									</div>
								</div>
							</article>
						</Col>
					</Row>

					<Row className="row gx-0 gy-2 mb-4">
						<Col xs={12} md={3} className="row gx-0 gy-2 mb-4">
							{/* 輸送総重量 */}
							<CommonGroupLabel required label="輸送総重量">
								<InputGroup>
									<CommonInputBox id="totalLoadWeight" type="text" defaultValue="0" />
									<InputGroup.Text className="fs-6">t</InputGroup.Text>
								</InputGroup>
							</CommonGroupLabel>
							{/* ← ここで onChange を拾って行数を更新 */}
							<CommonGroupLabel required label="車輛台数">
								<InputGroup>
									<CommonInputBox
										id="vehicleCount"
										type="number"
										defaultValue="1"
										onChange={handleVehicleCountChange}
									/>
									<InputGroup.Text className="fs-6">台</InputGroup.Text>
								</InputGroup>
							</CommonGroupLabel>
						</Col>
						<Col xs={12} md={3} className="row gx-0 gy-2 mb-4">
							{/* PL数 */}
							<CommonGroupLabel required={false} label="PL数">
								<InputGroup>
									<CommonInputBox id="plCount" type="text" defaultValue="0" />
									<InputGroup.Text className="fs-6">個</InputGroup.Text>
								</InputGroup>
							</CommonGroupLabel>
							{/* 容積(m³) */}
							<CommonGroupLabel required={false} label="容積(m³)">
								<InputGroup>
									<CommonInputBox id="volume" type="text" defaultValue="0" />
									<InputGroup.Text className="fs-6">m³</InputGroup.Text>
								</InputGroup>
							</CommonGroupLabel>
						</Col>
						<Col xs={12} md={6} className="row gx-0 gy-2 mb-4">
							{/* 備考 */}
							<CommonGroupLabel required={false} label="備考">
								<InputGroup>
									<CommonTextAreaBox id="remarks" rows={4} defaultValue="" />
								</InputGroup>
							</CommonGroupLabel>
						</Col>
					</Row>
				</section>

				<section className="panel-block">
					<header className="panel-block-title">車輛情報</header>
					<div className="table-responsive border rounded">
						<Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
							<thead>
								<tr className="table-primary">
									<th style={{ width: "2rem" }}>
										<Form.Check type="checkbox" />
									</th>
									<th>車輛種別</th>
									<th>車輛積載量</th>
									<th>請求運賃</th>
									<th>備考</th>
								</tr>
							</thead>
							<tbody>
								{rows.map((i) => (
									<tr key={i}>
										<td>
											<Form.Check type="checkbox" />
										</td>
										<td>
											{/* 2列で車輛種別と積載量のコンボボックスを表示 */}
											<div className="d-flex gap-2">
												<Form.Select size="sm" id={`vehicleType-${i}`}>
													{vehicleTypeList.map((item) => (
														<option key={item.key.trim()} value={item.value.trim()}>
															{item.value.trim()}
														</option>
													))}
												</Form.Select>
												<Form.Select size="sm" id={`vehicleLoad-${i}`}>
													{vehicleLoadsList.map((item) => (
														<option key={item.key.trim()} value={item.value.trim()}>
															{item.value.trim()}
														</option>
													))}
												</Form.Select>
											</div>
										</td>
										<td>
											<Form.Control id={`vehicleWeight-${i}`} className="text-end" size="sm" type="text" />
										</td>
										<td>
											<Form.Control id={`paymentFreight-${i}`} className="text-end" size="sm" type="text" />
										</td>
										<td>
											<Form.Control id={`remarks-${i}`} size="sm" type="text" />
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</section>

				<div className="d-flex w-100 justify-content-end mt-4">
					<Button className="btn btn-gradient px-4 py-2">登録 [F3]</Button>
				</div>
			</Form>
		</Container>
	);
}
