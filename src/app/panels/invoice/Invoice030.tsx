import Invoice030Client from "@/components/invoice/Invoice030Client";

type Invoice030PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Invoice030Panel(props: Invoice030PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const today = new Date();
	// const localMonth = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 7);
	const localMonth = "2026-01";

	return <Invoice030Client localMonth={localMonth} />;
}
