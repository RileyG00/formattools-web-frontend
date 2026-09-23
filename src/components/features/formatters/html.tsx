"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { minify, prettify } from "htmlfy";
import { formatters_Html } from "@/config/features";
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
const HtmlFormatter: React.FC = () => {
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

		let indentStyle: number = 0;

		if (indentation === "tab") {
			indentStyle = 4;
		} else if (!isNaN(parseInt(indentation))) {
			indentStyle = parseInt(indentation);
		}

		try {
			let formatted: string = "";

			if (indentation === "compact") {
				formatted = minify(raw);
			} else {
				formatted = prettify(raw, { tab_size: indentStyle });

				if (indentation === "tab") {
					formatted = formatted.replace(/ {4}/g, "\t");
				}
			}

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
			<FeatureHeader>{formatters_Html.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input HTML" className="min-h-[200px] w-full">
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={`<div><div><strong>employeeId:</strong>1234</div><div><strong>name:</strong><div><div><strong>first:</strong>Data</div><div><strong>last:</strong>Formatters</div></div></div></div>`}
					/>
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="h-full min-w-fit"
				>
					<OptionSelect
						label="HTML Output Indentation"
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
							Format HTML
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
				title="Output HTML"
				language="html"
				output={output}
				wrapLongLines={false}
				wrapLines={false}
				onCopy={handleCopyOutput}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default HtmlFormatter;
