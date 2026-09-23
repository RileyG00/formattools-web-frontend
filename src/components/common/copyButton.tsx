"use client";

import { Button } from "@heroui/react";
import { DuplicateDocumentIcon } from "./icons";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface CopyButtonProps {
	isDisabled?: boolean;
	size?: "sm" | "md";
	onPress?: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({
	isDisabled,
	size = "md",
	onPress,
}) => {
	return (
		<Button
			isIconOnly
			size={size}
			variant="outline"
			aria-label="Copy output"
			isDisabled={isDisabled}
			onPress={onPress}
		>
			<DuplicateDocumentIcon size={size === "sm" ? 16 : 18} />
		</Button>
	);
};

export default CopyButton;
