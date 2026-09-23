"use client";

import { Alert } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface ErrorAlertProps {
	error: string | null;
	title?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
	error,
	title = "Invalid Input",
}) => {
	if (!error) return null;

	return (
		<Alert status="danger" className="max-h-fit">
			<Alert.Indicator />
			<Alert.Content>
				<Alert.Title>{title}</Alert.Title>
				<Alert.Description className="break-words">
					{error}
				</Alert.Description>
			</Alert.Content>
		</Alert>
	);
};

export default ErrorAlert;
