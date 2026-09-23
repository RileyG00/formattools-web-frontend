"use client";

import { ReactNode } from "react";
import { Typography } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureSubHeaderProps {
	children: ReactNode;
}

const FeatureSubHeader: React.FC<FeatureSubHeaderProps> = ({ children }) => {
	return (
		<Typography.Paragraph
			color="muted"
			className="my-2 max-w-full text-base text-balance md:max-w-2/3 md:text-lg"
		>
			{children}
		</Typography.Paragraph>
	);
};

export default FeatureSubHeader;
