"use client";

import { useMemo, useState } from "react";
import { Button, Table } from "@heroui/react";
import { escapers_Url } from "@/config/features";
import { getQueryStringParams } from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import ErrorAlert from "../errorAlert";

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
	const copy = useCopyToClipboard();

	// Keys can repeat in a query string, so each row is identified by its position.
	const queryParams = useMemo(() => {
		try {
			return getQueryStringParams(output).map((param, index) => ({
				id: index,
				...param,
			}));
		} catch {
			// Malformed percent-encoding can't be split into parameters.
			return [];
		}
	}, [output]);

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

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<FeatureOptionItemContainerLayout disobeyMinHeightOnMobile>
			<FeatureHeader>{escapers_Url.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input URL" className="min-h-fit w-full">
					<CodeInput value={input} onChange={setInput} />
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="min-w-fit"
				>
					<div className="flex w-fit flex-row justify-end gap-2">
						<Button
							variant="tertiary"
							onPress={() => {
								setInput("");
								setOutput("");
								setError(null);
							}}
						>
							Clear Input
						</Button>
						<Button
							variant="secondary"
							onPress={() => handleFormat(input, false)}
						>
							Decode
						</Button>
						<Button onPress={() => handleFormat(input, true)}>
							Encode
						</Button>
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<ToolCard title="Output Query String Parameters" className="h-full">
				<div className="max-h-[96px] min-h-[16px] shrink-0 overflow-y-auto rounded-xl bg-code p-3 text-sm">
					<HighlightSyntax>{output}</HighlightSyntax>
				</div>
				<Table className="min-h-0 flex-1">
					<Table.ScrollContainer>
						<Table.Content aria-label="Table containing the query parameter values for the URL.">
							<Table.Header>
								<Table.Column isRowHeader>Key</Table.Column>
								<Table.Column>Value</Table.Column>
							</Table.Header>
							<Table.Body
								items={queryParams}
								renderEmptyState={() => (
									<div className="py-6 text-center text-sm text-muted">
										No query string parameters to display.
									</div>
								)}
							>
								{(queryParam) => (
									<Table.Row id={queryParam.id}>
										<Table.Cell>
											{queryParam.key}
										</Table.Cell>
										<Table.Cell>
											{queryParam.value}
										</Table.Cell>
									</Table.Row>
								)}
							</Table.Body>
						</Table.Content>
					</Table.ScrollContainer>
				</Table>
			</ToolCard>
		</FeatureOptionItemContainerLayout>
	);
};

export default UrlEncoderDecoder;
