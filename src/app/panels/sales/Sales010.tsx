import Sales010Client from "@/components/sales/Sales010Client";

type Sales010PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Sales010Panel(props: Sales010PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

	return <Sales010Client localDate={localDate} />;
}
