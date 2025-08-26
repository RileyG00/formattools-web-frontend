import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard, escapeJson, unescapeJson } from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { escapers_Json } from "@/config/features";
import { useDisclosure } from "@heroui/modal";
import FullScreen from "@/components/features/fullScreen.Modal";
import FullScreenButton from "@/components/common/fullScreenButton";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const JsonEscaper: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [indentation, setIndentation] = useState<string>("tab");
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const fullScreenDisclosure = useDisclosure();

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string, isEscaping: boolean): void => {
		if (!raw) return;
		if (error) setError(null);

		let indentStyle: string | number = "\t";

		// If not NaN, meaning that 'tab' was not selected, then set to the digit spacing selected, else, leave as a tab.
		if (indentation === "compact") {
			indentStyle = "";
		} else if (!isNaN(parseInt(indentation))) {
			indentStyle = parseInt(indentation);
		}

		try {
			if (isEscaping) {
				const escapedJsonStr: string = escapeJson(raw);
				setOutput(escapedJsonStr);
			} else {
				const unescapedJsonStr: string = unescapeJson(raw);

				const json: object = JSON.parse(unescapedJsonStr);
				const formatted: string = JSON.stringify(
					json,
					null,
					indentStyle,
				);
				setOutput(formatted);
			}
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
		<>
			<div className="h-[800px] container flex flex-col w-full gap-4">
				<FeatureHeader>{escapers_Json.name}</FeatureHeader>
				<div className="flex flex-row gap-4">
					<Card className="w-full">
						<CardHeader>Input JSON</CardHeader>
						<CardBody>
							<Textarea
								aria-label="Container for the raw text input"
								value={input}
								onValueChange={setInput}
							/>
						</CardBody>
					</Card>
					<Card className="w-[450px] min-w-fit h-full">
						<CardHeader>Formatting Specifications</CardHeader>
						<CardBody className="flex flex-gap gap-4">
							<Select
								aria-label="Options for how to format the JSON output."
								label="JSON Output Indentation"
								selectedKeys={[indentation]}
								onSelectionChange={(e) =>
									setIndentation(e.currentKey ?? "tab")
								}
								variant="bordered"
							>
								<SelectItem key={"2"}>2 spaces</SelectItem>
								<SelectItem key={"4"}>4 spaces</SelectItem>
								<SelectItem key={"tab"}>Tab</SelectItem>
								<SelectItem key={"compact"}>Compact</SelectItem>
							</Select>
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
									color="secondary"
									variant="flat"
									className="w-fit"
									onPress={() => handleFormat(input, false)}
								>
									Unescape
								</Button>
								<Button
									color="primary"
									className="w-fit"
									onPress={() => handleFormat(input, true)}
								>
									Escape
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
				</div>
				<Card className="w-full h-full">
					<CardHeader className="flex flex-row w-full items-start justify-between">
						<span>Output JSON</span>
						<FullScreenButton
							onPress={fullScreenDisclosure.onOpenChange}
						/>
					</CardHeader>
					<CardBody>
						<HighlightSyntax showLineNumbers={true} language="json">
							{output}
						</HighlightSyntax>
					</CardBody>
				</Card>
			</div>
			<FullScreen
				isOpen={fullScreenDisclosure.isOpen}
				onOpenChange={fullScreenDisclosure.onOpenChange}
				onClose={fullScreenDisclosure.onClose}
				onCopy={handleCopyOutput}
			>
				<HighlightSyntax showLineNumbers={true} language="json">
					{output}
				</HighlightSyntax>
			</FullScreen>
		</>
	);
};

export default JsonEscaper;
