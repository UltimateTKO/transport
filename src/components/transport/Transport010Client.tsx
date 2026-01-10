"use client";

import { Fragment, useState } from "react";
import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
import { CommonGroupLabel, CommonComboBox, CommonInputBox, RequiredMark, CommonDateRangeBox } from "@/components/CommonComponent";

type DeliveryInstructionDetail = {
  id: string;
  instructionNo: string;
  detailNo: string;
  productCode: string;
  productName: string;
  manufactureDate: string;
  bestBeforeDate: string;
  lotNo: string;
  quantity: string;
  volume: string;
  weight: string;
  dimensionTotal: string;
  length: string;
  width: string;
  height: string;
  status: string;
};

type DeliveryInstructionHeader = {
  id: number;
  instructionNo: string;
  officeCode: string;
  inquirySlipNo: string;
  shipperCode: string;
  consigneeCode: string;
  consigneeName: string;
  consigneePostalCode: string;
  consigneeAddress: string;
  consigneePhone: string;
  consigneeFax: string;
  consigneeAddressCode: string;
  consigneePrefectureCode: string;
  consigneeAreaCode: string;
  consigneePrefecture: string;
  consigneeCity: string;
  consigneeTown: string;
  pickupDate: string;
  arrivalPlanDate: string;
  requestedArrivalTime: string;
  note1: string;
  note2: string;
  note3: string;
  note4: string;
  quantityTotal: string;
  volume: string;
  weight: string;
  dimensionTotal: string;
  length: string;
  width: string;
  height: string;
  deliveryClass: string;
  dispatchTargetClass: string;
  temperatureBand: string;
  status: string;
  details: DeliveryInstructionDetail[];
};

type ListItem = { key: string; value: string };

type Transport010ClientProps = {
  localDate: string;
};

type DeliveryInstructionTableProps = {
  rows: DeliveryInstructionHeader[];
};

export default function Transport010Client({ localDate }: Transport010ClientProps) {
  const temperatureBandList: ListItem[] = [
    { key: "ambient", value: "常温" },
    { key: "cool", value: "クール" },
    { key: "frozen", value: "冷凍" },
  ];
  const deliveryClassList: ListItem[] = [
    { key: "standard", value: "通常" },
    { key: "express", value: "急ぎ" },
    { key: "return", value: "回収" },
  ];
  const dispatchTargetClassList: ListItem[] = [
    { key: "target", value: "対象" },
    { key: "excluded", value: "対象外" },
  ];
  const statusList: ListItem[] = [
    { key: "created", value: "データ作成" },
    { key: "in_transit", value: "運行中" },
    { key: "delivered", value: "配送完了" },
    { key: "billed", value: "請求済" },
    { key: "deleted", value: "削除" },
  ];
  const rows: DeliveryInstructionHeader[] = [
    {
      id: 1,
      instructionNo: "TR-2024-0001",
      officeCode: "T001",
      inquirySlipNo: "INV-845921",
      shipperCode: "SHP-010",
      consigneeCode: "CNS-110",
      consigneeName: "東京ロジセンター",
      consigneePostalCode: "100-0001",
      consigneeAddress: "東京都千代田区丸の内1-1-1",
      consigneePhone: "03-1234-5678",
      consigneeFax: "03-1234-5679",
      consigneeAddressCode: "TK-101",
      consigneePrefectureCode: "13",
      consigneeAreaCode: "13101",
      consigneePrefecture: "東京都",
      consigneeCity: "千代田区",
      consigneeTown: "丸の内",
      pickupDate: "2024/11/05",
      arrivalPlanDate: "2024/11/06",
      requestedArrivalTime: "10:00-12:00",
      note1: "受付9:30",
      note2: "台車返却有",
      note3: "常温帯",
      note4: "-",
      quantityTotal: "12/36",
      volume: "1.8",
      weight: "230/210",
      dimensionTotal: "40+30+20",
      length: "40",
      width: "30",
      height: "20",
      deliveryClass: "通常",
      dispatchTargetClass: "対象",
      temperatureBand: "常温",
      status: "運行中",
      details: [
        {
          id: "1-1",
          instructionNo: "TR-2024-0001",
          detailNo: "001",
          productCode: "PRD-001",
          productName: "冷凍スープ",
          manufactureDate: "2024/09/20",
          bestBeforeDate: "2025/03/20",
          lotNo: "LOT-A101",
          quantity: "6",
          volume: "0.8",
          weight: "120/110",
          dimensionTotal: "40+30+20",
          length: "40",
          width: "30",
          height: "20",
          status: "運行中",
        },
        {
          id: "1-2",
          instructionNo: "TR-2024-0001",
          detailNo: "002",
          productCode: "PRD-014",
          productName: "加工肉セット",
          manufactureDate: "2024/10/01",
          bestBeforeDate: "2025/04/01",
          lotNo: "LOT-B220",
          quantity: "6",
          volume: "1.0",
          weight: "110/100",
          dimensionTotal: "45+35+25",
          length: "45",
          width: "35",
          height: "25",
          status: "運行中",
        },
      ],
    },
    {
      id: 2,
      instructionNo: "TR-2024-0002",
      officeCode: "T002",
      inquirySlipNo: "INV-845992",
      shipperCode: "SHP-022",
      consigneeCode: "CNS-220",
      consigneeName: "大阪南配送センター",
      consigneePostalCode: "530-0001",
      consigneeAddress: "大阪府大阪市北区梅田2-2-2",
      consigneePhone: "06-1111-2222",
      consigneeFax: "06-1111-2223",
      consigneeAddressCode: "OS-220",
      consigneePrefectureCode: "27",
      consigneeAreaCode: "27127",
      consigneePrefecture: "大阪府",
      consigneeCity: "大阪市北区",
      consigneeTown: "梅田",
      pickupDate: "2024/11/07",
      arrivalPlanDate: "2024/11/08",
      requestedArrivalTime: "14:00-16:00",
      note1: "検品20分",
      note2: "冷凍帯注意",
      note3: "パレット回収",
      note4: "-",
      quantityTotal: "8/20",
      volume: "2.4",
      weight: "310/280",
      dimensionTotal: "50+40+30",
      length: "50",
      width: "40",
      height: "30",
      deliveryClass: "急ぎ",
      dispatchTargetClass: "対象",
      temperatureBand: "冷凍",
      status: "データ作成",
      details: [
        {
          id: "2-1",
          instructionNo: "TR-2024-0002",
          detailNo: "001",
          productCode: "PRD-031",
          productName: "冷凍うどん",
          manufactureDate: "2024/09/05",
          bestBeforeDate: "2025/03/05",
          lotNo: "LOT-C031",
          quantity: "5",
          volume: "1.2",
          weight: "180/160",
          dimensionTotal: "50+40+30",
          length: "50",
          width: "40",
          height: "30",
          status: "データ作成",
        },
        {
          id: "2-2",
          instructionNo: "TR-2024-0002",
          detailNo: "002",
          productCode: "PRD-044",
          productName: "冷凍フルーツ",
          manufactureDate: "2024/09/12",
          bestBeforeDate: "2025/03/12",
          lotNo: "LOT-D044",
          quantity: "3",
          volume: "1.2",
          weight: "130/120",
          dimensionTotal: "45+35+25",
          length: "45",
          width: "35",
          height: "25",
          status: "データ作成",
        },
      ],
    },
  ];

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
              <CommonGroupLabel required={false} label="配送指示No">
                <CommonInputBox id="deliveryInstructionNo" defaultValue="" placeholder="配送指示Noを入力" />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="営業所コード">
                <CommonInputBox id="officeCode" defaultValue="" placeholder="営業所コードを入力" />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="問合せNo/伝票No">
                <CommonInputBox id="inquirySlipNo" defaultValue="" placeholder="問合せNo/伝票Noを入力" />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="荷送人コード">
                <CommonInputBox id="shipperCode" defaultValue="" placeholder="荷送人コードを入力" />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="荷受人コード">
                <CommonInputBox id="consigneeCode" defaultValue="" placeholder="荷受人コードを入力" />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="荷受日">
                <CommonDateRangeBox id="pickupDate" defaultFromValue={localDate} />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="着予定日">
                <CommonDateRangeBox id="arrivalPlanDate" defaultFromValue={localDate} />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="配送区分">
                <CommonComboBox id="deliveryClass" list={deliveryClassList} showKey={false} />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="配車対象区分">
                <CommonComboBox id="dispatchTargetClass" list={dispatchTargetClassList} showKey={false} />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="配送温度帯">
                <CommonComboBox id="temperatureBand" list={temperatureBandList} showKey={false} />
              </CommonGroupLabel>
            </Col>
            <Col md={12} lg={4} xxl={3}>
              <CommonGroupLabel required={false} label="ステータス">
                <CommonComboBox id="status" list={statusList} showKey={false} />
              </CommonGroupLabel>
            </Col>

            <Col md={12} className="d-flex justify-content-center gap-2 mt-3">
              <Button className="btn btn-gradient px-3">検索</Button>
            </Col>
          </Row>
        </Form>
      </section>

      <section className="panel-block">
        <DeliveryInstructionTable rows={rows} />

        <footer className="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <Button className="btn btn-gradient btn-sm px-3">配送完了処理</Button>
            <span className="small text-muted">選択した配送指示を配送完了にします</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Form.Select defaultValue="50" size="sm" style={{ width: "5rem" }}>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Select>
            <span className="small text-muted">件表示</span>
          </div>

          <div className="d-flex align-items-center gap-1">
            <Button className="btn btn-gradient btn-sm px-2 py-1">{"<<"}</Button>
            <Button className="btn btn-gradient btn-sm px-2 py-1">{"<"}</Button>
            <div className="d-flex align-items-center border rounded px-2 py-1 bg-white small">
              <span>ページ</span>
              <Form.Control className="border-0 p-0 text-center" defaultValue="1" size="sm" type="number" />
              <span className="text-muted">/ 1</span>
            </div>
            <Button className="btn btn-gradient btn-sm px-2 py-1">{">"}</Button>
            <Button className="btn btn-gradient btn-sm px-2 py-1">{">>"}</Button>
          </div>

          <div className="small text-muted">全 0 アイテム中 0 から 0 を表示中</div>
        </footer>
      </section>
    </Container>
  );
}

function DeliveryInstructionTable({ rows }: DeliveryInstructionTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const toggleRow = (id: number) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  return (
    <div className="table-responsive border rounded">
      <Table className="mb-0 table-bordered table-hover table-sm table-striped" responsive size="sm">
        <thead>
          <tr className="table-primary">
            <th style={{ width: "2.5rem" }}></th>
            <th style={{ width: "2rem" }}>
              <Form.Check type="checkbox" />
            </th>
            <th>配送指示№</th>
            <th>営業所コード</th>
            <th>問合せNo/伝票No</th>
            <th>荷送人コード</th>
            <th>荷受人コード</th>
            <th>荷受人名</th>
            <th>荷受人郵便番号</th>
            <th>荷受人住所</th>
            <th>荷受人電話番号</th>
            <th>荷受人FAX番号</th>
            <th>荷受人住所コード</th>
            <th>荷受人住所コード（県）</th>
            <th>荷受人住所コード（地区）</th>
            <th>荷受人都道府県</th>
            <th>荷受人市区町村</th>
            <th>荷受人町域</th>
            <th>荷受日</th>
            <th>着予定日</th>
            <th>指定着時間</th>
            <th>備考１</th>
            <th>備考２</th>
            <th>備考３</th>
            <th>備考４</th>
            <th>個数/合計個数</th>
            <th>容積</th>
            <th>実重量/容積重</th>
            <th>寸法(縦+横+高さ)</th>
            <th>縦</th>
            <th>横</th>
            <th>高さ</th>
            <th>配送区分</th>
            <th>配車対象区分</th>
            <th>配送温度帯</th>
            <th>ステータス</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Fragment key={row.id}>
              <tr className="align-middle">
                <td className="text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="px-2 py-0"
                    onClick={() => toggleRow(row.id)}
                    aria-label={`${row.instructionNo}の配送指示明細を${expandedRows.includes(row.id) ? "閉じる" : "開く"}`}
                  >
                    {expandedRows.includes(row.id) ? "-" : "+"}
                  </Button>
                </td>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>{row.instructionNo}</td>
                <td>{row.officeCode}</td>
                <td>{row.inquirySlipNo}</td>
                <td>{row.shipperCode}</td>
                <td>{row.consigneeCode}</td>
                <td>{row.consigneeName}</td>
                <td>{row.consigneePostalCode}</td>
                <td>{row.consigneeAddress}</td>
                <td>{row.consigneePhone}</td>
                <td>{row.consigneeFax}</td>
                <td>{row.consigneeAddressCode}</td>
                <td>{row.consigneePrefectureCode}</td>
                <td>{row.consigneeAreaCode}</td>
                <td>{row.consigneePrefecture}</td>
                <td>{row.consigneeCity}</td>
                <td>{row.consigneeTown}</td>
                <td>{row.pickupDate}</td>
                <td>{row.arrivalPlanDate}</td>
                <td>{row.requestedArrivalTime}</td>
                <td>{row.note1}</td>
                <td>{row.note2}</td>
                <td>{row.note3}</td>
                <td>{row.note4}</td>
                <td>{row.quantityTotal}</td>
                <td>{row.volume}</td>
                <td>{row.weight}</td>
                <td>{row.dimensionTotal}</td>
                <td>{row.length}</td>
                <td>{row.width}</td>
                <td>{row.height}</td>
                <td>{row.deliveryClass}</td>
                <td>{row.dispatchTargetClass}</td>
                <td>{row.temperatureBand}</td>
                <td>{row.status}</td>
              </tr>

              {expandedRows.includes(row.id) && (
                <tr className="bg-light">
                  <td></td>
                  <td colSpan={35} className="p-0">
                    <Table className="mb-0 table-bordered table-sm" responsive size="sm">
                      <thead>
                        <tr className="table-secondary">
                          <th style={{ width: "2rem" }}>
                            <Form.Check type="checkbox" />
                          </th>
                          <th>配送指示№</th>
                          <th>配送指示明細№</th>
                          <th>商品コード</th>
                          <th>商品名</th>
                          <th>製造年月日</th>
                          <th>賞味期限</th>
                          <th>ロット番号</th>
                          <th>個数</th>
                          <th>容積</th>
                          <th>実重量/容積重</th>
                          <th>寸法(縦+横+高さ)</th>
                          <th>縦</th>
                          <th>横</th>
                          <th>高さ</th>
                          <th>ステータス</th>
                        </tr>
                      </thead>
                      <tbody>
                        {row.details.map((detail) => (
                          <tr key={detail.id}>
                            <td>
                              <Form.Check type="checkbox" />
                            </td>
                            <td>{detail.instructionNo}</td>
                            <td className="text-end">{detail.detailNo}</td>
                            <td>{detail.productCode}</td>
                            <td>{detail.productName}</td>
                            <td>{detail.manufactureDate}</td>
                            <td>{detail.bestBeforeDate}</td>
                            <td>{detail.lotNo}</td>
                            <td className="text-end">{detail.quantity}</td>
                            <td>{detail.volume}</td>
                            <td>{detail.weight}</td>
                            <td>{detail.dimensionTotal}</td>
                            <td>{detail.length}</td>
                            <td>{detail.width}</td>
                            <td>{detail.height}</td>
                            <td>{detail.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
