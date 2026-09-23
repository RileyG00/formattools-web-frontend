"use client";

import { useState } from "react";
import { Button, Link, toast } from "@heroui/react";
import { prettify } from "htmlfy";
import { formatters_TabularToTable } from "@/config/features";
import { env } from "@/config/env";
import { copyAsRichHtmlTable, generateHtmlTable } from "@/utils/textUtils";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import ErrorAlert from "../errorAlert";
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{formatters_TabularToTable.name}</FeatureHeader>
			{env.chromeExtensionTabularToTable && (
				<p>
					Want to skip the website? Get the Google Chrome Extension
					for formatting in Jira:{" "}
					<Link
						href={env.chromeExtensionTabularToTable}
						target="_blank"
						rel="noopener noreferrer"
					>
						Extension Store
						<Link.Icon />
					</Link>
				</p>
			)}
			<InputSpecsContainer isDismissFlexGrow isDismissColReversal>
				<ToolCard
					title="Input Tabular Data"
					className="min-h-[200px] w-full"
				>
					<CodeInput value={input} onChange={setInput} />
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="h-fit min-w-fit"
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
					<div className="flex flex-row justify-end gap-2">
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
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
		</FeatureOptionItemContainerLayout>
	);
};

export default TabularToTableFormatter;
