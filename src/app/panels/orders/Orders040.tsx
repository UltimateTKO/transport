import Orders040Client from "@/components/orders/Orders040Client";

type Orders040PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Orders040Panel(props: Orders040PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

	return <Orders040Client localDate={localDate} />;
}
