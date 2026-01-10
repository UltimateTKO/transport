import Transport010Client from "@/components/transport/Transport010Client";

type Transport010PanelProps = {
  groupId?: string;
  childId?: string;
};

export function Transport010Panel(props: Transport010PanelProps) {
  const { groupId, childId } = props;
  void groupId;
  void childId;

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return <Transport010Client localDate={localDate} />;
}
