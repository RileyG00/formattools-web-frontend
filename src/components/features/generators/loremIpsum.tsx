"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { LoremIpsum } from "lorem-ipsum";
import { generators_LoremIpsum } from "@/config/features";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import CodeOutputCard from "../codeOutputCard";
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
		<ToolPage item={generators_LoremIpsum}>
			<ToolOptions
				error={error}
				actions={
					<>
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
						<Button onPress={() => handleGenerate("paragraphs")}>
							Generate Paragraphs
						</Button>
					</>
				}
			>
				<NumberOption
					label="Number of Words"
					description="Between 1 and 10,000"
					value={numWords}
					onChange={setNumWords}
					minValue={1}
					maxValue={10_000}
				/>
				<NumberOption
					label="Number of Sentences"
					description="Between 1 and 1,000"
					value={numSentences}
					onChange={setNumSentences}
					minValue={1}
					maxValue={1_000}
				/>
				<NumberOption
					label="Number of Paragraphs"
					description="Between 1 and 500"
					value={numParagraphs}
					onChange={setNumParagraphs}
					minValue={1}
					maxValue={500}
				/>
			</ToolOptions>
			<CodeOutputCard
				title="Output Text"
				output={output}
				showLineNumbers={false}
				onCopy={handleCopyOutput}
			/>
		</ToolPage>
	);
};

export default LoremIpsumGenerator;
