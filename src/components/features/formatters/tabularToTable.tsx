"use client";

import { useState } from "react";
import { Button, Link, toast } from "@heroui/react";
import { prettify } from "htmlfy";
import { formatters_TabularToTable } from "@/config/features";
import { env } from "@/config/env";
import { copyAsRichHtmlTable, generateHtmlTable } from "@/utils/textUtils";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import ToolPanels, { toolPanelClassName } from "../toolPanels";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CheckboxOption from "../checkboxOption";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const TabularToTableFormatter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [hasHeaderRow, setHasHeaderRow] = useState<boolean>(true);
	const [isPropercaseHeader, setIsPropercaseHeader] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Copying the Text to the Clipboard
	//------------------------------------------------------------------------------------
	const handleCopyOutput = async (formatted: string): Promise<void> => {
		try {
			await copyAsRichHtmlTable(formatted);

			toast.success("Success", {
				description:
					"Successfully copied formatted table to clipboard.",
			});
		} catch {
			toast.danger("Error Occurred", {
				description:
					"There was an error when attempting to save the table to the clipboard.",
			});
		}
	};

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			// Extract all rows in the supplied data.
			const rows: string[] = raw.split("\n");
			if (rows.length === 0) return;

			if (rows.length === 1 && hasHeaderRow) {
				setError(
					`Input must include a header and at least one row if the 'Table includes header row' option is selected.`,
				);
			}

			// If the header row is in the tabular data, extract it and then remove it from the 'rows' array.
			let headerRow: string[] = [];
			if (hasHeaderRow) {
				headerRow = rows[0].split("\t");
				rows.splice(0, 1);
				if (rows.length === 0) return;
			}

			// Take the rows and split them on the tabular data to break out the columns for the rows.
			const splitRows: string[][] = rows.map((row) => row.split("\t"));

			let formatted: string = generateHtmlTable(
				headerRow,
				splitRows,
				isPropercaseHeader,
			);

			formatted = prettify(formatted, { tab_size: 4 });
			formatted = formatted.replace(/ {4}/g, "\t");

			handleCopyOutput(formatted);
		} catch (error) {
			const err = error as unknown as Error;

			setError(err.message);
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<ToolPage
			item={formatters_TabularToTable}
			headerExtra={
				env.chromeExtensionTabularToTable && (
					<p className="text-sm text-muted">
						Want to skip the website? Get the Google Chrome
						extension for formatting in Jira:{" "}
						<Link
							href={env.chromeExtensionTabularToTable}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm"
						>
							Extension Store
							<Link.Icon />
						</Link>
					</p>
				)
			}
		>
			<ToolOptions
				error={error}
				actions={
					<>
						<Button
							variant="tertiary"
							onPress={() => {
								setInput("");
								setError(null);
							}}
						>
							Clear Input
						</Button>
						<Button onPress={() => handleFormat(input)}>
							Format &amp; Copy to Clipboard
						</Button>
					</>
				}
			>
				<CheckboxOption
					isSelected={hasHeaderRow}
					onChange={setHasHeaderRow}
				>
					Table includes header row
				</CheckboxOption>
				<CheckboxOption
					isSelected={isPropercaseHeader}
					onChange={setIsPropercaseHeader}
				>
					Set header row to Proper Case
				</CheckboxOption>
			</ToolOptions>
			<ToolPanels>
				<ToolCard
					title="Input Tabular Data"
					className={toolPanelClassName}
				>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder="Paste rows copied from a SQL result set or spreadsheet"
					/>
				</ToolCard>
			</ToolPanels>
		</ToolPage>
	);
};

export default TabularToTableFormatter;
