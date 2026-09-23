"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { formatters_Json } from "@/config/features";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";
import OptionSelect, {
	IndentationOption,
	indentationOptions,
} from "../optionSelect";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const JsonFormatter: React.FC = () => {
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
	const handleFormat = (raw: string): void => {
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
			const json: object = JSON.parse(raw);
			const formatted: string = JSON.stringify(json, null, indentStyle);
			setOutput(formatted);
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{formatters_Json.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input JSON" className="min-h-[200px] w-full">
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={`{"employeeId": 1234, "name": {"first": "Data", "last": "Formatters"}}`}
					/>
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="h-full min-w-fit"
				>
					<OptionSelect
						label="JSON Output Indentation"
						options={indentationOptions}
						value={indentation}
						onChange={setIndentation}
					/>
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
							Format JSON
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
				title="Output JSON"
				language="json"
				output={output}
				wrapLongLines={false}
				onCopy={handleCopyOutput}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default JsonFormatter;
