import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard } from "@/utils/textUtils";
import { minify, prettify } from "htmlfy";
import FeatureHeader from "@/components/common/featureHeader";
import FeatureProps from "@/interfaces/featureProps";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const HtmlFormatter: React.FC<FeatureProps> = ({ optionItem }) => {
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
		if (error) setError(null);

		let indentStyle: number = 0;

		if (indentation === "tab") {
			indentStyle = 4;
		} else if (!isNaN(parseInt(indentation))) {
			indentStyle = parseInt(indentation);
		}

		try {
			let formatted: string = "";

			if (indentation === "compact") {
				formatted = minify(input);
			} else {
				formatted = prettify(input, { tab_size: indentStyle });

				if (indentation === "tab") {
					formatted = formatted.replace(/ {4}/g, "\t");
				}
			}

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
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[800px] container flex flex-col w-full gap-4">
			<FeatureHeader>{optionItem.name}</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-full">
					<CardHeader>Input HTML</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
							placeholder={`<div><div><strong>employeeId:</strong>1234</div><div><strong>name:</strong><div><div><strong>first:</strong>Data</div><div><strong>last:</strong>Formatters</div></div></div></div>`}
						/>
					</CardBody>
				</Card>
				<Card className="w-[450px] h-full">
					<CardHeader>Formatting Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<Select
							aria-label="Options for how to format the JSON output."
							label="HTML Output Indentation"
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
						<div className="flex flex-row gap-2 justify-end">
							<Button
								color="default"
								className="w-fit"
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
								onPress={() => handleFormat(input)}
							>
								Format HTML
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
				<CardHeader>Output HTML</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="html">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default HtmlFormatter;
