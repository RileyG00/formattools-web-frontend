"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { generators_String } from "@/config/features";
import {
	formatAsArrayString,
	getRandomCharacter,
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
const StringGenerator: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	// Number and size of strings
	const [numStrings, setNumStrings] = useState<number>(1);
	const [stringLength, setStringLength] = useState<number>(32);

	// Alphabet
	const [isIncludeLowercase, setIsIncludeLowercase] = useState<boolean>(true);
	const [isIncludeUppercase, setIsIncludeUppercase] = useState<boolean>(true);
	const [isIncludeDigits, setIsIncludeDigits] = useState<boolean>(true);
	const [isIncludeSpecial, setIsIncludeSpecial] = useState<boolean>(true);

	// Outputs
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(false);
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Generating the Strings
	//------------------------------------------------------------------------------------
	const handleGenerate = (): void => {
		if (error) setError(null);

		try {
			if (numStrings > 1_000) {
				throw new Error("Maximum number of strings is 1,000");
			}

			if (stringLength > 256) {
				throw new Error("Maximum length of strings is 256");
			}

			let response = "";

			for (let i = 0; i < numStrings; i++) {
				let currentString: string = "";

				for (let y = 0; y < stringLength; y++) {
					currentString += getRandomCharacter(
						isIncludeLowercase,
						isIncludeUppercase,
						isIncludeDigits,
						isIncludeSpecial,
						[],
					);
				}

				if (i === 0) {
					response += `"${currentString}"`;
				} else {
					response += `\r\n"${currentString}"`;
				}
			}

			if (isFormatAsArray) {
				response = replaceAllLineBreaksWithComma(response);
				response = formatAsArrayString(response);
				const jsonObject: object = JSON.parse(response);
				response = JSON.stringify(jsonObject, null, "\t");
			} else {
				// If the user does not want an array, remove the prefix and suffix double quotes and just return the string by itself
				response = response.replace(/"/g, "");
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
			<FeatureHeader>{generators_String.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="String Specifications"
					className="h-full w-full md:w-fit"
				>
					<div className="flex flex-col gap-4 md:flex-row">
						<NumberOption
							label="Number of Strings to Return"
							description="Any number between 1 and 1,000"
							value={numStrings}
							onChange={setNumStrings}
							minValue={1}
							maxValue={1_000}
						/>
						<NumberOption
							label="String Length"
							description="Any number between 1 and 256"
							value={stringLength}
							onChange={setStringLength}
							minValue={1}
							maxValue={256}
						/>
					</div>
					<div className="flex flex-col gap-4 md:flex-row md:gap-8">
						<div className="flex flex-col gap-4">
							<CheckboxOption
								isSelected={isFormatAsArray}
								onChange={setIsFormatAsArray}
							>
								Return results as an array
							</CheckboxOption>
							<CheckboxOption
								isSelected={isIncludeLowercase}
								onChange={setIsIncludeLowercase}
							>
								Lowercase characters
							</CheckboxOption>
							<CheckboxOption
								isSelected={isIncludeUppercase}
								onChange={setIsIncludeUppercase}
							>
								Uppercase characters
							</CheckboxOption>
						</div>
						<div className="flex flex-col gap-4">
							<CheckboxOption
								isSelected={isIncludeSpecial}
								onChange={setIsIncludeSpecial}
							>
								Special characters
							</CheckboxOption>
							<CheckboxOption
								isSelected={isIncludeDigits}
								onChange={setIsIncludeDigits}
							>
								Numbers
							</CheckboxOption>
						</div>
					</div>
					<div className="flex flex-row justify-end gap-2">
						<Button onPress={() => handleGenerate()}>
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
				title="Output Strings"
				language={isFormatAsArray ? "json" : "plaintext"}
				output={output}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default StringGenerator;
