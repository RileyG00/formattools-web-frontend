import { FC, ReactNode } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { DuplicateDocumentIcon } from "../common/icons";

interface FullScreenProps {
	children: ReactNode;
	isOpen: boolean;
	onOpenChange: () => void;
	onClose: () => void;
	onCopy: () => void;
}

const FullScreen: FC<FullScreenProps> = ({
	children,
	isOpen,
	onOpenChange,
	onClose,
	onCopy,
}) => {
	return (
		<Modal
			size="full"
			scrollBehavior="inside"
			onOpenChange={onOpenChange}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalContent>
				<ModalBody>{children}</ModalBody>
				<ModalFooter>
					<Button
						isIconOnly
						title="Copy output"
						startContent={<DuplicateDocumentIcon size={18} />}
						color="secondary"
						onPress={onCopy}
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FullScreen;
