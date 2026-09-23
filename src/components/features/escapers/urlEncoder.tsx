"use client";

import { useMemo, useState } from "react";
import { Button, Table } from "@heroui/react";
import { escapers_Url } from "@/config/features";
import { getQueryStringParams } from "@/utils/textUtils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import CopyButton from "@/components/common/copyButton";
import HighlightSyntax from "@/components/common/syntaxHighlighter";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import ToolPanels, { toolPanelClassName } from "../toolPanels";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";

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
		<ToolPage item={escapers_Url}>
			<ToolOptions
				error={error}
				actions={
					<>
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
					</>
				}
			/>
			<ToolPanels>
				<ToolCard title="Input URL" className={toolPanelClassName}>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder="https://example.com/search?q=hello%20world&lang=en"
					/>
				</ToolCard>
				<ToolCard
					title="Output"
					className={toolPanelClassName}
					headerAction={
						<CopyButton
							size="sm"
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					}
				>
					<div className="max-h-40 shrink-0 overflow-y-auto rounded-xl bg-code p-4 text-sm leading-relaxed">
						<HighlightSyntax>{output}</HighlightSyntax>
					</div>
					<Table className="min-h-0 flex-1">
						<Table.ScrollContainer>
							<Table.Content aria-label="Query string parameters in the URL.">
								<Table.Header>
									<Table.Column isRowHeader>Key</Table.Column>
									<Table.Column>Value</Table.Column>
								</Table.Header>
								<Table.Body
									items={queryParams}
									renderEmptyState={() => (
										<div className="py-8 text-center text-sm text-muted">
											No query string parameters to
											display.
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
			</ToolPanels>
		</ToolPage>
	);
};

export default UrlEncoderDecoder;
