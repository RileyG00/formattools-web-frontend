import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyAsRichHtmlTable, generateHtmlTable } from "@/utils/textUtils";
import FeatureHeader from "@/components/common/featureHeader";
import { prettify } from "htmlfy";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const SqlToJiraTableFormatter = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [hasHeaderRow, setHasHeaderRow] = useState<boolean>(true);
	const [isPropercaseHeader, setIsPropercaseHeader] = useState<boolean>(true);
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
			// Extract all rows in the supplied data.
			let rows: string[] = raw.split("\n");
			if (rows.length === 0) return;

			// If the header row is in the tabular data, extract it and then remove it from the 'rows' array.
			let headerRow: string[] = [];
			if (hasHeaderRow) {
				headerRow = rows[0].split("\t");
				rows.splice(0, 1);
				if (rows.length === 0) return;
			}

			// Take the rows and split them on the tabular data to break out the columns for the rows.
			let splitRows: string[][] = [];
			rows.forEach((row) => {
				splitRows.push(row.split("\t"));
			});

			let formatted: string = generateHtmlTable(
				headerRow,
				splitRows,
				isPropercaseHeader,
			);

			formatted = prettify(formatted, { tab_size: 4 });
			formatted = formatted.replace(/ {4}/g, "\t");

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
	const handleCopyOutput = (): void => {
		copyAsRichHtmlTable(output);

		addToast({
			color: "success",
			title: "Success",
			description: "Successfully copied text to clipboard.",
		});
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[800px] container flex flex-col w-full gap-4">
			<FeatureHeader>SQL to Jira Table Formatter</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-full">
					<CardHeader>Input Tabular Data</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="w-[550px] h-full">
					<CardHeader>Formatting Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<Checkbox
							color="secondary"
							isSelected={hasHeaderRow}
							onValueChange={setHasHeaderRow}
						>
							Table includes header row
						</Checkbox>
						<Checkbox
							color="secondary"
							isSelected={isPropercaseHeader}
							onValueChange={setIsPropercaseHeader}
						>
							Set header row to Proper Case
						</Checkbox>
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
								Format to Table
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
						<Alert
							color="secondary"
							title="Note"
							description="For the copy and paste to work in Jira, you need to use the 'copy' button above."
						/>
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
				<CardHeader>Output Format</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="html">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default SqlToJiraTableFormatter;
