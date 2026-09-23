"use client";

import { Button } from "@heroui/react";
import { DuplicateDocumentIcon } from "./icons";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface CopyButtonProps {
	isDisabled?: boolean;
	onPress?: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ isDisabled, onPress }) => {
	return (
		<Button
			isIconOnly
			variant="secondary"
			aria-label="Copy output"
			isDisabled={isDisabled}
			onPress={onPress}
		>
			<DuplicateDocumentIcon size={18} />
		</Button>
	);
};

export default CopyButton;
