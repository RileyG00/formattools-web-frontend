import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
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
	removeAllLineBreaks,
	replaceAllLineBreaksWithComma,
} from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { rngs_DiceRoll } from "@/config/features";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import InputSpecsContainer from "../inputSpecsContainer";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const DiceRollRng: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [numSides, setNumSides] = useState<string>("8");
	const [numDice, setNumDice] = useState<number>(1);
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleRoll = (): void => {
		if (error) setError(null);

		try {
			if (numDice > 10_000) {
				throw new Error("Maximum number of dice is 10,000");
			}

			if (!["4", "6", "8", "10", "12", "20"].includes(numSides)) {
				throw new Error(
					"Please select a valid number of sides from the drop down.",
				);
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
			<FeatureHeader>{rngs_DiceRoll.name}</FeatureHeader>
			<InputSpecsContainer>
				<Card className="w-full md:w-fit h-full">
					<CardHeader>Dice Specifications</CardHeader>
					<CardBody className="flex flex-col gap-4 w-full">
						<div className="flex flex-col md:flex-row gap-4 w-full">
							<Select
								aria-label="Options for how many sides the dice will have when rolling."
								label="Number of Sides to the Dice"
								selectedKeys={[numSides]}
								onSelectionChange={(e) =>
									setNumSides(e.currentKey ?? "8")
								}
								variant="bordered"
								className="w-full min-w-[250px]"
							>
								<SelectItem key={"4"}>4-Sided Die</SelectItem>
								<SelectItem key={"6"}>6-Sided Die</SelectItem>
								<SelectItem key={"8"}>8-Sided Die</SelectItem>
								<SelectItem key={"10"}>10-Sided Die</SelectItem>
								<SelectItem key={"12"}>12-Sided Die</SelectItem>
								<SelectItem key={"20"}>20-Sided Die</SelectItem>
							</Select>
							<NumberInput
								value={numDice}
								onValueChange={setNumDice}
								label="Number of Dice to Roll"
								description="Any number between 1 and 10,000"
								variant="bordered"
								minValue={1}
								maxValue={10_000}
								className="w-full min-w-[250px]"
							/>
						</div>
						<Checkbox
							isSelected={isFormatAsArray}
							onValueChange={setIsFormatAsArray}
							color="secondary"
							aria-label="Controls whether the results should be returned as an array."
						>
							Return results as an array
						</Checkbox>
						<div className="flex flex-row gap-2 justify-end">
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleRoll()}
							>
								Roll
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
				<CardHeader>Output Dice Roll</CardHeader>
				<CardBody>
					<HighlightSyntax
						showLineNumbers={true}
						language="number"
						wrapLongLines={true}
					>
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</FeatureOptionItemContainerLayout>
	);
};

export default DiceRollRng;
