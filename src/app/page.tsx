import { GetSidebarData, SidebarGroup } from "@/libs/sidebar";
import ShellClient from "@/components/ShellClient";
import { panelRegistry } from "@/app/panels/panels";

type PageProps = {
	searchParams?: { g?: string; c?: string };
};

export default async function Page({ searchParams }: PageProps) {
	const resolvedParams = await searchParams;
	const sidebarGroups: SidebarGroup[] = GetSidebarData();

	const groupId = resolvedParams?.g && sidebarGroups.some((g) => g.id === resolvedParams.g) ? resolvedParams.g : "";

	const group = sidebarGroups.find((g) => g.id === groupId);
	const childId = resolvedParams?.c && group?.children.some((c) => c.id === resolvedParams.c) ? resolvedParams.c : "";

	const key = `${groupId}:${childId}`;
	const Panel = panelRegistry[key] ?? null;

	return (
		<ShellClient sidebarGroups={sidebarGroups} activeGroupId={groupId} activeChildId={childId}>
			{/* ← Server Component を children で渡す（Client から import しない） */}
			<main className="flex-grow-1 overflow-auto p-1">
				{Panel ? (
					<section className="d-flex flex-column gap-4">
						<main className="panel-area panel-surface">
							<Panel groupId={groupId} childId={childId} />
						</main>
					</section>
				) : (
					<div className="placeholder-panel">
						<p className="small text-muted mb-0">ナビゲーションからビューを選択するとダッシュボードが開きます。</p>
					</div>
				)}
			</main>
		</ShellClient>
	);
}
