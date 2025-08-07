import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import {
	copyToClipboard,
	encloseTextInDoubleQuotes,
	encloseTextInSingleQuotes,
	formatAsArrayString,
	splitOnLineBreak,
} from "@/utils/textUtils";
import FeatureHeader from "@/components/common/featureHeader";
import FeatureProps from "@/interfaces/featureProps";
import { Checkbox } from "@heroui/checkbox";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const StringFormatter: React.FC<FeatureProps> = ({ optionItem }) => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [isFormatAsArray, setIsFormatAsArray] = useState<boolean>(false);
	const [casing, setCasing] = useState<
		"preserve" | "uppercase" | "lowercase"
	>("preserve");
	const [quotes, setQuotes] = useState<"none" | "double" | "single">("none");
	const [delimiter, setDelimiter] = useState<"tab" | "semicolon" | "comma">(
		"comma",
	);
	const [isAddSpaceAfterDelimiter, setIsAddSpaceAfterDelimiter] =
		useState<boolean>(true);

	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			// 1️⃣ Normalize casing in one pass
			const strings: string[] = splitOnLineBreak(raw).map((s: string) => {
				if (casing === "uppercase") return s.toUpperCase();
				if (casing === "lowercase") return s.toLowerCase();
				return s; // preserve
			});

			let response: string;

			if (isFormatAsArray) {
				const body: string = strings
					.map(encloseTextInDoubleQuotes)
					.join(", ");
				response = JSON.stringify(
					JSON.parse(formatAsArrayString(body)),
					null,
					"\t",
				);
			} else {
				const quoted: string[] = strings.map((s: string) => {
					if (quotes === "single")
						return encloseTextInSingleQuotes(s);
					if (quotes === "double")
						return encloseTextInDoubleQuotes(s);
					return s;
				});

				const baseDelim: string =
					delimiter === "tab"
						? "\t"
						: delimiter === "semicolon"
							? ";"
							: ",";
				const delim: string =
					baseDelim === "\t"
						? baseDelim
						: `${baseDelim}${isAddSpaceAfterDelimiter ? " " : ""}`;

				response = quoted.join(delim);
			}

			setOutput(response);
		} catch (err) {
			setOutput("");
			setError((err as Error).message);
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
				<Card className="w-full">
					<CardHeader>Input String(s)</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							placeholder={"How\nNow\nBrown\nCow"}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="w-[950px] h-full">
					<CardHeader>Formatting Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<Select
							aria-label="Options for how to format the string output."
							label="Casing Options"
							selectedKeys={[casing]}
							onSelectionChange={(e) => {
								let caseMaster:
									| "preserve"
									| "uppercase"
									| "lowercase" = "preserve";
								const val: string = e.currentKey ?? "preserve";

								if (
									[
										"preserve",
										"uppercase",
										"lowercase",
									].includes(val)
								) {
									caseMaster = val as typeof caseMaster;

									setCasing(caseMaster);
								}
							}}
							variant="bordered"
						>
							<SelectItem key={"preserve"}>Preserve</SelectItem>
							<SelectItem key={"uppercase"}>Uppercase</SelectItem>
							<SelectItem key={"lowercase"}>Lowercase</SelectItem>
						</Select>
						<div className="flex flex-row w-full">
							<div className="flex flex-col gap-4 w-full">
								<Checkbox
									color="secondary"
									isSelected={isFormatAsArray}
									onValueChange={setIsFormatAsArray}
									className="w-full"
								>
									Return results as array
								</Checkbox>
								<Checkbox
									color="secondary"
									isSelected={isAddSpaceAfterDelimiter}
									onValueChange={setIsAddSpaceAfterDelimiter}
									className="w-full"
								>
									Add space after delimiter
								</Checkbox>
							</div>
							<Select
								aria-label="Options for how to format the JSON output."
								label="Delimiter Options"
								selectedKeys={[delimiter]}
								className="w-full"
								onSelectionChange={(e) => {
									let delimiterMaster:
										| "tab"
										| "semicolon"
										| "comma" = "comma";
									const val: string = e.currentKey ?? "comma";

									if (
										["tab", "semicolon", "comma"].includes(
											val,
										)
									) {
										delimiterMaster =
											val as typeof delimiterMaster;

										setDelimiter(delimiterMaster);
									}
								}}
								variant="bordered"
								description="Has no effect if formatting as an array."
							>
								<SelectItem key={"tab"}>Tab</SelectItem>
								<SelectItem key={"semicolon"}>
									Semicolon
								</SelectItem>
								<SelectItem key={"comma"}>Comma</SelectItem>
							</Select>
						</div>
						<RadioGroup
							label="Apply Quotes"
							orientation="horizontal"
							color="secondary"
							description="Has no effect if formatting as an array."
							value={quotes}
							onValueChange={(e) =>
								setQuotes(e as "none" | "double" | "single")
							}
						>
							<Radio value={"none"}>None</Radio>
							<Radio value={"double"}>Double</Radio>
							<Radio value={"single"}>Single</Radio>
						</RadioGroup>
						<div className="flex flex-row gap-2 justify-end">
							<Button
								color="default"
								className="w-fit"
								onPress={() => {
									setInput("");
									setOutput("");
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
								Format String
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
				<CardHeader>Output String(s)</CardHeader>
				<CardBody>
					<HighlightSyntax showLineNumbers={true} language={"json"}>
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</div>
	);
};

export default StringFormatter;
