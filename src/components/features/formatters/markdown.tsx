import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FeatureHeader from "@/components/features/featureHeader";
import { formatters_Markdown } from "@/config/features";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const MarkdownFormatter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [input, setInput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{formatters_Markdown.name}</FeatureHeader>

			{/* allow children to shrink inside this flex row */}
			<div className="flex flex-col md:flex-row gap-4 flex-grow h-full min-h-0">
				{/* INPUT CARD */}
				<Card className="w-full h-full overflow-hidden">
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
				<Card className="w-full h-full">
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
		</FeatureOptionItemContainerLayout>
	);
};

export default MarkdownFormatter;
