import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import {
	addLineBreak,
	copyToClipboard,
	encloseTextInDoubleQuotes,
	splitOnLineBreak,
	splitOnTab,
} from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { converters_TabularToCsv } from "@/config/features";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import InputSpecsContainer from "../inputSpecsContainer";
import { Textarea } from "@heroui/input";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const TabularToCsvConverter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [input, setInput] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (): void => {
		if (error) setError(null);
		try {
			if (input.includes('"')) {
				throw new Error("Text must not contain double quotes.");
			}

			const rows: string[] = splitOnLineBreak(input);
			const columnRows: string[][] = rows
				.filter((x) => x !== "")
				.map((row) => splitOnTab(row));

			let response: string = "";

			const numRows: number = columnRows.length;

			columnRows.map((rows: string[], index: number) => {
				let rowData: string = "";

				rows.map((rowColumn: string, index: number) => {
					rowData +=
						index === 0
							? encloseTextInDoubleQuotes(rowColumn)
							: `,${encloseTextInDoubleQuotes(rowColumn)}`;
				});

				response +=
					index < numRows - 1 ? addLineBreak(rowData) : rowData;

				setOutput(response);
			});
		} catch (error) {
			const err = error as unknown as Error;

			setOutput("");
			setError(err.message);
		}
	};

	//------------------------------------------------------------------------------------
	//Handle Copying the Text to the Clipboard
	//------------------------------------------------------------------------------------
	const handleCopyOutput = async (): Promise<void> => {
		const isSuccess: boolean = await copyToClipboard(output);

		if (isSuccess) {
			addToast({
				color: "success",
				title: "Success",
				description: "Successfully copied text to clipboard.",
			});
		} else {
			addToast({
				color: "danger",
				title: "Error Occurred",
				description:
					"There was an error when attempting to save the text to the clipboard.",
			});
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{converters_TabularToCsv.name}</FeatureHeader>
			<InputSpecsContainer>
				<Card className="w-full min-h-[200px]">
					<CardHeader>Input Text</CardHeader>
					<CardBody>
						<Textarea
							disableAnimation
							classNames={{
								base: "!h-full",
								inputWrapper: "!h-full",
								innerWrapper: "!h-full",
								input: "!h-full",
							}}
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="min-w-fit h-full">
					<CardHeader>Formatting Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<div className="flex flex-row gap-2 justify-end w-fit">
							<Button
								color="default"
								onPress={() => {
									setInput("");
									setOutput("");
									setError(null);
								}}
							>
								Clear Input
							</Button>
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleFormat()}
							>
								Convert
							</Button>
							<Button
								isIconOnly
								isDisabled={!output}
								title="Copy output"
								startContent={
									<DuplicateDocumentIcon size={18} />
								}
								color="secondary"
								onPress={handleCopyOutput}
							/>
						</div>
						{error && (
							<Alert
								color="danger"
								title="Invalid Input"
								className="max-h-fit"
								description={error}
							/>
						)}
					</CardBody>
				</Card>
			</InputSpecsContainer>
			<Card className="w-full h-full">
				<CardHeader>Output</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="json">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</FeatureOptionItemContainerLayout>
	);
};

export default TabularToCsvConverter;
