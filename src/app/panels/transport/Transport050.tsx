import Transport050Client from "@/components/transport/Transport050Client";

type Transport050PanelProps = {
  groupId?: string;
  childId?: string;
};

export function Transport050Panel(props: Transport050PanelProps) {
  const { groupId, childId } = props;
  void groupId;
  void childId;

  return <Transport050Client />;
}
