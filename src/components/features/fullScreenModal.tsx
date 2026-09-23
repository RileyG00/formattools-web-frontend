"use client";

import { ReactNode } from "react";
import { Modal } from "@heroui/react";
import CopyButton from "@/components/common/copyButton";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FullScreenModalProps {
	title: string;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onCopy?: () => void;
	children: ReactNode;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
	title,
	isOpen,
	onOpenChange,
	onCopy,
	children,
}) => {
	return (
		<Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
			<Modal.Container size="full" scroll="inside">
				<Modal.Dialog aria-label={title}>
					<Modal.CloseTrigger />
					<Modal.Header>
						<Modal.Heading>{title}</Modal.Heading>
					</Modal.Header>
					<Modal.Body className="bg-code rounded-xl p-4">
						{children}
					</Modal.Body>
					{onCopy && (
						<Modal.Footer>
							<CopyButton onPress={onCopy} />
						</Modal.Footer>
					)}
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
};

export default FullScreenModal;
