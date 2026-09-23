"use client";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import plaintext from "react-syntax-highlighter/dist/esm/languages/hljs/plaintext";
import number from "react-syntax-highlighter/dist/esm/languages/hljs/javascript"; // No dedicated 'number' language, JavaScript works
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import html from "react-syntax-highlighter/dist/esm/languages/hljs/htmlbars";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import sql from "react-syntax-highlighter/dist/esm/languages/hljs/sql";

SyntaxHighlighter.registerLanguage("plaintext", plaintext);
SyntaxHighlighter.registerLanguage("number", number); // JavaScript highlights numbers well
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("sql", sql);

export type HighlightLanguage =
	"plaintext" | "number" | "xml" | "html" | "css" | "json" | "sql";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface HighlightSyntaxProps {
	language?: HighlightLanguage;
	children: string;
	showLineNumbers?: boolean;
	wrapLongLines?: boolean;
	wrapLines?: boolean;
}

const HighlightSyntax: React.FC<HighlightSyntaxProps> = ({
	language = "plaintext",
	children,
	showLineNumbers = false,
	wrapLongLines = true,
	wrapLines = false,
}) => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<SyntaxHighlighter
			showLineNumbers={showLineNumbers}
			wrapLongLines={wrapLongLines}
			wrapLines={wrapLines}
			customStyle={{
				background: "none",
				wordBreak: "break-all",
				overflowX: "auto",
				margin: 0,
				padding: 0,
			}}
			language={language}
			style={atomOneDark}
		>
			{children}
		</SyntaxHighlighter>
	);
};

export default HighlightSyntax;
