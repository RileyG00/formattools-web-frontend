"use client";

import { useMemo, useState } from "react";
import {
	Button,
	Calendar,
	DateField,
	DatePicker,
	Label,
	useIsHydrated,
} from "@heroui/react";
import {
	DateFormatter,
	fromAbsolute,
	getLocalTimeZone,
	now,
	parseDate,
	ZonedDateTime,
} from "@internationalized/date";
import { converters_EpochDate } from "@/config/features";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";
import NumberOption from "../numberOption";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const EpochDateConverter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [epoch, setEpoch] = useState<number>(0);
	const [selectedDateTime, setSelectedDateTime] =
		useState<ZonedDateTime | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	// The server doesn't know the visitor's time zone, so "now" is only captured once hydrated.
	const isHydrated = useIsHydrated();
	const initialDateTime = useMemo(
		() => (isHydrated ? now(getLocalTimeZone()) : null),
		[isHydrated],
	);
	const dateTime: ZonedDateTime | null = selectedDateTime ?? initialDateTime;

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (isConvertingEpoch: boolean): void => {
		if (isConvertingEpoch && epoch < 0) return;
		if (!isConvertingEpoch && !dateTime) return;
		if (error) setError(null);

		try {
			if (!isConvertingEpoch && dateTime) {
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

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{converters_EpochDate.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard
					title="Formatting Specifications"
					className="h-full w-full md:w-fit"
				>
					<div className="flex w-full flex-col gap-4 md:flex-row">
						<NumberOption
							hideStepper
							useGrouping={false}
							label="Epoch Timestamp"
							minValue={0}
							placeholder="1754447470"
							value={epoch}
							onChange={setEpoch}
							className="min-w-[250px]"
						/>
						<DatePicker
							hideTimeZone
							className="w-full min-w-[250px]"
							granularity="second"
							hourCycle={24}
							minValue={parseDate("1970-01-01")}
							value={dateTime}
							onChange={(value) => {
								if (value)
									setSelectedDateTime(value as ZonedDateTime);
							}}
						>
							<Label>Date Time</Label>
							<DateField.Group fullWidth>
								<DateField.Input>
									{(segment) => (
										<DateField.Segment segment={segment} />
									)}
								</DateField.Input>
								<DateField.Suffix>
									<DatePicker.Trigger>
										<DatePicker.TriggerIndicator />
									</DatePicker.Trigger>
								</DateField.Suffix>
							</DateField.Group>
							<DatePicker.Popover>
								<Calendar aria-label="Date to convert">
									<Calendar.Header>
										<Calendar.YearPickerTrigger>
											<Calendar.YearPickerTriggerHeading />
											<Calendar.YearPickerTriggerIndicator />
										</Calendar.YearPickerTrigger>
										<Calendar.NavButton slot="previous" />
										<Calendar.NavButton slot="next" />
									</Calendar.Header>
									<Calendar.Grid>
										<Calendar.GridHeader>
											{(day) => (
												<Calendar.HeaderCell>
													{day}
												</Calendar.HeaderCell>
											)}
										</Calendar.GridHeader>
										<Calendar.GridBody>
											{(date) => (
												<Calendar.Cell date={date} />
											)}
										</Calendar.GridBody>
									</Calendar.Grid>
									<Calendar.YearPickerGrid>
										<Calendar.YearPickerGridBody>
											{({ year }) => (
												<Calendar.YearPickerCell
													year={year}
												/>
											)}
										</Calendar.YearPickerGridBody>
									</Calendar.YearPickerGrid>
								</Calendar>
							</DatePicker.Popover>
						</DatePicker>
					</div>
					<div className="flex flex-row items-end justify-end gap-2">
						<Button
							variant="tertiary"
							onPress={() => handleFormat(true)}
						>
							To Date Time
						</Button>
						<Button onPress={() => handleFormat(false)}>
							To Epoch (ms)
						</Button>
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard title="Output" language="json" output={output} />
		</FeatureOptionItemContainerLayout>
	);
};

export default EpochDateConverter;
