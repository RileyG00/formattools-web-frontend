import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard } from "@/components/utils/textUtils";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const JsonFormatter = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [indentation, setIndentation] = useState<string>("tab");
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		if (!raw) return;

		let indentStyle: string | number = "\t";

		// If NaN, meaning that 'tab' was not selected, then set to the digit spacing selected, else, leave as a tab.
		if (indentation === "compact") {
			indentStyle = "";
		} else if (!isNaN(parseInt(indentation))) {
			indentStyle = parseInt(indentation);
		}

		try {
			const json: object = JSON.parse(raw);
			const formatted: string = JSON.stringify(json, null, indentStyle);
			setOutput(formatted);
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
	//Effects
	//------------------------------------------------------------------------------------
	useEffect(() => {
		if (error) {
			setError(null);
		}
	}, [input]);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[750px] flex flex-row w-full justify-between gap-4">
			<Card className="w-full h-full max-w-[550px]">
				<CardHeader>Input JSON</CardHeader>
				<CardBody className="w-full h-full">
					<Textarea
						aria-label="Container for the raw text input"
						value={input}
						onValueChange={setInput}
						classNames={{
							input: "min-h-[660px]",
						}}
					/>
				</CardBody>
			</Card>
			<Card className="w-[75%] max-h-fit">
				<CardHeader>Formatting Specifications</CardHeader>
				<CardBody className="flex flex-gap gap-6">
					<Select
						aria-label="Options for how to format the JSON output"
						label="JSON output indentation"
						selectedKeys={[indentation]}
						onSelectionChange={(e) =>
							setIndentation(e.currentKey ?? "\t")
						}
						variant="bordered"
					>
						<SelectItem key={"2"}>2 spaces</SelectItem>
						<SelectItem key={"4"}>4 spaces</SelectItem>
						<SelectItem key={"tab"}>Tab</SelectItem>
						<SelectItem key={"compact"}>Compact</SelectItem>
					</Select>
					<div className="flex flex-row gap-2">
						<Button
							color="default"
							className="w-fit"
							onPress={() => {
								setInput("");
								setOutput("");
								setError(null);
							}}
						>
							Clear Inputs
						</Button>
						<Button
							color="primary"
							className="w-fit"
							onPress={() => handleFormat(input)}
						>
							Format JSON
						</Button>
						<Button
							isIconOnly
							isDisabled={!output}
							title="Copy output"
							startContent={<DuplicateDocumentIcon size={18} />}
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
			<Card className="w-full max-w-[550px]">
				<CardHeader>Output JSON</CardHeader>
				<CardBody>
					<HighlightSyntax language="json">{output}</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default JsonFormatter;
