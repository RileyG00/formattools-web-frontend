"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { Griffinere } from "substitution-ciphers";
import { ciphers_Griffinere } from "@/config/features";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import ToolPanels, { toolPanelClassName } from "../toolPanels";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
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
		<ToolPage item={ciphers_Griffinere}>
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
			>
				<TextField
					name="key"
					value={key}
					onChange={setKey}
					className="w-full sm:w-80"
				>
					<Label>Cipher Key</Label>
					<Input spellCheck={false} className="font-mono" />
				</TextField>
				<TextField
					name="alphabet"
					value={alphabet}
					onChange={setAlphabet}
					className="w-full sm:w-[28rem]"
				>
					<Label>Cipher Alphabet</Label>
					<Input spellCheck={false} className="font-mono" />
				</TextField>
				<NumberOption
					label="Minimum Output Length"
					value={minLength}
					onChange={setMinLength}
					minValue={1}
					maxValue={16384}
				/>
			</ToolOptions>
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

export default GriffinereCipher;
