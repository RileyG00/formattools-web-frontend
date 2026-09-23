"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { rngs_CoinToss } from "@/config/features";
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{rngs_CoinToss.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="Coin Toss Specifications"
					className="h-full w-full md:w-fit"
				>
					<div className="flex flex-col gap-4 md:flex-row">
						<NumberOption
							label="Number of Tosses"
							description="Any number between 1 and 100,000"
							value={numTosses}
							onChange={setNumTosses}
							minValue={1}
							maxValue={100_000}
						/>
						<TextField
							fullWidth
							value={tailsSideIdentifier}
							onChange={setTailSideIdentifier}
						>
							<Label>Identifier for Tails Side</Label>
							<Input />
						</TextField>
						<TextField
							fullWidth
							value={headSideIdentifier}
							onChange={setHeadSideIdentifier}
						>
							<Label>Identifier for Heads Side</Label>
							<Input />
						</TextField>
					</div>
					<CheckboxOption
						isSelected={isFormatAsArray}
						onChange={setIsFormatAsArray}
					>
						Return results as an array
					</CheckboxOption>
					<div className="flex flex-row justify-end gap-2">
						<Button onPress={() => handleToss()}>Toss</Button>
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard
				title="Output Coin Toss"
				language="json"
				output={output}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default CoinTossRng;
