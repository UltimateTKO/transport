"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";

type ClientListItem = {
	key: string;
	value: string;
};

type Salinv001ClientProps = {
	clientList: ClientListItem[];
};

export default function Salinv001Client({ clientList }: Salinv001ClientProps) {
	const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
	const [statusMessage, setStatusMessage] = useState<string | null>(null);
	const [statusVariant, setStatusVariant] = useState<"success" | "warning" | "info">("info");
	const selectAllRef = useRef<HTMLInputElement | null>(null);

	const sortedClients = useMemo(() => [...clientList].sort((a, b) => a.key.localeCompare(b.key, "ja")), [clientList]);
	const isAllSelected = sortedClients.length > 0 && selectedCodes.length === sortedClients.length;
	const hasPartialSelection = selectedCodes.length > 0 && !isAllSelected;

	useEffect(() => {
		if (selectAllRef.current) {
			selectAllRef.current.indeterminate = hasPartialSelection;
		}
	}, [hasPartialSelection]);

	const toggleClient = (clientCode: string) => {
		setSelectedCodes((prev) => (prev.includes(clientCode) ? prev.filter((code) => code !== clientCode) : [...prev, clientCode]));
	};

	const toggleAll = (checked: boolean) => {
		setSelectedCodes(checked ? sortedClients.map((client) => client.key) : []);
	};

	const handleProcess = () => {
		if (selectedCodes.length === 0) {
			setStatusVariant("warning");
			setStatusMessage("請求処理対象が選択されていません。得意先にチェックを入れてください。");
			return;
		}
		setStatusVariant("success");
		setStatusMessage(`${selectedCodes.length} 件の得意先に請求処理を実行しました。`);
	};

	const handleClear = () => {
		setSelectedCodes([]);
		setStatusVariant("info");
		setStatusMessage("選択をクリアしました。");
	};

	return (
		<Container fluid className="py-3">
			<Row className="justify-content-center">
				<Col xl={10} xxl={8}>
					<div className="panel-block p-3">
						<header className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
							<div className="d-flex align-items-center gap-3 text-muted small">
								<span className="fw-semibold text-primary">選択 {selectedCodes.length}</span>
								<span>登録件数 {sortedClients.length}</span>
							</div>
						</header>

						{statusMessage ? (
							<Alert variant={statusVariant} className="mb-3 py-2">
								{statusMessage}
							</Alert>
						) : (
							<Alert variant="light" className="mb-3 py-2 text-muted">
								対象得意先を選んで「請求処理を実行」を押すと結果メッセージが表示されます。
							</Alert>
						)}

						<Card className="shadow-sm border-0">
							<Card.Body className="p-0">
								{sortedClients.length > 0 ? (
									<div className="table-responsive">
										<Table hover responsive className="mb-0 align-middle">
											<thead className="table-light">
												<tr>
													<th className="text-center" style={{ width: "3rem" }}>
														<Form.Check
															ref={selectAllRef}
															type="checkbox"
															id="invoice-all"
															checked={isAllSelected}
															onChange={(e) => toggleAll(e.target.checked)}
															aria-label="得意先を全て選択"
														/>
													</th>
													<th style={{ width: "7rem" }}>得意先コード</th>
													<th>得意先名</th>
												</tr>
											</thead>
											<tbody>
												{sortedClients.map((client) => (
													<tr key={client.key}>
														<td className="text-center">
															<Form.Check
																type="checkbox"
																id={`client-${client.key}`}
																checked={selectedCodes.includes(client.key)}
																onChange={() => toggleClient(client.key)}
																aria-label={`${client.value || "名称未設定"} を請求対象にする`}
															/>
														</td>
														<td className="fw-semibold text-primary">{client.key}</td>
														<td>{client.value || "名称未設定"}</td>
													</tr>
												))}
											</tbody>
										</Table>
									</div>
								) : (
									<div className="p-4 text-center text-muted">得意先データがありません。</div>
								)}
							</Card.Body>
							<Card.Footer className="bg-light d-flex flex-wrap justify-content-center gap-2">
								<Button className="btn btn-gradient px-4" onClick={handleProcess}>
									請求処理を実行
								</Button>
								<Button variant="outline-secondary" onClick={handleClear}>
									選択クリア
								</Button>
							</Card.Footer>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
