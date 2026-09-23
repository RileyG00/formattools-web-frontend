"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { escapers_Base64 } from "@/config/features";
import { decodeBase64, encodeBase64 } from "@/utils/textUtils";
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
const Base64EncoderDecoder: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string, isEncoding: boolean): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			if (isEncoding) {
				setOutput(encodeBase64(raw));
			} else {
				setOutput(decodeBase64(raw));
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
		<ToolPage item={escapers_Base64}>
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
							Decode
						</Button>
						<Button onPress={() => handleFormat(input, true)}>
							Encode
						</Button>
					</>
				}
			/>
			<ToolPanels>
				<ToolCard title="Input Text" className={toolPanelClassName}>
					<CodeInput value={input} onChange={setInput} />
				</ToolCard>
				<CodeOutputCard
					title="Output Text"
					output={output}
					onCopy={handleCopyOutput}
				/>
			</ToolPanels>
		</ToolPage>
	);
};

export default Base64EncoderDecoder;
