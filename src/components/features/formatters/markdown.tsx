"use client";

import { useState } from "react";
import { Typography } from "@heroui/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatters_Markdown } from "@/config/features";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import FeatureHeader from "../featureHeader";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";

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
			<div className="flex h-full min-h-0 grow flex-col gap-4 md:flex-row">
				<ToolCard
					title="Input Markdown"
					className="h-full w-full overflow-hidden"
				>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={
							"# Heading\n\n| Name | Value |\n| --- | --- |\n| Data | Formatters |"
						}
					/>
				</ToolCard>

				<ToolCard
					title="Markdown Preview"
					className="h-full w-full"
					contentClassName="overflow-y-auto"
				>
					<Typography.Prose>
						<Markdown remarkPlugins={[remarkGfm]}>{input}</Markdown>
					</Typography.Prose>
				</ToolCard>
			</div>
		</FeatureOptionItemContainerLayout>
	);
};

export default MarkdownFormatter;
