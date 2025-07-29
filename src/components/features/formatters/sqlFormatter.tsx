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
import { format, KeywordCase } from "sql-formatter";
import FeatureHeader from "@/components/common/featureHeader";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const SqlFormatter = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [indentation, setIndentation] = useState<string>("tab");
	const [keywordCasing, setKeywordCasing] = useState<string>("preserve");
	const [identifierCasing, setIdentifierCasing] =
		useState<string>("preserve");
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			const formatted: string = format(input, {
				language: "sql",
				tabWidth: !isNaN(parseInt(indentation))
					? parseInt(indentation)
					: 1, // If not a NaN, it means the user is not using the tab option,
				useTabs: indentation === "tab",
				keywordCase: keywordCasing as unknown as KeywordCase,
				functionCase: keywordCasing as unknown as KeywordCase,
				identifierCase: identifierCasing as unknown as KeywordCase,
				linesBetweenQueries: 2,
			});

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
			<FeatureHeader>SQL Formatter</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-full">
					<CardHeader>Input SQL</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="min-w-[450px] h-full">
					<CardHeader>Formatting Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<Select
							aria-label="Options for how to format the SQL output."
							label="SQL Output Indentation"
							selectedKeys={[indentation]}
							onSelectionChange={(e) =>
								setIndentation(e.currentKey ?? "tab")
							}
							variant="bordered"
						>
							<SelectItem key={"2"}>2 spaces</SelectItem>
							<SelectItem key={"4"}>4 spaces</SelectItem>
							<SelectItem key={"tab"}>Tab</SelectItem>
						</Select>
						<div className="flex flex-row gap-2">
							<Select
								aria-label="Options for how to set the keyword casing."
								label="Keyword Casing"
								selectedKeys={[keywordCasing]}
								onSelectionChange={(e) =>
									setKeywordCasing(e.currentKey ?? "preserve")
								}
								variant="bordered"
							>
								<SelectItem key={"preserve"}>
									Preserve
								</SelectItem>
								<SelectItem key={"upper"}>Uppercase</SelectItem>
								<SelectItem key={"lower"}>Lowercase</SelectItem>
							</Select>
							<Select
								aria-label="Options for how to set the identifier casing."
								label="Identifier Casing"
								selectedKeys={[identifierCasing]}
								onSelectionChange={(e) =>
									setIdentifierCasing(
										e.currentKey ?? "preserve",
									)
								}
								variant="bordered"
							>
								<SelectItem key={"preserve"}>
									Preserve
								</SelectItem>
								<SelectItem key={"upper"}>Uppercase</SelectItem>
								<SelectItem key={"lower"}>Lowercase</SelectItem>
							</Select>
						</div>
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
								Format SQL
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
				<CardHeader>Output SQL</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="sql">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default SqlFormatter;
