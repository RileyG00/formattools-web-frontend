import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea, Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import {
	copyAsRichHtmlTable,
	encloseTextInSingleQuotes,
} from "@/components/utils/textUtils";
import FeatureHeader from "@/components/common/featureHeader";
import { format } from "sql-formatter";
import { isNumber } from "@/components/utils/numberUtils";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const TabularToSqlInsertFormatter = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [table, setTable] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		// Return early if user hasn’t pasted anything yet
		if (!raw) return;

		// Clear any previous error so the UI can refresh cleanly
		if (error) setError(null);

		// ─── Basic form validation ────────────────────────────────────────────────
		if (!table) {
			setError("Please specify the table to insert data into.");
			return;
		}

		// Build a 2‑D array where each inner array represents a row of values
		const rows: string[][] = raw
			.split("\n")
			.filter(Boolean) // discard blank lines
			.map((row) => row.split("\t"));

		if (rows.length === 0) {
			setError("Unable to parse any rows of data from the input.");
			return;
		}

		const MAX_ROWS_PER_INSERT = 1000;

		/**
		 * Helper to translate a chunk of rows into the VALUES segment.
		 */
		const buildValuesSegment = (chunk: string[][]): string =>
			chunk
				.map((row) =>
					row
						.map((value) => {
							// Quote the value if the SQL data type requires it (i.e not a string)
							return isNumber(value)
								? parseInt(value)
								: encloseTextInSingleQuotes(value);
						})
						.join(", "),
				)
				.map((valueList) => `(${valueList})`)
				.join(",\n");

		const insertStatements: string[] = [];

		for (
			let offset = 0;
			offset < rows.length;
			offset += MAX_ROWS_PER_INSERT
		) {
			const chunk = rows.slice(offset, offset + MAX_ROWS_PER_INSERT);
			const valuesSegment = buildValuesSegment(chunk);
			insertStatements.push(
				`insert into ${table} values\n${valuesSegment}`,
			);
		}

		const finalStatement: string = insertStatements.join(";\n\n");

		// Push the result to the UI; if something goes wrong surface the error
		try {
			const formatted: string = format(finalStatement, {
				language: "sql",
				useTabs: true,
				keywordCase: "preserve",
				functionCase: "preserve",
				identifierCase: "preserve",
				linesBetweenQueries: 2,
			});

			setOutput(formatted);
		} catch (e) {
			setOutput("");
			setError((e as Error).message);
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
			<FeatureHeader>Tabular to SQL Insert Statement</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-full">
					<CardHeader>Input Tabular Data</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
							spellCheck="false"
						/>
					</CardBody>
				</Card>
				<Card className="w-[550px] h-full">
					<CardHeader>Insert Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<Input
							name="table"
							label="Insert Into"
							variant="bordered"
							placeholder="database.schema.table"
							value={table}
							onValueChange={setTable}
							spellCheck="false"
							description="Enter the database, schema, and table you want to insert data into."
						/>
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
				<CardHeader>Insert Statement</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="sql">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default TabularToSqlInsertFormatter;
