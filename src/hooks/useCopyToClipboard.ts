"use client";

import { useCallback } from "react";
import { toast } from "@heroui/react";
import { copyToClipboard } from "@/utils/textUtils";

// Copies text to the clipboard and reports the outcome with a toast.
export const useCopyToClipboard = () => {
	return useCallback(async (text: string): Promise<void> => {
		const isSuccess: boolean = await copyToClipboard(text);

		if (isSuccess) {
			toast.success("Success", {
				description: "Successfully copied text to clipboard.",
			});
		} else {
			toast.danger("Error Occurred", {
				description:
					"There was an error when attempting to save the text to the clipboard.",
			});
		}
	}, []);
};
