"use client";

import { useState } from "react";
import { Button, Description, Label, Radio, RadioGroup } from "@heroui/react";
import { formatters_String } from "@/config/features";
import {
	encloseTextInDoubleQuotes,
	encloseTextInSingleQuotes,
	formatAsArrayString,
	splitOnLineBreak,
} from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";
import CheckboxOption from "../checkboxOption";
import OptionSelect, { SelectOption } from "../optionSelect";

//----------------------------------------------------------------------------------------
//Options
//----------------------------------------------------------------------------------------
type Casing = "preserve" | "uppercase" | "lowercase";
type Quotes = "none" | "double" | "single";
type Delimiter = "tab" | "semicolon" | "comma";

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
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(false);
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{formatters_String.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="Input String(s)"
					className="min-h-[200px] w-full"
				>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={"How\nNow\nBrown\nCow"}
					/>
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="h-fit min-w-fit"
				>
					<OptionSelect
						label="Casing Options"
						options={casingOptions}
						value={casing}
						onChange={setCasing}
					/>
					<div className="flex w-full min-w-fit flex-col-reverse gap-4 md:flex-row">
						<div className="flex w-full flex-col gap-4">
							<CheckboxOption
								isSelected={isFormatAsArray}
								onChange={setIsFormatAsArray}
							>
								Return results as array
							</CheckboxOption>
							<CheckboxOption
								isSelected={isAddSpaceAfterDelimiter}
								onChange={setIsAddSpaceAfterDelimiter}
							>
								Add space after delimiter
							</CheckboxOption>
						</div>
						<OptionSelect
							label="Delimiter Options"
							options={delimiterOptions}
							value={delimiter}
							onChange={setDelimiter}
							className="min-w-[225px]"
							description="Has no effect if formatting as an array."
						/>
					</div>
					<RadioGroup
						orientation="horizontal"
						value={quotes}
						onChange={(value) => setQuotes(value as Quotes)}
					>
						<Label>Apply Quotes</Label>
						<Description>
							Has no effect if formatting as an array.
						</Description>
						{quoteOptions.map((option) => (
							<Radio key={option.id} value={option.id}>
								<Radio.Content>
									<Radio.Control>
										<Radio.Indicator />
									</Radio.Control>
									{option.label}
								</Radio.Content>
							</Radio>
						))}
					</RadioGroup>
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
							Format String
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
				title="Output String(s)"
				language="json"
				output={output}
				wrapLongLines={false}
				wrapLines={true}
				onCopy={handleCopyOutput}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default StringFormatter;
