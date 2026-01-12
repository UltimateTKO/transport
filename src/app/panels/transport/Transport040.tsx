import Transport040Client from "@/components/transport/Transport040Client";

type Transport040PanelProps = {
  groupId?: string;
  childId?: string;
};

export function Transport040Panel(props: Transport040PanelProps) {
  const { groupId, childId } = props;
  void groupId;
  void childId;

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return <Transport040Client localDate={localDate} />;
}
