"use client";

import { Chip } from "@heroui/react";
import { Status } from "@/types/siteConfigs";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureOptionItemStatusChipProps {
	status: Status;
}

const FeatureOptionItemStatusChip: React.FC<
	FeatureOptionItemStatusChipProps
> = ({ status }) => {
	if (!status) return null;

	return (
		<Chip
			size="sm"
			variant="soft"
			color={status === "New" ? "success" : "default"}
		>
			{status}
		</Chip>
	);
};

export default FeatureOptionItemStatusChip;
