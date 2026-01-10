"use client";

import { useMemo, useState, useEffect, PropsWithChildren, type ComponentType } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, FolderOpenDot, LayoutGrid, Truck, FileText, Building, Briefcase, Compass } from "lucide-react";
import { SidebarGroup, SidebarChild } from "@/libs/sidebar";
import { Navbar, Container, Badge, Button, Nav, CloseButton, Tabs, Tab } from "react-bootstrap";

type Props = PropsWithChildren<{
	sidebarGroups: SidebarGroup[];
	activeGroupId: string; // サーバー決定のアクティブ
	activeChildId: string; // サーバー決定のアクティブ
}>;

type OpenTab = SidebarChild & { key: string; groupId: string };

export default function ShellClient({ sidebarGroups, activeGroupId, activeChildId, children }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// UIの補助状態（開閉やタブ）はクライアントで保持
	const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {};
		sidebarGroups.forEach((g) => (initial[g.id] = g.id === activeGroupId));
		return initial;
	});

	// タブ管理
	const initialFirst = useMemo(
		() => sidebarGroups.find((g) => g.id === activeGroupId)?.children.find((c) => c.id === activeChildId),
		[sidebarGroups, activeGroupId, activeChildId]
	);
	const [openTabs, setOpenTabs] = useState<OpenTab[]>(
		initialFirst ? [{ ...initialFirst, key: `${activeGroupId}:${activeChildId}`, groupId: activeGroupId }] : []
	);
	const [activeTabKey, setActiveTabKey] = useState<string>(initialFirst ? `${activeGroupId}:${activeChildId}` : "");

	// URL（サーバー真実）変更に追従してタブを同期
	useEffect(() => {
		const key = `${activeGroupId}:${activeChildId}`;
		setOpenTabs((prev) => {
			if (prev.some((t) => t.key === key)) return prev;
			const child = sidebarGroups.find((g) => g.id === activeGroupId)?.children.find((c) => c.id === activeChildId);
			return child ? [...prev, { ...child, key, groupId: activeGroupId }] : prev;
		});
		setActiveTabKey(key);
		setExpanded((prev) => ({ ...prev, [activeGroupId]: true }));
	}, [activeGroupId, activeChildId, sidebarGroups]);

	const activeGroup = sidebarGroups.find((g) => g.id === activeGroupId);
	const activeChild = activeGroup?.children.find((c) => c.id === activeChildId);
	const currentTab = openTabs.find((t) => t.key === activeTabKey);

	// URL を書き換えてサーバー再描画を依頼
	const navigate = (g: string, c: string) => {
		const params = new URLSearchParams(searchParams?.toString() ?? "");
		params.set("g", g);
		params.set("c", c);
		router.push(`/?${params.toString()}`); // これで Server が再レンダリングされ、children(MainContent)が更新される
	};

	const toggleGroup = (groupId: string) => {
		setExpanded((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
		// const group = sidebarGroups.find((g) => g.id === groupId);
		// if (group && !expanded[groupId]) {
		// 	navigate(groupId, group.children[0]?.id ?? "");
		// }
	};

	const openOrFocusTab = (groupId: string, child: SidebarChild) => {
		const key = `${groupId}:${child.id}`;
		const exists = openTabs.find((t) => t.key === key);
		if (!exists) {
			const newTab: OpenTab = { ...child, key, groupId };
			setOpenTabs((prev) => [...prev, newTab]);
			setActiveTabKey(key);
			navigate(groupId, child.id);
		}
	};

	const closeTab = (key: string) => {
		// 現在の openTabs / activeTabKey から先に fallback を計算
		const idx = openTabs.findIndex((t) => t.key === key);
		const nextTabs = idx === -1 ? openTabs : [...openTabs.slice(0, idx), ...openTabs.slice(idx + 1)];

		// state 更新は純粋に state のみ
		setOpenTabs(nextTabs);

		if (key === activeTabKey) {
			const fallback = nextTabs[idx - 1] ?? nextTabs[idx] ?? null;
			setActiveTabKey(fallback?.key ?? "");
			if (fallback) {
				navigate(fallback.groupId, fallback.id);
			} else {
				navigate("", "");
			}
		}
	};

	return (
		<div className="d-flex shell-wrapper bg-shell text-dark">
			{/* Sidebar */}
			<aside className="shell-sidebar nav-shell d-flex flex-column flex-shrink-0">
				<div className="nav-shell-brand d-flex align-items-center gap-3 px-4 py-4">
					<div className="nav-shell-logo">TMS</div>
					<div className="nav-shell-meta">
						<p className="nav-shell-company mb-1">運送システム</p>
						<p className="nav-shell-location mb-0">株式会社CIMU</p>
					</div>
				</div>
				<nav className="nav-shell-groups d-flex flex-column gap-2 px-2 pb-4">
					{sidebarGroups.map((group) => {
						const isActiveGroup = group.id === activeGroupId;
						const isExpanded = expanded[group.id];
						const iconMap: Record<string, ComponentType<{ size?: number }>> = {
							orders: LayoutGrid,
							dispatch: Truck,
							toll: Compass,
							billing: FileText,
							master: Briefcase,
						};
						const Icon = iconMap[group.id] ?? Building;
						return (
							<div key={group.id} className={`nav-shell-section ${isExpanded ? "expanded" : ""}`}>
								<Button
									variant="link"
									bsPrefix="nav-shell-btn"
									onClick={() => toggleGroup(group.id)}
									aria-expanded={isExpanded}
									className={`nav-shell-group d-flex w-100 align-items-center justify-content-between rounded-2 px-3 py-3 text-start text-decoration-none ${
										isActiveGroup ? "active" : ""
									}`}
								>
									<div className="d-flex align-items-center gap-3">
										<span className="nav-shell-icon">
											<Icon size={16} />
										</span>
										<div className="min-w-0">
											<p className="fw-semibold mb-1 text-white">{group.label}</p>
										</div>
									</div>
									<span className="chevron-icon text-white-50">
										<ChevronDown className={isExpanded ? "rotate-180" : ""} size={16} />
									</span>
								</Button>

								{isExpanded && (
									<div className="nav-shell-children d-flex flex-column gap-1 mt-1">
										{group.children.map((child) => {
											const isActiveChild = isActiveGroup && child.id === activeChildId;
											return (
												<Button
													key={child.id}
													variant="link"
													bsPrefix="nav-shell-btn"
													onClick={() => openOrFocusTab(group.id, child)}
													className={`nav-shell-child d-flex w-100 align-items-center justify-content-between rounded-2 px-3 py-2 text-start text-decoration-none small ${
														isActiveChild ? "active" : ""
													}`}
												>
													<span className="text-truncate">{child.label}</span>
													{isActiveChild ? (
														<span className="d-inline-flex align-items-center gap-1 text-uppercase text-muted small fw-semibold">
															<FolderOpenDot size={12} /> Active
														</span>
													) : null}
												</Button>
											);
										})}
									</div>
								)}
							</div>
						);
					})}
				</nav>
			</aside>

			{/* Right side */}
			<div className="d-flex flex-grow-1 flex-column">
				<Navbar bg="white" className="border-bottom shadow-sm py-3">
					<Container fluid className="d-flex align-items-center justify-content-between gap-3 px-4">
						<div className="flex-grow-1 min-w-0">
							<p className="text-uppercase small fw-semibold text-secondary mb-1">{activeGroup?.label ?? "モジュール"}</p>
							<h2 className="h4 fw-semibold mb-0 text-truncate">{currentTab?.label ?? activeChild?.label ?? "ビューを選択"}</h2>
						</div>
						{/*ユーザー名表示*/}
						<Badge bg="light" text="secondary" className="rounded-pill px-3 py-2 fw-semibold">
							管理ユーザー
						</Badge>
					</Container>
				</Navbar>
				{/* Tabs */}
				{openTabs.length > 0 && (
					<Tabs
						className="tab-strip tab-rail"
						activeKey={activeTabKey}
						onSelect={(k) => {
							const tab = openTabs.find((t) => t.key === k);
							if (tab) {
								navigate(tab.groupId, tab.id);
							}
						}}
					>
						{openTabs.map((t) => (
							<Tab
								eventKey={t.key}
								title={
									<div className="d-flex align-items-center gap-2">
										<span className="text-truncate">{t.label}</span>
										<span
											className="btn-close tab-close"
											role="button"
											onClick={(e) => {
												e.stopPropagation();
												closeTab(t.key);
											}}
										/>
									</div>
								}
								key={t.key}
							/>
						))}
					</Tabs>
				)}

				{/* Server が描く領域（navigation で差し替わる） */}
				{children}
			</div>
		</div>
	);
}
