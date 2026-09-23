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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{converters_TabularToCsv.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input Text" className="min-h-[200px] w-full">
					<CodeInput value={input} onChange={setInput} />
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="h-full min-w-fit"
				>
					<div className="flex w-fit flex-row justify-end gap-2">
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
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard title="Output" language="json" output={output} />
		</FeatureOptionItemContainerLayout>
	);
};

export default TabularToCsvConverter;
