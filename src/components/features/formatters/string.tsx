"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { formatters_String } from "@/config/features";
import {
	encloseTextInDoubleQuotes,
	encloseTextInSingleQuotes,
	formatAsArrayString,
	splitOnLineBreak,
} from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import ToolPanels, { toolPanelClassName } from "../toolPanels";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import CheckboxOption from "../checkboxOption";
import OptionSelect, { SelectOption } from "../optionSelect";

//----------------------------------------------------------------------------------------
//Options
//----------------------------------------------------------------------------------------
type OutputFormat = "list" | "array";
type Casing = "preserve" | "uppercase" | "lowercase";
type Quotes = "none" | "double" | "single";
type Delimiter = "tab" | "semicolon" | "comma";

const outputFormatOptions: readonly SelectOption<OutputFormat>[] = [
	{ id: "list", label: "Delimited list" },
	{ id: "array", label: "JSON array" },
];

const casingOptions: readonly SelectOption<Casing>[] = [
	{ id: "preserve", label: "Preserve" },
	{ id: "uppercase", label: "Uppercase" },
	{ id: "lowercase", label: "Lowercase" },
];

const delimiterOptions: readonly SelectOption<Delimiter>[] = [
	{ id: "tab", label: "Tab" },
	{ id: "semicolon", label: "Semicolon" },
	{ id: "comma", label: "Comma" },
];

const quoteOptions: readonly SelectOption<Quotes>[] = [
	{ id: "none", label: "None" },
	{ id: "double", label: "Double" },
	{ id: "single", label: "Single" },
];

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const StringFormatter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [outputFormat, setOutputFormat] = useState<OutputFormat>("list");
	const isFormatAsArray: boolean = outputFormat === "array";
	const [casing, setCasing] = useState<Casing>("preserve");
	const [quotes, setQuotes] = useState<Quotes>("none");
	const [delimiter, setDelimiter] = useState<Delimiter>("comma");
	const [isAddSpaceAfterDelimiter, setIsAddSpaceAfterDelimiter] =
		useState<boolean>(false);

	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			// Normalize casing in one pass
			const strings: string[] = splitOnLineBreak(raw).map((s: string) => {
				if (casing === "uppercase") return s.toUpperCase();
				if (casing === "lowercase") return s.toLowerCase();
				return s; // preserve
			});

			let response: string;

			if (isFormatAsArray) {
				const body: string = strings
					.map(encloseTextInDoubleQuotes)
					.join(", ");
				response = JSON.stringify(
					JSON.parse(formatAsArrayString(body)),
					null,
					"\t",
				);
			} else {
				const quoted: string[] = strings.map((s: string) => {
					if (quotes === "single")
						return encloseTextInSingleQuotes(s);
					if (quotes === "double")
						return encloseTextInDoubleQuotes(s);
					return s;
				});

				const baseDelim: string =
					delimiter === "tab"
						? "\t"
						: delimiter === "semicolon"
							? ";"
							: ",";
				const delim: string =
					baseDelim === "\t"
						? baseDelim
						: `${baseDelim}${isAddSpaceAfterDelimiter ? " " : ""}`;

				response = quoted.join(delim);
			}

			setOutput(response);
		} catch (err) {
			setOutput("");
			setError((err as Error).message);
		}
	};

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<ToolPage item={formatters_String}>
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
						<Button onPress={() => handleFormat(input)}>
							Format String
						</Button>
					</>
				}
			>
				<OptionSelect
					label="Output Format"
					options={outputFormatOptions}
					value={outputFormat}
					onChange={setOutputFormat}
				/>
				<OptionSelect
					label="Casing"
					options={casingOptions}
					value={casing}
					onChange={setCasing}
				/>
				{/* Arrays are always double-quoted and comma separated, so these only apply to lists. */}
				<OptionSelect
					label="Delimiter"
					options={delimiterOptions}
					value={delimiter}
					onChange={setDelimiter}
					isDisabled={isFormatAsArray}
				/>
				<OptionSelect
					label="Quotes"
					options={quoteOptions}
					value={quotes}
					onChange={setQuotes}
					isDisabled={isFormatAsArray}
				/>
				{/* Bottom-aligned and as tall as a select trigger, so it lines up with the dropdowns. */}
				<div className="flex h-9 items-center self-end">
					<CheckboxOption
						isSelected={isAddSpaceAfterDelimiter}
						onChange={setIsAddSpaceAfterDelimiter}
						isDisabled={isFormatAsArray || delimiter === "tab"}
					>
						Add space after delimiter
					</CheckboxOption>
				</div>
			</ToolOptions>
			<ToolPanels>
				<ToolCard
					title="Input String(s)"
					className={toolPanelClassName}
				>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={"How\nNow\nBrown\nCow"}
					/>
				</ToolCard>
				<CodeOutputCard
					title="Output String(s)"
					language="json"
					output={output}
					wrapLongLines={false}
					wrapLines={true}
					onCopy={handleCopyOutput}
				/>
			</ToolPanels>
		</ToolPage>
	);
};

export default StringFormatter;
