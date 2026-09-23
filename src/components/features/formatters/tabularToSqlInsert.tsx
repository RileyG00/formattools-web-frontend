"use client";

import { useState } from "react";
import { Button, Description, Input, Label, TextField } from "@heroui/react";
import { format } from "sql-formatter";
import { formatters_TabularToSql } from "@/config/features";
import {
	encloseTextInSingleQuotes,
	escapeAllSingleQuotes,
} from "@/utils/textUtils";
import { isNumber } from "@/utils/numberUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const TabularToSqlInsertFormatter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [table, setTable] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

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

		// This is a SQL limitation.
		// Each insert statement can only insert 1,000 rows at a time, so break the insert statments up
		const MAX_ROWS_PER_INSERT = 1_000;

		// Helper to translate a chunk of rows into the VALUES segment.
		const buildValuesSegment = (chunk: string[][]): string =>
			chunk
				.map((row) =>
					row
						.map((value) => {
							// Quote the value if the SQL data type requires it (i.e not a string)
							return isNumber(value)
								? parseInt(value)
								: encloseTextInSingleQuotes(
										escapeAllSingleQuotes(value),
									);
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
				language: "tsql",
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

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{formatters_TabularToSql.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="Input Tabular Data"
					className="min-h-[200px] w-full"
				>
					<CodeInput value={input} onChange={setInput} />
				</ToolCard>
				<ToolCard
					title="Insert Specifications"
					className="h-full md:max-w-md"
				>
					<TextField
						fullWidth
						name="table"
						value={table}
						onChange={setTable}
					>
						<Label>Insert Into</Label>
						<Input
							placeholder="database.schema.table"
							spellCheck={false}
						/>
						<Description>
							You can also specify the column names to insert
							into. E.g.: database.schema.table (ColumnA, ColumnB)
						</Description>
					</TextField>
					<div className="flex flex-row justify-end gap-2">
						<Button
							variant="tertiary"
							onPress={() => {
								setInput("");
								setOutput("");
								setError(null);
							}}
						>
							Clear Input
						</Button>
						<Button onPress={() => handleFormat(input)}>
							Format to Table
						</Button>
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard
				allowFullScreen
				title="Insert Statement"
				language="sql"
				output={output}
				onCopy={handleCopyOutput}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default TabularToSqlInsertFormatter;
