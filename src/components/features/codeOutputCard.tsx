"use client";

import { ReactNode, useState } from "react";
import HighlightSyntax, {
	HighlightLanguage,
} from "@/components/common/syntaxHighlighter";
import FullScreenButton from "@/components/common/fullScreenButton";
import FullScreenModal from "./fullScreenModal";
import ToolCard from "./toolCard";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface CodeOutputCardProps {
	title: string;
	output: string;
	language?: HighlightLanguage;
	showLineNumbers?: boolean;
	wrapLongLines?: boolean;
	wrapLines?: boolean;
	// When provided, the card offers a full screen view with a copy button.
	onCopy?: () => void;
	allowFullScreen?: boolean;
	children?: ReactNode;
}

// Syntax-highlighted, read-only output panel shown beneath each tool.
const CodeOutputCard: React.FC<CodeOutputCardProps> = ({
	title,
	output,
	language = "plaintext",
	showLineNumbers = true,
	wrapLongLines,
	wrapLines,
	onCopy,
	allowFullScreen = false,
	children,
}) => {
	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

	const highlighted = (
		<HighlightSyntax
			showLineNumbers={showLineNumbers}
			language={language}
			wrapLongLines={wrapLongLines}
			wrapLines={wrapLines}
		>
			{output}
		</HighlightSyntax>
	);

	return (
		<>
			<ToolCard
				title={title}
				className="h-full min-h-[240px] flex-1"
				headerAction={
					allowFullScreen && (
						<FullScreenButton
							onPress={() => setIsFullScreen(true)}
						/>
					)
				}
			>
				{children}
				<div className="min-h-0 flex-1 overflow-auto rounded-xl bg-code p-4 text-sm">
					{highlighted}
				</div>
			</ToolCard>
			{allowFullScreen && (
				<FullScreenModal
					title={title}
					isOpen={isFullScreen}
					onOpenChange={setIsFullScreen}
					onCopy={onCopy}
				>
					{highlighted}
				</FullScreenModal>
			)}
		</>
	);
};

export default CodeOutputCard;
