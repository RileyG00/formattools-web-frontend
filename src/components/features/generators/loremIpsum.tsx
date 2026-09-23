"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LoremIpsum } from "lorem-ipsum";
import { generators_LoremIpsum } from "@/config/features";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";
import NumberOption from "../numberOption";

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

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const LoremIpsumGenerator: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	// Number and length of strings
	const [numWords, setNumWords] = useState<number>(1);
	const [numSentences, setNumSentences] = useState<number>(5);
	const [numParagraphs, setNumParagraphs] = useState<number>(7);

	// Outputs
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Generating the Text
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

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{generators_LoremIpsum.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="String Specifications"
					className="h-full w-full md:w-fit"
				>
					<div className="flex flex-col gap-4 md:flex-row">
						<NumberOption
							label="Number of Words"
							description="Any number between 1 and 10,000"
							value={numWords}
							onChange={setNumWords}
							minValue={1}
							maxValue={10_000}
						/>
						<NumberOption
							label="Number of Sentences"
							description="Any number between 1 and 1,000"
							value={numSentences}
							onChange={setNumSentences}
							minValue={1}
							maxValue={1_000}
						/>
						<NumberOption
							label="Number of Paragraphs"
							description="Any number between 1 and 500"
							value={numParagraphs}
							onChange={setNumParagraphs}
							minValue={1}
							maxValue={500}
						/>
					</div>
					<div className="flex flex-col items-end justify-end gap-2 md:flex-row">
						<Button
							variant="secondary"
							onPress={() => handleGenerate("words")}
						>
							Generate Words
						</Button>
						<Button
							variant="secondary"
							onPress={() => handleGenerate("sentences")}
						>
							Generate Sentences
						</Button>
						<div className="flex flex-row gap-2">
							<Button
								onPress={() => handleGenerate("paragraphs")}
							>
								Generate Paragraphs
							</Button>
							<CopyButton
								isDisabled={!output}
								onPress={handleCopyOutput}
							/>
						</div>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard
				title="Output Strings"
				output={output}
				showLineNumbers={false}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default LoremIpsumGenerator;
