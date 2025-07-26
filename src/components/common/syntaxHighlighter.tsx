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

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface HighlightSyntaxProps {
	language: "plaintext" | "number" | "xml" | "html" | "css" | "json" | "sql";
	children: string;
	showLineNumbers: boolean;
}

const HighlightSyntax: React.FC<HighlightSyntaxProps> = ({
	language,
	children,
	showLineNumbers,
}) => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<SyntaxHighlighter
			wrapLongLines
			showLineNumbers={showLineNumbers}
			customStyle={{ background: "none" }}
			language={language}
			style={atomOneDark}
		>
			{children}
		</SyntaxHighlighter>
	);
};

export default HighlightSyntax;
