import Transport020Client from "@/components/transport/Transport020Client";

type Transport020PanelProps = {
  groupId?: string;
  childId?: string;
};

export function Transport020Panel(props: Transport020PanelProps) {
  const { groupId, childId } = props;
  void groupId;
  void childId;

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return <Transport020Client localDate={localDate} />;
}
