import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FeatureHeader from "@/components/common/featureHeader";
import FeatureProps from "@/interfaces/featureProps";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const MarkdownFormatter: React.FC<FeatureProps> = ({ optionItem }) => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [input, setInput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[800px] max-h-[800px] flex flex-col w-full gap-4">
			<FeatureHeader>{optionItem.name}</FeatureHeader>

			{/* allow children to shrink inside this flex row */}
			<div className="flex flex-row gap-4 h-full min-h-0">
				{/* INPUT CARD */}
				<Card className="w-full h-full  flex flex-col overflow-hidden">
					<CardHeader>Input Markdown</CardHeader>
					<CardBody>
						<Textarea
							disableAutosize
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

				{/* PREVIEW CARD */}
				<Card className="w-full h-full flex flex-col">
					<CardHeader>Markdown Preview</CardHeader>
					<CardBody>
						<div className="ua-reset">
							<Markdown
								remarkPlugins={[remarkGfm]}
								components={{
									table({ node, style, ...rest }) {
										return (
											<table
												{...rest}
												style={{
													borderCollapse: "collapse",
													border: "1px solid #d1d5db",
													...(style || {}),
												}}
											/>
										);
									},
									thead: (props) => <thead {...props} />,
									tr: (props) => <tr {...props} />,
									th({ style, ...rest }) {
										return (
											<th
												{...rest}
												style={{
													border: "1px solid #e5e7eb",
													padding: "8px 12px",
													fontWeight: 700,
													textAlign: "left",
													...(style || {}),
												}}
											/>
										);
									},
									td({ style, ...rest }) {
										return (
											<td
												{...rest}
												style={{
													border: "1px solid #e5e7eb",
													padding: "8px 12px",
													...(style || {}),
												}}
											/>
										);
									},
								}}
							>
								{input}
							</Markdown>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default MarkdownFormatter;
