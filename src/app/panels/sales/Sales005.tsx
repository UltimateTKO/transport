import Sales005Client from "@/components/sales/Sales005Client";

type Sales005PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Sales005Panel(props: Sales005PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const today = new Date();
	// const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
	const localDate = "2026-02-01";

	return <Sales005Client localDate={localDate} />;
}
