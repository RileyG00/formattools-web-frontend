"use client";

import { ReactNode } from "react";
import { Card } from "@heroui/react";
import ErrorAlert from "./errorAlert";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface ToolOptionsProps {
	// Form fields that configure the tool. Omit for tools with no settings.
	children?: ReactNode;
	// Buttons that run the tool, laid out after the options.
	actions: ReactNode;
	error?: string | null;
}

// Full-width toolbar holding a tool's settings, its actions, and any error.
const ToolOptions: React.FC<ToolOptionsProps> = ({
	children,
	actions,
	error = null,
}) => {
	return (
		<Card>
			<Card.Content className="flex flex-col gap-4">
				{/* Actions sit at the bottom right. The options are at least one button tall, so a
				    single short row (e.g. checkboxes) centers on the buttons instead of sitting low. */}
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					{children && (
						<div className="flex min-w-0 flex-1 flex-wrap items-start gap-x-6 gap-y-4 lg:min-h-9 lg:content-center">
							{children}
						</div>
					)}
					<div className="flex shrink-0 flex-wrap items-center gap-2 lg:ms-auto lg:flex-nowrap lg:justify-end">
						{actions}
					</div>
				</div>
				<ErrorAlert error={error} />
			</Card.Content>
		</Card>
	);
};

export default ToolOptions;
