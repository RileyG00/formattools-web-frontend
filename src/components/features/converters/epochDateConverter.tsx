import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import {
	now,
	getLocalTimeZone,
	parseDate,
	fromAbsolute,
	DateFormatter,
} from "@internationalized/date";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard } from "@/utils/textUtils";
import FeatureHeader from "@/components/common/featureHeader";
import FeatureProps from "@/interfaces/featureProps";
import { NumberInput } from "@heroui/number-input";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const EpochDateConverter: React.FC<FeatureProps> = ({ optionItem }) => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [epoch, setEpoch] = useState<number>(0);
	const [dateTime, setDateTime] = useState(now(getLocalTimeZone()));
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (isConvertingEpoch: boolean): void => {
		if (isConvertingEpoch && epoch < 0) return;
		if (!isConvertingEpoch && !dateTime) return;
		if (error) setError(null);

		try {
			if (!isConvertingEpoch) {
				const epochMs = dateTime.toDate().getTime();
				setOutput(String(epochMs));
			} else {
				const epochMs: number =
					epoch < 99_999_999_999 ? epoch * 1000 : epoch;

				const zdtLocal = fromAbsolute(epochMs, getLocalTimeZone());
				const fmt = new DateFormatter("en-US", {
					dateStyle: "medium",
					timeStyle: "long",
					timeZone: zdtLocal.timeZone, // ensure output uses this ZDT's zone
				});

				setOutput(fmt.format(zdtLocal.toDate()));
			}
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
			<FeatureHeader>{optionItem.name}</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-fit h-full">
					<CardHeader>Formatting Specifications</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="w-fit flex flex-row gap-4">
							<NumberInput
								hideStepper
								name="epoch"
								label="Convert Epoch Timestamp to Date"
								minValue={0}
								placeholder="1754447470"
								variant="bordered"
								value={epoch}
								className="w-full min-w-[300px]"
								onValueChange={setEpoch}
							/>
							<DatePicker
								hideTimeZone
								showMonthAndYearPickers
								label="Event Date"
								variant="bordered"
								minValue={parseDate("1970-01-01")}
								calendarProps={{ color: "secondary" }}
								hourCycle={24}
								value={dateTime}
								className="w-full min-w-[300px]"
								onChange={(value) => {
									setDateTime(
										value ?? now(getLocalTimeZone()),
									);
								}}
								granularity="second"
							/>
						</div>
						<div className="flex flex-row gap-2 items-end justify-end">
							<Button
								color="default"
								className="w-fit"
								onPress={() => handleFormat(true)}
							>
								Convert Epoch to Date Time
							</Button>
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleFormat(false)}
							>
								Convert Date Time to Epoch (ms)
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
				<CardHeader>Output</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language="json">
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default EpochDateConverter;
