"use client";

import { Button } from "@heroui/react";
import { ArrowsPointingOutIcon } from "./icons";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FullScreenButtonProps {
	onPress: () => void;
}

const FullScreenButton: React.FC<FullScreenButtonProps> = ({ onPress }) => {
	return (
		<Button
			isIconOnly
			size="sm"
			variant="outline"
			aria-label="Open full screen for the output."
			onPress={onPress}
		>
			<ArrowsPointingOutIcon size={18} />
		</Button>
	);
};

export default FullScreenButton;
