//---------------------------------------------------------------------------------------------------
//[1] Imports
//---------------------------------------------------------------------------------------------------
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	atomOneDark,
	github,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import plaintext from "react-syntax-highlighter/dist/esm/languages/hljs/plaintext";
import number from "react-syntax-highlighter/dist/esm/languages/hljs/javascript"; // No dedicated 'number' language, JavaScript works
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import html from "react-syntax-highlighter/dist/esm/languages/hljs/htmlbars";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";

import { useTheme } from "@/hooks/useTheme";

SyntaxHighlighter.registerLanguage("plaintext", plaintext);
SyntaxHighlighter.registerLanguage("number", number); // JavaScript highlights numbers well
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface HighlightSyntaxProps {
	language: "plaintext" | "number" | "xml" | "html" | "css" | "json";
	children: string;
}

const HighlightSyntax: React.FC<HighlightSyntaxProps> = ({
	language,
	children,
}) => {
	//------------------------------------------------------------------------------------
	//Collect Current Site Theme to Determine the Syntax Theme to Use
	//------------------------------------------------------------------------------------
	const isDarkTheme: boolean = useTheme().isDark;

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<SyntaxHighlighter
			customStyle={{ background: "none" }}
			language={language}
			style={isDarkTheme ? atomOneDark : github}
		>
			{children}
		</SyntaxHighlighter>
	);
};

export default HighlightSyntax;
