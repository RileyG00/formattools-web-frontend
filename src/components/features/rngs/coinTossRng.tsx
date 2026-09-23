"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { rngs_CoinToss } from "@/config/features";
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

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const CoinTossRng: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [headSideIdentifier, setHeadSideIdentifier] = useState<string>("H");
	const [tailsSideIdentifier, setTailSideIdentifier] = useState<string>("T");
	const [numTosses, setNumTosses] = useState<number>(1);
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Tossing the Coins
	//------------------------------------------------------------------------------------
	const handleToss = (): void => {
		if (error) setError(null);

		try {
			if (numTosses > 100_000) {
				throw new Error("Maximum number of tosses is 100,000");
			}

			let response = "";

			for (let i = 0; i < numTosses; i++) {
				const randomNumber: number = Math.floor(Math.random() * 2);

				//0: Tails, 1: Heads
				const result: string =
					randomNumber === 0
						? tailsSideIdentifier
						: headSideIdentifier;

				if (i === 0) {
					response += `"${result}"`;
				} else {
					response += `\r\n"${result}"`;
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
		<ToolPage item={rngs_CoinToss}>
			<ToolOptions
				error={error}
				actions={<Button onPress={() => handleToss()}>Toss</Button>}
			>
				<NumberOption
					label="Number of Tosses"
					description="Between 1 and 100,000"
					value={numTosses}
					onChange={setNumTosses}
					minValue={1}
					maxValue={100_000}
				/>
				<TextField
					value={headSideIdentifier}
					onChange={setHeadSideIdentifier}
					className="w-full sm:w-40"
				>
					<Label>Heads Label</Label>
					<Input />
				</TextField>
				<TextField
					value={tailsSideIdentifier}
					onChange={setTailSideIdentifier}
					className="w-full sm:w-40"
				>
					<Label>Tails Label</Label>
					<Input />
				</TextField>
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
				title="Output Coin Toss"
				language="json"
				output={output}
				onCopy={handleCopyOutput}
			/>
		</ToolPage>
	);
};

export default CoinTossRng;
