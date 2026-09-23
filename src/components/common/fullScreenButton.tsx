"use client";

import { Button } from "@heroui/react";
import { ArrowsPointingOutIcon } from "./icons";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FullScreenButtonProps {
	isDisabled?: boolean;
	onPress: () => void;
}

const FullScreenButton: React.FC<FullScreenButtonProps> = ({
	isDisabled,
	onPress,
}) => {
	return (
		<Button
			isIconOnly
			size="sm"
			variant="outline"
			aria-label="Open full screen for the output."
			isDisabled={isDisabled}
			onPress={onPress}
		>
			<ArrowsPointingOutIcon size={16} />
		</Button>
	);
};

export default FullScreenButton;
