import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import { DuplicateDocumentIcon } from "@/components/common/icons";
import { copyToClipboard, decodeBase64, encodeBase64 } from "@/utils/textUtils";
import FeatureHeader from "@/components/features/featureHeader";
import { escapers_Base64 } from "@/config/features";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import InputSpecsContainer from "../inputSpecsContainer";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const Base64EncoderDecoder: React.FC = () => {
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
				const encodedUri: string = encodeBase64(raw);
				setOutput(encodedUri);
			} else {
				const decodedUri: string = decodeBase64(raw);
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{escapers_Base64.name}</FeatureHeader>
			<InputSpecsContainer>
				<Card className="w-full min-h-[200px]">
					<CardHeader>Input Text</CardHeader>
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
				<Card className="min-w-fit h-full">
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
			<Card className="w-full h-full">
				<CardHeader>Output Text</CardHeader>
				<CardBody>
					<HighlightSyntax
						showLineNumbers={true}
						language="plaintext"
					>
						{output}
					</HighlightSyntax>
				</CardBody>
			</Card>
		</FeatureOptionItemContainerLayout>
	);
};

export default Base64EncoderDecoder;
