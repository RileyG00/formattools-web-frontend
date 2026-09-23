"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { escapers_Base64 } from "@/config/features";
import { decodeBase64, encodeBase64 } from "@/utils/textUtils";
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{escapers_Base64.name}</FeatureHeader>
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
						<Button
							variant="secondary"
							onPress={() => handleFormat(input, false)}
						>
							Decode
						</Button>
						<Button onPress={() => handleFormat(input, true)}>
							Encode
						</Button>
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard title="Output Text" output={output} />
		</FeatureOptionItemContainerLayout>
	);
};

export default Base64EncoderDecoder;
