"use client";

import { ReactNode } from "react";
import { FeatureOptionItem } from "@/types/siteConfigs";
import FeatureHeader from "./featureHeader";
import FeatureSubHeader from "./featureSubHeader";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface ToolPageProps {
	item: FeatureOptionItem;
	// Extra content rendered under the description (e.g. a related link).
	headerExtra?: ReactNode;
	children: ReactNode;
}

// Page shell for a single tool: title and short description, then the tool itself.
const ToolPage: React.FC<ToolPageProps> = ({ item, headerExtra, children }) => {
	return (
		<div className="flex min-w-0 flex-1 flex-col gap-6">
			<header className="flex flex-col gap-1">
				<FeatureHeader>{item.name}</FeatureHeader>
				<FeatureSubHeader>{item.description}</FeatureSubHeader>
				{headerExtra}
			</header>
			{children}
		</div>
	);
};

export default ToolPage;
