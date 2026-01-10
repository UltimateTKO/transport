import { Operation020Panel } from "./operation/Operation020";
import { Transport010Panel } from "./transport/Transport010";

type PanelComponent = React.ComponentType<{ groupId?: string; childId?: string }>;

export const panelRegistry: Record<string, PanelComponent> = {
	"operation:operation020": Operation020Panel,
	"transport:transport010": Transport010Panel,
};
