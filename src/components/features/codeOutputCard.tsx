"use client";

import { ReactNode, useState } from "react";
import HighlightSyntax, {
	HighlightLanguage,
} from "@/components/common/syntaxHighlighter";
import CopyButton from "@/components/common/copyButton";
import FullScreenButton from "@/components/common/fullScreenButton";
import FullScreenModal from "./fullScreenModal";
import ToolCard from "./toolCard";
import { toolPanelClassName } from "./toolPanels";

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
	// Shows a copy button in the header (and in the full screen view).
	onCopy?: () => void;
	allowFullScreen?: boolean;
	className?: string;
	children?: ReactNode;
}

// Syntax-highlighted, read-only output panel for a tool.
const CodeOutputCard: React.FC<CodeOutputCardProps> = ({
	title,
	output,
	language = "plaintext",
	showLineNumbers = true,
	wrapLongLines,
	wrapLines,
	onCopy,
	allowFullScreen = true,
	className = toolPanelClassName,
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
				className={className}
				headerAction={
					<div className="flex flex-row gap-2">
						{onCopy && (
							<CopyButton
								size="sm"
								isDisabled={!output}
								onPress={onCopy}
							/>
						)}
						{allowFullScreen && (
							<FullScreenButton
								isDisabled={!output}
								onPress={() => setIsFullScreen(true)}
							/>
						)}
					</div>
				}
			>
				{children}
				<div className="min-h-0 flex-1 overflow-auto rounded-xl bg-code p-4 text-sm leading-relaxed">
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
