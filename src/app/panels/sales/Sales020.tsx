import Sales020Client from "@/components/sales/Sales020Client";

type Sales020PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Sales020Panel(props: Sales020PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const today = new Date();
	// const localMonth = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 7);
	const localMonth = "2026-01";

	return <Sales020Client localMonth={localMonth} />;
}
