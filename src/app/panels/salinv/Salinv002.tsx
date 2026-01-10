import Salinv002Client from "@/components/salinv/Salinv002Client";

type SalinvPanelProps = {
	groupId?: string;
	childId?: string;
};

export async function Salinv002Panel(props: SalinvPanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	return <Salinv002Client />;
}
