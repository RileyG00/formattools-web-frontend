import { ReactNode } from "react";

// Height shared by input and output panels. Stacked layouts get a fixed height; on large
// screens the panels stretch to fill whatever height ToolPanels is given.
export const toolPanelClassName: string =
	"h-[55vh] min-h-80 lg:h-auto lg:min-h-0";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface ToolPanelsProps {
	children: ReactNode;
}

// Places input and output side by side on large screens, stacked below that.
// A single child spans the full width.
// On large screens it fills the rest of the viewport (flex-1 from a zero basis, so
// long content can't push it taller), so the page itself doesn't scroll unless the
// window is too short for the minimum height.
const ToolPanels: React.FC<ToolPanelsProps> = ({ children }) => {
	return (
		<div className="grid grid-cols-1 gap-6 lg:min-h-80 lg:flex-1 lg:basis-0 lg:auto-cols-fr lg:grid-flow-col lg:grid-rows-[minmax(0,1fr)]">
			{children}
		</div>
	);
};

export default ToolPanels;
