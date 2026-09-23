"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { rngs_DiceRoll } from "@/config/features";
import {
	formatAsArrayString,
	replaceAllLineBreaksWithComma,
} from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import CodeOutputCard from "../codeOutputCard";
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
		<ToolPage item={rngs_DiceRoll}>
			<ToolOptions
				error={error}
				actions={<Button onPress={() => handleRoll()}>Roll</Button>}
			>
				<OptionSelect
					label="Die Type"
					options={dieOptions}
					value={numSides}
					onChange={setNumSides}
				/>
				<NumberOption
					label="Number of Dice"
					description="Between 1 and 10,000"
					value={numDice}
					onChange={setNumDice}
					minValue={1}
					maxValue={10_000}
				/>
				<div className="pt-1">
					<CheckboxOption
						isSelected={isFormatAsArray}
						onChange={setIsFormatAsArray}
					>
						Return results as an array
					</CheckboxOption>
				</div>
			</ToolOptions>
			<CodeOutputCard
				title="Output Dice Roll"
				language="number"
				output={output}
				wrapLongLines={true}
				onCopy={handleCopyOutput}
			/>
		</ToolPage>
	);
};

export default DiceRollRng;
