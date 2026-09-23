"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { generators_Number } from "@/config/features";
import {
	formatAsArrayString,
	replaceAllLineBreaksWithComma,
} from "@/utils/textUtils";
import { getRandomInt } from "@/utils/numberUtils";
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
const NumberGenerator: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	// Number options
	const [minNumber, setMinNumber] = useState<number>(1);
	const [maxNumber, setMaxNumber] = useState<number>(32);
	const [numbersToGenerate, setNumbersToGenerate] = useState<number>(8);

	// Outputs
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(false);
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Generating the Numbers
	//------------------------------------------------------------------------------------
	const handleGenerateNumbers = (): void => {
		if (error) setError(null);

		try {
			if (minNumber < 1 || minNumber > 999_000) {
				throw new Error(
					"Minimum number cannot be lower than 1 or higher than 999,000",
				);
			}

			if (maxNumber < 1 || maxNumber > 1_000_000) {
				throw new Error(
					"Maximum number cannot be lower than 1 or higher than 1,000,000",
				);
			}

			if (maxNumber < minNumber) {
				throw new Error(
					"Maximum number cannot be lower than minimum number",
				);
			}

			if (numbersToGenerate > 10_000) {
				throw new Error(
					"Cannot generate more than 10,000 numbers at a time",
				);
			}

			let response = "";

			for (let i: number = 0; i < numbersToGenerate; i++) {
				const randomNumber: number = getRandomInt(minNumber, maxNumber);

				if (i === 0) {
					response += randomNumber;
				} else {
					response += `\r\n${randomNumber}`;
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
			<FeatureHeader>{generators_Number.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="Number Specifications"
					className="h-full w-full md:w-fit"
				>
					<div className="flex flex-col gap-4 md:flex-row">
						<NumberOption
							label="Minimum Number"
							description="Any number between 1 and 999,000"
							value={minNumber}
							onChange={setMinNumber}
							minValue={1}
							maxValue={999_000}
						/>
						<NumberOption
							label="Maximum Number"
							description="Any number between 1 and 1,000,000"
							value={maxNumber}
							onChange={setMaxNumber}
							minValue={1}
							maxValue={1_000_000}
						/>
						<NumberOption
							label="Numbers to Generate"
							description="Any number between 1 and 10,000"
							value={numbersToGenerate}
							onChange={setNumbersToGenerate}
							minValue={1}
							maxValue={10_000}
							className="min-w-fit"
						/>
					</div>
					<CheckboxOption
						isSelected={isFormatAsArray}
						onChange={setIsFormatAsArray}
					>
						Return results as an array
					</CheckboxOption>
					<div className="flex flex-row justify-end gap-2">
						<Button onPress={() => handleGenerateNumbers()}>
							Generate
						</Button>
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard
				title="Output Numbers"
				language="number"
				output={output}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default NumberGenerator;
