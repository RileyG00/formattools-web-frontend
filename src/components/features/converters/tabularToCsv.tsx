"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { converters_TabularToCsv } from "@/config/features";
import {
	addLineBreak,
	encloseTextInDoubleQuotes,
	splitOnLineBreak,
	splitOnTab,
} from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import ToolPanels, { toolPanelClassName } from "../toolPanels";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const TabularToCsvConverter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [input, setInput] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (): void => {
		if (error) setError(null);

		try {
			if (input.includes('"')) {
				throw new Error("Text must not contain double quotes.");
			}

			const columnRows: string[][] = splitOnLineBreak(input)
				.filter((x) => x !== "")
				.map((row) => splitOnTab(row));

			const response: string = columnRows
				.map((row) => row.map(encloseTextInDoubleQuotes).join(","))
				.map((rowData, index) =>
					index < columnRows.length - 1
						? addLineBreak(rowData)
						: rowData,
				)
				.join("");

			setOutput(response);
		} catch (error) {
			const err = error as unknown as Error;

			setOutput("");
			setError(err.message);
		}
	};

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<ToolPage item={converters_TabularToCsv}>
			<ToolOptions
				error={error}
				actions={
					<>
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
						<Button onPress={() => handleFormat()}>Convert</Button>
					</>
				}
			/>
			<ToolPanels>
				<ToolCard
					title="Input Tabular Data"
					className={toolPanelClassName}
				>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder="Paste tab-separated rows, e.g. from a spreadsheet"
					/>
				</ToolCard>
				<CodeOutputCard
					title="Output CSV"
					language="json"
					output={output}
					onCopy={handleCopyOutput}
				/>
			</ToolPanels>
		</ToolPage>
	);
};

export default TabularToCsvConverter;
