import Handy010Client from "@/components/handy/Handy010Client";

type Handy010PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Handy010Panel(props: Handy010PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

	return <Handy010Client localDate={localDate} />;
}
