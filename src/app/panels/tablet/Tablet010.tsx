import Tablet010Client from "@/components/tablet/Tablet010Client";

type Tablet010PanelProps = {
	groupId?: string;
	childId?: string;
};

export function Tablet010Panel(props: Tablet010PanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const now = new Date();
	const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
	const pad2 = (value: number) => value.toString().padStart(2, "0");
	// const deliveryDateTime = `${local.getFullYear()}/${pad2(local.getMonth() + 1)}/${pad2(local.getDate())} ${pad2(local.getHours())}:${pad2(local.getMinutes())}`;
	const deliveryDateTime = `2026/01/21 18:00`;

	return <Tablet010Client deliveryDateTime={deliveryDateTime} />;
}
