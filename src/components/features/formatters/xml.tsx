"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import xmlFormat from "xml-formatter";
import { formatters_Xml } from "@/config/features";
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
const XmlFormatter: React.FC = () => {
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

		let indentStyle: string = "\t";

		if (indentation === "compact") {
			indentStyle = "";
		} else if (indentation === "2") {
			indentStyle = "  ";
		} else if (indentation === "4") {
			indentStyle = "    ";
		}

		try {
			const formatted: string = xmlFormat(raw, {
				indentation: indentStyle,
				lineSeparator: indentStyle === "" ? "" : "\r\n",
				whiteSpaceAtEndOfSelfclosingTag: true,
				forceSelfClosingEmptyTag: true,
			});

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
			<FeatureHeader>{formatters_Xml.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input XML" className="min-h-[200px] w-full">
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={`<root><employeeId>1234</employeeId><name><first>Data</first><last>Formatters</last></name></root>`}
					/>
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="h-full min-w-fit"
				>
					<OptionSelect
						label="XML Output Indentation"
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
							Format XML
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
				title="Output XML"
				language="xml"
				output={output}
				wrapLongLines={false}
				onCopy={handleCopyOutput}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default XmlFormatter;
