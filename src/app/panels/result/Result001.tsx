import Result001Client from "@/components/result/Result001Client";
import { buildResult001Fixture } from "./result001Fixtures";

type ResultPanelProps = {
	groupId?: string;
	childId?: string;
};

export async function Result001Panel(props: ResultPanelProps) {
	const { groupId, childId } = props;
	void groupId;
	void childId;

	const resultProps = buildResult001Fixture();

	return (
		<Result001Client
			localDate={resultProps.localDate}
			driverList={resultProps.driverList}
			vehicleList={resultProps.vehicleList}
			completionReasons={resultProps.completionReasons}
			paymentMethods={resultProps.paymentMethods}
			stopSummaries={resultProps.stopSummaries}
		/>
	);
}
