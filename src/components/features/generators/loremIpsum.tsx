import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { NumberInput } from "@heroui/number-input";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard } from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { LoremIpsum } from "lorem-ipsum";
import { generators_LoremIpsum } from "@/config/features";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const LoremIpsumGenerator: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 8,
			min: 4,
		},
		wordsPerSentence: {
			max: 16,
			min: 4,
		},
	});

	// Number and length of strings
	const [numWords, setNumWords] = useState<number>(1);
	const [numSentences, setNumSentences] = useState<number>(5);
	const [numParagraphs, setNumParagraphs] = useState<number>(7);

	// Outputs
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleGenerate = (
		type: "words" | "sentences" | "paragraphs",
	): void => {
		if (error) setError(null);

		try {
			if (numWords > 10_000) {
				throw new Error("Maximum number of words is 10,000");
			}

			if (numSentences > 1_000) {
				throw new Error("Maximum number of sentences is 1,000");
			}

			if (numParagraphs > 500) {
				throw new Error("Maximum number of paragraphs is 500");
			}

			let response: string = "";
			if (type === "words") {
				response = lorem.generateWords(numWords);
			} else if (type === "sentences") {
				response = lorem.generateSentences(numSentences);
			} else if (type === "paragraphs") {
				response = lorem.generateParagraphs(numParagraphs);
			}

			setOutput(response);
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
			<FeatureHeader>{generators_LoremIpsum.name}</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-fit h-full">
					<CardHeader>String Specifications</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="flex flex-row gap-4">
							<NumberInput
								value={numWords}
								onValueChange={setNumWords}
								label="Number of Words"
								description="Any number between 1 and 10,000"
								variant="bordered"
								minValue={1}
								maxValue={10_000}
							/>
							<NumberInput
								value={numSentences}
								onValueChange={setNumSentences}
								label="Number of Sentences"
								description="Any number between 1 and 1,000"
								variant="bordered"
								minValue={1}
								maxValue={1_000}
							/>
							<NumberInput
								value={numParagraphs}
								onValueChange={setNumParagraphs}
								label="Number of Paragraphs"
								description="Any number between 1 and 500"
								variant="bordered"
								minValue={1}
								maxValue={500}
							/>
						</div>
						<div className="flex flex-row gap-2 justify-end">
							<Button
								color="secondary"
								variant="flat"
								className="w-fit"
								onPress={() => handleGenerate("words")}
							>
								Generate Words
							</Button>
							<Button
								color="secondary"
								variant="flat"
								className="w-fit"
								onPress={() => handleGenerate("sentences")}
							>
								Generate Sentences
							</Button>
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleGenerate("paragraphs")}
							>
								Generate Paragraphs
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
				<CardHeader>Output Strings</CardHeader>
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

export default LoremIpsumGenerator;
