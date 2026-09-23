"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { escapers_Json } from "@/config/features";
import { escapeJson, unescapeJson } from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import ToolPanels, { toolPanelClassName } from "../toolPanels";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import OptionSelect, {
	IndentationOption,
	indentationOptions,
} from "../optionSelect";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const JsonEscaper: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [indentation, setIndentation] = useState<IndentationOption>("tab");
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

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

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<ToolPage item={escapers_Json}>
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
						<Button
							variant="secondary"
							onPress={() => handleFormat(input, false)}
						>
							Unescape
						</Button>
						<Button onPress={() => handleFormat(input, true)}>
							Escape
						</Button>
					</>
				}
			>
				<OptionSelect
					label="Unescaped Indentation"
					options={indentationOptions}
					value={indentation}
					onChange={setIndentation}
				/>
			</ToolOptions>
			<ToolPanels>
				<ToolCard title="Input JSON" className={toolPanelClassName}>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={`{"employeeId": 1234, "name": {"first": "Data", "last": "Formatters"}}`}
					/>
				</ToolCard>
				<CodeOutputCard
					title="Output JSON"
					language="json"
					output={output}
					onCopy={handleCopyOutput}
				/>
			</ToolPanels>
		</ToolPage>
	);
};

export default JsonEscaper;
