import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
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
	getRandomCharacter,
} from "@/utils/textUtils";
import FeatureHeader from "@/components/common/featureHeader";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const StringGenerator = () => {
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
	const [separator, setSeparator] = useState<string>(",");
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(false);

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleRoll = (): void => {
		if (error) setError(null);

		try {
			if (numStrings > 1_000) {
				throw new Error("Maximum number of strings is 1,000");
			}

			if (stringLength > 1_000) {
				throw new Error("Maximum number of strings is 1,000");
			}

			let response = "";

			const characterExclusionList: string[] = isFormatAsArray
				? []
				: [separator];

			for (let i = 0; i < numStrings; i++) {
				let currentString: string = "";

				for (let y = 0; y < stringLength; y++) {
					const randomCharacter: string = getRandomCharacter(
						isIncludeLowercase,
						isIncludeUppercase,
						isIncludeDigits,
						isIncludeSpecial,
						characterExclusionList,
					);

					currentString += randomCharacter;
				}

				if (i === 0) {
					response += `"${currentString}"`;
				} else {
					response += `${isFormatAsArray ? "," : separator}"${currentString}"`;
				}
			}

			if (isFormatAsArray) {
				response = formatAsArrayString(response);
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
			<FeatureHeader>String Generator</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-fit h-full">
					<CardHeader>String Specifications</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="flex flex-row gap-4">
							<NumberInput
								value={numStrings}
								onValueChange={setNumStrings}
								label="Number of Strings to Return"
								description="Any number between 1 and 1,000"
								variant="bordered"
								minValue={1}
								maxValue={1_000}
							/>
							<NumberInput
								value={stringLength}
								onValueChange={setStringLength}
								label="String Length"
								description="Any number between 1 and 1,000"
								variant="bordered"
								minValue={1}
								maxValue={1_000}
							/>
							<Input
								value={separator}
								className="min-w-fit"
								onValueChange={setSeparator}
								label="String Separator"
								description="Only applicable if not returning results as an array"
								variant="bordered"
							/>
						</div>
						<div className="flex flex-row gap-8">
							<div className="flex flex-col gap-4">
								<Checkbox
									isSelected={isFormatAsArray}
									onValueChange={setIsFormatAsArray}
									color="secondary"
									aria-label="Controls whether the results should be returned as an array."
								>
									Return results as an array
								</Checkbox>
								<Checkbox
									isSelected={isIncludeLowercase}
									onValueChange={setIsIncludeLowercase}
									color="secondary"
									aria-label="Controls whether the results should include lowercase characters."
								>
									Include lowercase characters
								</Checkbox>
								<Checkbox
									isSelected={isIncludeUppercase}
									onValueChange={setIsIncludeUppercase}
									color="secondary"
									aria-label="Controls whether the results should include uppercase characters."
								>
									Include uppercase characters
								</Checkbox>
							</div>
							<div className="flex flex-col gap-4">
								<Checkbox
									isSelected={isIncludeSpecial}
									onValueChange={setIsIncludeSpecial}
									color="secondary"
									aria-label="Controls whether the results should include special characters."
								>
									Include special characters
								</Checkbox>
								<Checkbox
									isSelected={isIncludeDigits}
									onValueChange={setIsIncludeDigits}
									color="secondary"
									aria-label="Controls whether the results should include digits."
								>
									Include numbers
								</Checkbox>
							</div>
						</div>
						<div className="flex flex-row gap-2 justify-end">
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleRoll()}
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

export default StringGenerator;
