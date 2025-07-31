import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard } from "@/utils/textUtils";
import { Griffinere } from "substitution-ciphers";
import FeatureHeader from "@/components/common/featureHeader";
import FeatureProps from "@/interfaces/featureProps";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const GriffinereCipher: React.FC<FeatureProps> = ({ optionItem }) => {
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
			if (isCiphering) {
				const griffinere: Griffinere = new Griffinere(key, alphabet);
				const msg = griffinere.encryptStringWithMinimumLength(
					input,
					minLength,
				);

				setOutput(msg);
			} else {
				const griffinere: Griffinere = new Griffinere(key, alphabet);
				const msg = griffinere.decryptString(input);

				setOutput(msg);
			}
		} catch (error) {
			const err = error as unknown as Error;

			setOutput("");
			setError(err.message);
		}
	};

	//------------------------------------------------------------------------------------
	//Handle Copying the Text to the Clipboard
	//------------------------------------------------------------------------------------
	const handleCopyOutput = async (): Promise<void> => {
		const isSuccess: boolean = await copyToClipboard(output);

		if (isSuccess) {
			addToast({
				color: "success",
				title: "Success",
				description: "Successfully copied text to clipboard.",
			});
		} else {
			addToast({
				color: "danger",
				title: "Error Occurred",
				description:
					"There was an error when attempting to save the text to the clipboard.",
			});
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[800px] container flex flex-col w-full gap-4">
			<FeatureHeader>{optionItem.name}</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-full">
					<CardHeader>Input Text</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="w-[1000px] min-w-fit h-full">
					<CardHeader>Cipher Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<div className="flex flex-row gap-4">
							<Input
								type="text"
								variant="bordered"
								value={key}
								onValueChange={setKey}
								name="key"
								label="Cipher Key"
								description="Each character must be included in the Alphabet."
							/>
							<NumberInput
								type="number"
								variant="bordered"
								value={minLength}
								onValueChange={setMinLength}
								name="minLength"
								minValue={1}
								maxValue={16384}
								label="Minimum Output Length"
								description="Set to 1 for no minimum length."
							/>
						</div>
						<Input
							type="text"
							variant="bordered"
							value={alphabet}
							onValueChange={setAlphabet}
							name="alphabet"
							label="Cipher Alphabet"
							description="Each character must be unique."
						/>
						<div className="flex flex-row gap-2 justify-end w-full">
							<Button
								color="default"
								onPress={() => {
									setInput("");
									setOutput("");
									setError(null);
								}}
							>
								Clear Input
							</Button>
							<Button
								color="secondary"
								variant="flat"
								className="w-fit"
								onPress={() => handleFormat(input, false)}
							>
								Decode
							</Button>
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleFormat(input, true)}
							>
								Encode
							</Button>
							<Button
								isIconOnly
								isDisabled={!output}
								title="Copy output"
								startContent={
									<DuplicateDocumentIcon size={18} />
								}
								color="secondary"
								onPress={handleCopyOutput}
							/>
						</div>
						{error && (
							<Alert
								color="danger"
								title="Invalid Input"
								className="max-h-fit"
								description={error}
							/>
						)}
					</CardBody>
				</Card>
			</div>
			<Card className="w-full h-full">
				<CardHeader>Output Text</CardHeader>
				<CardBody>
					<HighlightSyntax
						showLineNumbers={true}
						language="plaintext"
					>
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default GriffinereCipher;
