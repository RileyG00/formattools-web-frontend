"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { rngs_DiceRoll } from "@/config/features";
import {
	formatAsArrayString,
	replaceAllLineBreaksWithComma,
} from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";
import NumberOption from "../numberOption";
import CheckboxOption from "../checkboxOption";
import OptionSelect, { SelectOption } from "../optionSelect";

//----------------------------------------------------------------------------------------
//Options
//----------------------------------------------------------------------------------------
type DieSides = "4" | "6" | "8" | "10" | "12" | "20";

const dieOptions: readonly SelectOption<DieSides>[] = [
	{ id: "4", label: "4-Sided Die" },
	{ id: "6", label: "6-Sided Die" },
	{ id: "8", label: "8-Sided Die" },
	{ id: "10", label: "10-Sided Die" },
	{ id: "12", label: "12-Sided Die" },
	{ id: "20", label: "20-Sided Die" },
];

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const DiceRollRng: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [numSides, setNumSides] = useState<DieSides>("8");
	const [numDice, setNumDice] = useState<number>(1);
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Rolling the Dice
	//------------------------------------------------------------------------------------
	const handleRoll = (): void => {
		if (error) setError(null);

		try {
			if (numDice > 10_000) {
				throw new Error("Maximum number of dice is 10,000");
			}

			const min: number = 1;
			const max: number = parseInt(numSides);

			let response = "";

			for (let i = 0; i < numDice; i++) {
				const randomNumber: number =
					Math.floor(Math.random() * (max - min + 1)) + min;

				if (i === 0) {
					response += String(randomNumber);
				} else {
					response += `\r\n${String(randomNumber)}`;
				}
			}

			if (isFormatAsArray) {
				response = replaceAllLineBreaksWithComma(response);
				response = formatAsArrayString(response);
				const jsonObject: object = JSON.parse(response);
				response = JSON.stringify(jsonObject, null, "\t");
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
			<FeatureHeader>{rngs_DiceRoll.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="Dice Specifications"
					className="h-full w-full md:w-fit"
				>
					<div className="flex w-full flex-col gap-4 md:flex-row">
						<OptionSelect
							label="Number of Sides to the Dice"
							options={dieOptions}
							value={numSides}
							onChange={setNumSides}
							className="min-w-[250px]"
						/>
						<NumberOption
							label="Number of Dice to Roll"
							description="Any number between 1 and 10,000"
							value={numDice}
							onChange={setNumDice}
							minValue={1}
							maxValue={10_000}
							className="min-w-[250px]"
						/>
					</div>
					<CheckboxOption
						isSelected={isFormatAsArray}
						onChange={setIsFormatAsArray}
					>
						Return results as an array
					</CheckboxOption>
					<div className="flex flex-row justify-end gap-2">
						<Button onPress={() => handleRoll()}>Roll</Button>
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard
				title="Output Dice Roll"
				language="number"
				output={output}
				wrapLongLines={true}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default DiceRollRng;
