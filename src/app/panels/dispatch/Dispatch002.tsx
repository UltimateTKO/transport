import Dispatch002Client from "@/components/dispatch/Dispatch002Client";

type DispatchsPanelProps = {
	groupId?: string;
	childId?: string;
};

export function Dispatch002Panel(props: DispatchsPanelProps) {
	const { groupId, childId } = props;

	return <Dispatch002Client groupId={groupId} childId={childId} />;
}
