import { Operation020Panel } from "./operation/Operation020";
import { Transport010Panel } from "./transport/Transport010";
import { Transport020Panel } from "./transport/Transport020";

type PanelComponent = React.ComponentType<{ groupId?: string; childId?: string }>;

export const panelRegistry: Record<string, PanelComponent> = {
	"operation:operation020": Operation020Panel,
	"transport:transport010": Transport010Panel,
	"transport:transport020": Transport020Panel,
};
