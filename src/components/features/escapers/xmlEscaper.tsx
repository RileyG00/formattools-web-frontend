"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import xmlFormat from "xml-formatter";
import { escapers_Xml } from "@/config/features";
import { escapeXml, unescapeXml } from "@/utils/textUtils";
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
		<ToolPage item={escapers_Xml}>
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
				<ToolCard title="Input XML" className={toolPanelClassName}>
					<CodeInput value={input} onChange={setInput} />
				</ToolCard>
				<CodeOutputCard
					title="Output XML"
					language="xml"
					output={output}
					onCopy={handleCopyOutput}
				/>
			</ToolPanels>
		</ToolPage>
	);
};

export default XmlEscaper;
