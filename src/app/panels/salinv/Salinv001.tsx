import Salinv001Client from "@/components/salinv/Salinv001Client";
import { getM030_ClientPromise } from "@/libs/MasterDataAccess";

type SalinvPanelProps = {
	groupId?: string;
	childId?: string;
};

export async function Salinv001Panel(props: SalinvPanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const clients = await getM030_ClientPromise();
	const clientList = clients.map((client) => ({
		key: client.ClientCode,
		value: client.ClientName ?? "",
	}));

	return <Salinv001Client clientList={clientList} />;
}
