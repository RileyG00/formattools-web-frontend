"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import xmlFormat from "xml-formatter";
import { escapers_Xml } from "@/config/features";
import { escapeXml, unescapeXml } from "@/utils/textUtils";
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
const XmlEscaper: React.FC = () => {
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

		let indentStyle: string = "\t";

		if (indentation === "compact") {
			indentStyle = "";
		} else if (indentation === "2") {
			indentStyle = "  ";
		} else if (indentation === "4") {
			indentStyle = "    ";
		}

		try {
			if (isEscaping) {
				const escaped: string = escapeXml(raw);
				setOutput(escaped);
			} else {
				const unescaped: string = unescapeXml(raw);
				const formatted: string = xmlFormat(unescaped, {
					indentation: indentStyle,
					lineSeparator: indentStyle === "" ? "" : "\r\n",
					whiteSpaceAtEndOfSelfclosingTag: true,
					forceSelfClosingEmptyTag: true,
				});

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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{escapers_Xml.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input XML" className="min-h-[200px] w-full">
					<CodeInput value={input} onChange={setInput} />
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
						<Button
							variant="secondary"
							onPress={() => handleFormat(input, false)}
						>
							Unescape
						</Button>
						<Button onPress={() => handleFormat(input, true)}>
							Escape
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
				onCopy={handleCopyOutput}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default XmlEscaper;
