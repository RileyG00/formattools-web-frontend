import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@heroui/table";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard, getQueryStringParams } from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { escapers_Url } from "@/config/features";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const UrlEncoderDecoder: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string, isEncoding: boolean): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			if (isEncoding) {
				const encodedUri: string = encodeURI(raw);
				setOutput(encodedUri);
			} else {
				const decodedUri: string = decodeURI(raw);
				setOutput(decodedUri);
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
			<FeatureHeader>{escapers_Url.name}</FeatureHeader>
			<div className="flex flex-row gap-4">
				<Card className="w-full">
					<CardHeader>Input URL</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="w-[450px] min-w-fit h-full">
					<CardHeader>Formatting Specifications</CardHeader>
					<CardBody className="flex flex-gap gap-4">
						<div className="flex flex-row gap-2 justify-end w-fit">
							<Button
								color="default"
								onPress={() => {
									setInput("");
									setOutput("");
									setError(null);
								}}
							>
								Clear Input
							</Button>
							<Button
								color="secondary"
								variant="flat"
								className="w-fit"
								onPress={() => handleFormat(input, false)}
							>
								Decode
							</Button>
							<Button
								color="primary"
								className="w-fit"
								onPress={() => handleFormat(input, true)}
							>
								Encode
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
			<div className="flex flex-row gap-4 h-full">
				<Card className="w-full h-full">
					<CardHeader>Output URL</CardHeader>
					<CardBody>
						<HighlightSyntax
							showLineNumbers={true}
							language="plaintext"
						>
							{output}
						</HighlightSyntax>
					</CardBody>
				</Card>
				<Card className="w-[75%] max-h-[484px] min-h-full">
					<CardHeader>Output Query String Parameters</CardHeader>
					<CardBody>
						<Table
							aria-label="Table containing the query parameter values for the URL."
							className="overflow-auto"
						>
							<TableHeader>
								<TableColumn>Key</TableColumn>
								<TableColumn>Value</TableColumn>
							</TableHeader>
							<TableBody items={getQueryStringParams(output)}>
								{(queryParam) => {
									return (
										<TableRow
											key={
												queryParam.key +
												queryParam.value
											}
											aria-label={`Key: ${queryParam.key}. Value: ${queryParam.value}`}
										>
											<TableCell
												aria-label={`Key: ${queryParam.key}`}
											>
												{queryParam.key}
											</TableCell>
											<TableCell
												aria-label={`Value: ${queryParam.value}`}
											>
												{queryParam.value}
											</TableCell>
										</TableRow>
									);
								}}
							</TableBody>
						</Table>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default UrlEncoderDecoder;
