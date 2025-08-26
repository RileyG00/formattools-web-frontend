import { FC } from "react";
import { Button } from "@heroui/button";
import { ArrowsPointingOutIcon } from "./icons";

interface FullScreenButtonProps {
	onPress: () => void;
}

const FullScreenButton: FC<FullScreenButtonProps> = ({ onPress }) => {
	return (
		<Button
			isIconOnly
			variant="ghost"
			aria-label="Open full screen for the output."
			title="Open full screen"
			onPress={onPress}
			startContent={<ArrowsPointingOutIcon />}
		/>
	);
};

export default FullScreenButton;
