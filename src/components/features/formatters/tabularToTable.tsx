import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { ArrowTopRightOnSquareIcon } from "@/components/common/icons";
import { copyAsRichHtmlTable, generateHtmlTable } from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { prettify } from "htmlfy";
import { Link } from "@heroui/link";
import { formatters_TabularToTable } from "@/config/features";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import InputSpecsContainer from "../inputSpecsContainer";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const TabularToTableFormatter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [hasHeaderRow, setHasHeaderRow] = useState<boolean>(true);
	const [isPropercaseHeader, setIsPropercaseHeader] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			// Extract all rows in the supplied data.
			let rows: string[] = raw.split("\n");
			if (rows.length === 0) return;

			if (rows.length === 1 && hasHeaderRow) {
				setError(
					`Input must include a header and at least one row if the 'Table includes header row' option is selected.`,
				);
			}

			// If the header row is in the tabular data, extract it and then remove it from the 'rows' array.
			let headerRow: string[] = [];
			if (hasHeaderRow) {
				headerRow = rows[0].split("\t");
				rows.splice(0, 1);
				if (rows.length === 0) return;
			}

			// Take the rows and split them on the tabular data to break out the columns for the rows.
			let splitRows: string[][] = [];
			rows.forEach((row) => {
				splitRows.push(row.split("\t"));
			});

			let formatted: string = generateHtmlTable(
				headerRow,
				splitRows,
				isPropercaseHeader,
			);

			formatted = prettify(formatted, { tab_size: 4 });
			formatted = formatted.replace(/ {4}/g, "\t");

			handleCopyOutput(formatted);
		} catch (error) {
			const err = error as unknown as Error;

			setError(err.message);
		}
	};

	//------------------------------------------------------------------------------------
	//Handle Copying the Text to the Clipboard
	//------------------------------------------------------------------------------------
	const handleCopyOutput = (formatted: string): void => {
		copyAsRichHtmlTable(formatted);

		addToast({
			color: "success",
			title: "Success",
			description: "Successfully copied formatted table to clipboard.",
		});
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<>
			<FeatureOptionItemContainerLayout>
				<FeatureHeader>{formatters_TabularToTable.name}</FeatureHeader>
				<p>
					Want to skip the website? Get the Google Chrome Extension
					for formatting in Jira:
					<Link
						isExternal
						href={
							import.meta.env.VITE_ChromExtension_TabularToTable
						}
					>
						&nbsp; Extension Store&nbsp;
						<ArrowTopRightOnSquareIcon size={16} />
					</Link>
				</p>
				<InputSpecsContainer isDismissFlexGrow isDissmisColReversal>
					<Card className="w-full min-h-[200px]">
						<CardHeader>Input Tabular Data</CardHeader>
						<CardBody>
							<Textarea
								aria-label="Container for the raw text input"
								value={input}
								onValueChange={setInput}
								classNames={{
									base: "!h-full",
									inputWrapper: "!h-full",
									innerWrapper: "!h-full",
									input: "!h-full",
								}}
							/>
						</CardBody>
					</Card>
					<Card className="min-w-fit h-fit">
						<CardHeader>Formatting Specifications</CardHeader>
						<CardBody className="flex flex-gap gap-4">
							<Checkbox
								color="secondary"
								isSelected={hasHeaderRow}
								onValueChange={setHasHeaderRow}
							>
								Table includes header row
							</Checkbox>
							<Checkbox
								color="secondary"
								isSelected={isPropercaseHeader}
								onValueChange={setIsPropercaseHeader}
							>
								Set header row to Proper Case
							</Checkbox>
							<div className="flex flex-row gap-2 justify-end">
								<Button
									color="default"
									className="w-fit"
									onPress={() => {
										setInput("");
										setError(null);
									}}
								>
									Clear Input
								</Button>
								<Button
									color="primary"
									className="w-fit"
									onPress={() => handleFormat(input)}
								>
									Format &amp; Copy to Clipboard
								</Button>
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
			</FeatureOptionItemContainerLayout>
		</>
	);
};

export default TabularToTableFormatter;
