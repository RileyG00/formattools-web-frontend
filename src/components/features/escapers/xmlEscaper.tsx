import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import xmlFormat from "xml-formatter";
import { copyToClipboard, escapeXml, unescapeXml } from "@/utils/textUtils";
import FeatureHeader from "@/components/common/featureHeader";
import FeatureProps from "@/interfaces/featureProps";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const XmlEscaper: React.FC<FeatureProps> = ({ optionItem }) => {
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
	const handleFormat = (raw: string, isEscaping: boolean): void => {
		if (!raw) return;
		if (error) setError(null);

		let indentStyle: string | number = "\t";

		if (indentation === "compact") {
			indentStyle = "";
		} else if (indentation === "2") {
			indentStyle = "  ";
		} else if (indentation === "4") {
			indentStyle = "    ";
		}

		try {
			if (isEscaping) {
				const escaped: string = escapeXml(raw);
				setOutput(escaped);
			} else {
				const unescaped: string = unescapeXml(raw);
				const formatted: string = xmlFormat(unescaped, {
					indentation: indentStyle,
					lineSeparator: indentStyle === "" ? "" : "\r\n",
					whiteSpaceAtEndOfSelfclosingTag: true,
					forceSelfClosingEmptyTag: true,
				});

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
		<div className="h-[800px] container flex flex-col w-full gap-4">
			<FeatureHeader>{optionItem.name}</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-full">
					<CardHeader>Input XML</CardHeader>
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
							aria-label="Options for how to format the XML output."
							label="XML Output Indentation"
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
				<CardHeader>Output XML</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="xml">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default XmlEscaper;
