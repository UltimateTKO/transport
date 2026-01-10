import Operation020Client from "@/components/operation/Operation020Client";

type Operation020PanelProps = {
  groupId?: string;
  childId?: string;
};

export function Operation020Panel(props: Operation020PanelProps) {
  const { groupId, childId } = props;
  void groupId;
  void childId;

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return <Operation020Client localDate={localDate} />;
}
