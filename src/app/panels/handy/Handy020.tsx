import Handy020Client from "@/components/handy/Handy020Client";

type Handy020PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Handy020Panel(props: Handy020PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const today = new Date();
	const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

	return <Handy020Client localDate={localDate} />;
}
