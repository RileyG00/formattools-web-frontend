import { Status } from "@/types/siteConfigs";
import { Chip } from "@heroui/chip";

interface FeatureOptionItemStatusChipProps {
	status: Status;
}

export const FeatureOptionItemStatusChip: React.FC<
	FeatureOptionItemStatusChipProps
> = ({ status }) => {
	const color: "default" | "success" | null =
		status === "New" ? "success" : status === "Updated" ? "default" : null;

	return (
		color && (
			<Chip color={color} variant="flat" size="sm">
				{status}
			</Chip>
		)
	);
};
