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
} from "@/components/utils/textUtils";
import FeatureHeader from "@/components/common/FeatureHeader";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const CoinTossRng = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [headSideIdentifier, setHeadSideIdentifier] = useState<string>("H");
	const [tailsSideIdentifier, setTailSideIdentifier] = useState<string>("T");
	const [numTosses, setNumTosses] = useState<number>(1);
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleRoll = (): void => {
		if (error) setError(null);

		try {
			if (numTosses > 100000) {
				throw new Error("Maximum number of tosses is 100000");
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
					response += `, "${result}"`;
				}
			}

			if (isFormatAsArray) {
				response = formatAsArrayString(response);
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
			<FeatureHeader>Dice Roll</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-[650px] h-full">
					<CardHeader>Coin Toss Specifications</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="flex flex-row gap-4">
							<NumberInput
								value={numTosses}
								onValueChange={setNumTosses}
								label="Number of Tosses"
								description="Any number between 1 and 100,000"
								variant="bordered"
								minValue={1}
								maxValue={100_000}
							/>
							<Input
								value={tailsSideIdentifier}
								onValueChange={setTailSideIdentifier}
								label="Identifier for Tails Side"
								variant="bordered"
							/>
							<Input
								value={headSideIdentifier}
								onValueChange={setHeadSideIdentifier}
								label="Identifier for Heads Side"
								variant="bordered"
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
								Toss
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
				<CardHeader>Output Coin Toss</CardHeader>
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

export default CoinTossRng;
