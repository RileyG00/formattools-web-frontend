"use client";

import { ReactNode } from "react";
import { Typography } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureHeaderProps {
	children: ReactNode;
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({ children }) => {
	return (
		<Typography.Heading
			level={1}
			className="w-fit text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
		>
			{children}
		</Typography.Heading>
	);
};

export default FeatureHeader;
