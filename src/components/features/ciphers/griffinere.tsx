"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { Griffinere } from "substitution-ciphers";
import { ciphers_Griffinere } from "@/config/features";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";
import NumberOption from "../numberOption";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const GriffinereCipher: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [key, setKey] = useState<string>("7BBChQKAc5WQ3taqEhUKgBMjEDg7fku3");
	const [alphabet, setAlphabet] = useState<string>(
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	);
	const [minLength, setMinLength] = useState<number>(1);
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string, isCiphering: boolean): void => {
		if (!raw) return;
		if (error) setError(null);

		if (key === "") {
			setError("Cipher Key is required.");
			return;
		}

		if (alphabet === "") {
			setError("Alphabet is required.");
			return;
		}

		try {
			const griffinere: Griffinere = new Griffinere(key, alphabet);

			const msg: string = isCiphering
				? griffinere.encryptStringWithMinimumLength(raw, minLength)
				: griffinere.decryptString(raw);

			setOutput(msg);
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
			<FeatureHeader>{ciphers_Griffinere.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input Text" className="min-h-[200px] w-full">
					<CodeInput value={input} onChange={setInput} />
				</ToolCard>
				<ToolCard
					title="Cipher Specifications"
					className="h-full min-w-fit"
				>
					<div className="flex w-full flex-col gap-4 md:flex-row">
						<TextField
							name="key"
							value={key}
							onChange={setKey}
							className="w-full md:w-[250px]"
						>
							<Label>Cipher Key</Label>
							<Input spellCheck={false} />
						</TextField>
						<NumberOption
							label="Minimum Output Length"
							value={minLength}
							onChange={setMinLength}
							minValue={1}
							maxValue={16384}
							className="w-full md:w-[250px]"
						/>
					</div>
					<TextField
						fullWidth
						name="alphabet"
						value={alphabet}
						onChange={setAlphabet}
					>
						<Label>Cipher Alphabet</Label>
						<Input spellCheck={false} />
					</TextField>
					<div className="flex w-full flex-row justify-end gap-2">
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

export default GriffinereCipher;
