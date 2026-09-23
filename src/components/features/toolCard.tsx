"use client";

import { ReactNode } from "react";
import { Card } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface ToolCardProps {
	title: ReactNode;
	headerAction?: ReactNode;
	className?: string;
	contentClassName?: string;
	children: ReactNode;
}

// A titled card used for every input, specification, and output panel.
const ToolCard: React.FC<ToolCardProps> = ({
	title,
	headerAction,
	className,
	contentClassName,
	children,
}) => {
	return (
		<Card className={`min-w-0 ${className ?? ""}`}>
			<Card.Header className="flex w-full flex-row items-start justify-between gap-2">
				<Card.Title className="text-base font-medium">
					{title}
				</Card.Title>
				{headerAction}
			</Card.Header>
			<Card.Content
				className={`flex min-h-0 flex-1 flex-col gap-4 ${contentClassName ?? ""}`}
			>
				{children}
			</Card.Content>
		</Card>
	);
};

export default ToolCard;
