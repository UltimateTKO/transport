import Invoice020Client from "@/components/invoice/Invoice020Client";

type Invoice020PanelProps = {
  groupId?: string;
  childId?: string;
};

export function Invoice020Panel(props: Invoice020PanelProps) {
  const { groupId, childId } = props;
  void groupId;
  void childId;

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  const localMonth = localDate.slice(0, 7);

  return <Invoice020Client localMonth={localMonth} />;
}
