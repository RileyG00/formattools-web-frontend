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
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import InputSpecsContainer from "../inputSpecsContainer";

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
				const decodedUri: string = decodeURIComponent(raw);
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
		<FeatureOptionItemContainerLayout disobeyMinHeightOnMobile>
			<FeatureHeader>{escapers_Url.name}</FeatureHeader>
			<InputSpecsContainer>
				<Card className="w-full min-h-fit">
					<CardHeader>Input URL</CardHeader>
					<CardBody>
						<Textarea
							disableAnimation
							classNames={{
								base: "!h-full",
								inputWrapper: "!h-full",
								innerWrapper: "!h-full",
								input: "!h-full",
							}}
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="min-w-fit">
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
			</InputSpecsContainer>
			<Card className="h-full">
				<CardHeader>Output Query String Parameters</CardHeader>
				<CardBody className="flex flex-col gap-4">
					<div className="flex-grow min-h-[16px] max-h-[72px] overflow-y-auto">
						<HighlightSyntax>{output}</HighlightSyntax>
					</div>
					<Table
						aria-label="Table containing the query parameter values for the URL."
						className="min-h-[1px] h-full"
					>
						<TableHeader>
							<TableColumn>Key</TableColumn>
							<TableColumn>Value</TableColumn>
						</TableHeader>
						<TableBody items={getQueryStringParams(output)}>
							{(queryParam) => {
								return (
									<TableRow
										key={queryParam.key + queryParam.value}
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
		</FeatureOptionItemContainerLayout>
	);
};

export default UrlEncoderDecoder;
