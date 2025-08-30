import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { NumberInput } from "@heroui/number-input";
import { Checkbox } from "@heroui/checkbox";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import {
	copyToClipboard,
	formatAsArrayString,
	replaceAllLineBreaksWithComma,
} from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { getRandomInt } from "@/utils/numberUtils";
import { generators_Number } from "@/config/features";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import InputSpecsContainer from "../inputSpecsContainer";

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

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleGenerateNumbers = (): void => {
		if (error) setError(null);

		try {
			if (minNumber < 1 || maxNumber > 999_000) {
				throw new Error(
					"Minimum number cannot be lower than 1 or higher than 999,000",
				);
			}

			if (minNumber < 1 || maxNumber > 1_000_000) {
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{generators_Number.name}</FeatureHeader>
			<InputSpecsContainer>
				<Card className="w-full md:w-fit h-full">
					<CardHeader>String Specifications</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="flex flex-col md:flex-row gap-4">
							<NumberInput
								value={minNumber}
								onValueChange={setMinNumber}
								label="Minimum Number"
								description="Any number between 1 and 999,000"
								variant="bordered"
								minValue={1}
								maxValue={999_000}
							/>
							<NumberInput
								value={maxNumber}
								onValueChange={setMaxNumber}
								label="Maximum Number"
								description="Any number between 1 and 1,000,000"
								variant="bordered"
								minValue={1}
								maxValue={1_000_000}
							/>
							<NumberInput
								value={numbersToGenerate}
								className="min-w-fit"
								onValueChange={setNumbersToGenerate}
								label="Numbers to Generate"
								description="Any number between 1 and 10,000"
								variant="bordered"
								minValue={1}
								maxValue={10_000}
							/>
						</div>
						<div className="flex flex-row gap-8">
							<Checkbox
								isSelected={isFormatAsArray}
								onValueChange={setIsFormatAsArray}
								color="secondary"
								aria-label="Controls whether the results should be returned as an array."
							>
								Return results as an array
							</Checkbox>
						</div>
						<div className="flex flex-row gap-2 justify-end">
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleGenerateNumbers()}
							>
								Generate
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
			</InputSpecsContainer>
			<Card className="w-full h-full">
				<CardHeader>Output Strings</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="number">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</FeatureOptionItemContainerLayout>
	);
};

export default NumberGenerator;
