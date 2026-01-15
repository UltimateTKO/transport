import { Handy010Panel } from "./handy/Handy010";
import { Handy020Panel } from "./handy/Handy020";
import { Operation020Panel } from "./operation/Operation020";
import { Sales010Panel } from "./sales/Sales010";
import { Transport010Panel } from "./transport/Transport010";
import { Transport020Panel } from "./transport/Transport020";
import { Transport040Panel } from "./transport/Transport040";
import { Transport050Panel } from "./transport/Transport050";
import { Invoice020Panel } from "./invoice/Invoice020";

type PanelComponent = React.ComponentType<{ groupId?: string; childId?: string }>;

export const panelRegistry: Record<string, PanelComponent> = {
	"handy:handy010": Handy010Panel,
	"handy:handy020": Handy020Panel,
	"operation:operation020": Operation020Panel,
	"sales:sales010": Sales010Panel,
	"invoice:invoice020": Invoice020Panel,
	"transport:transport010": Transport010Panel,
	"transport:transport020": Transport020Panel,
	"transport:transport040": Transport040Panel,
	"transport:transport050": Transport050Panel,
};
