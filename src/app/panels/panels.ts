import { Orders001Panel } from "./orders/Orders001";
import { Orders002Panel } from "./orders/Orders002";
import { Dispatch001Panel } from "./dispatch/Dispatch001";
import { Dispatch002Panel } from "./dispatch/Dispatch002";
import { Result001Panel } from "./result/Result001";
import { Salinv001Panel } from "./salinv/Salinv001";
import { Salinv002Panel } from "./salinv/Salinv002";
import { Operation020Panel } from "./operation/Operation020";

type PanelComponent = React.ComponentType<{ groupId?: string; childId?: string }>;

export const panelRegistry: Record<string, PanelComponent> = {
	"orders:orders001": Orders001Panel,
	"orders:orders002": Orders002Panel,
	"dispatch:dispatch001": Dispatch001Panel,
	"dispatch:dispatch002": Dispatch002Panel,
	"operation:operation020": Operation020Panel,
	"result:result001": Result001Panel,
	"salinv:salinv002": Salinv002Panel,
	"salinv:salinv001": Salinv001Panel,
};
