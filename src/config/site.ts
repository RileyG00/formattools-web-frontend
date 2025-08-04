import { FeatureOption, Links, NavItem } from "@/types/siteConfigs";
import {
	getFeatureOptionKey,
	getFeatureRouteUniquePath,
	getFeatureOptionItemKey,
} from "@/utils/configUtils";

export const navLinks = {
	home: "/",
} as const;

export const featureRoutes = {
	formatters: "formatters",
	escapers_encoders: "escapers",
	ciphers: "ciphers",
	rngs: "random-numbers",
	generators: "generators",
} as const;

export const featureSubRoutes = {
	// Formatters
	formatter_json: "json-formatter",
	formatter_xml: "xml-formatter",
	formatter_html: "html-formatter",
	formatter_sql: "sql-formatter",
	formatter_tabularToTable: "tabular-to-table",
	formatter_tabularToSqlInsert: "tabular-to-sql-insert",
	formatter_string: "string-formatter",
	formatter_number: "number-formatter",
	formatter_markdown: "markdown-formatter",

	// Escapers / Encoders
	escaper_json: "json-escape",
	escaper_xml: "xml-escape",
	encoder_url: "url-encoder",
	encoder_base64: "base64-encoder-decoder",

	// Ciphers
	cipher_griffinere: "griffinere",

	// RNG
	rng_diceRoll: "dice-roll",
	rng_coinToss: "coin-toss",

	// Generators
	generator_string: "string-generator",
	generator_number: "number-generator",
	generator_lorem: "lorem-ipsom-generator",
} as const;

export const siteConfig: {
	navItems: NavItem[];
	links: Links;
} = {
	navItems: [
		{
			label: "Home",
			href: navLinks.home,
		},
		{
			label: "Formatters",
			href: featureRoutes.formatters,
		},
		{
			label: "Escapers and Encoders",
			href: featureRoutes.escapers_encoders,
		},
		{
			label: "Ciphers",
			href: featureRoutes.ciphers,
		},
		{
			label: "Random Number Generators",
			href: featureRoutes.rngs,
		},
		{
			label: "Generators",
			href: featureRoutes.generators,
		},
	],
	links: {
		github: "https://github.com/RileyG00",
	},
} as const;

export const featureConfigs: FeatureOption[] = [
	{
		key: getFeatureOptionKey(featureRoutes.formatters),
		pageTitle: "Formatters",
		header: "Formatters",
		subheader:
			"The Formatters section of the application provides a suite of tools designed to make working with structured data faster, easier, and more reliable. Whether you're preparing code for debugging, beautifying output for readability, or converting results for use in other platforms like Jira, these formatters are built to save you time and reduce friction.",
		path: featureRoutes.formatters,
		items: [
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_json,
				),
				pageTitle: "JSON Formatter",
				name: "JSON Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_json,
				),
				description:
					"Beautify, validate, and structure raw JSON instantly. Perfect for inspecting API payloads, config files, or deeply nested objects without eye strain.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_xml,
				),
				pageTitle: "XML Formatter",
				name: "XML Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_xml,
				),
				description:
					"Re-indent and pretty-print XML so you can navigate complex markup, SOAP responses, or configuration files with ease and confidence.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_html,
				),
				pageTitle: "HTML Formatter",
				name: "HTML Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_html,
				),
				description:
					"Clean up raw or minified HTML into readable, well-spaced markup. Ideal for debugging layouts, reviewing snippets, or handing code off to teammates.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_sql,
				),
				pageTitle: "SQL Formatter",
				name: "SQL Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_sql,
				),
				description:
					"Apply consistent casing, indentation, and line breaks to tangled SQL queries so you can quickly grasp logic, joins, and subqueries.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToTable,
				),
				pageTitle: "Tabular to Table",
				name: "Tabular To Table Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToTable,
				),
				description:
					"Convert SQL result sets into Jira-compatible HTML tables that paste straight into Visual Mode comments. No manual markup or reformatting needed.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToSqlInsert,
				),
				pageTitle: "Tabular to SQL",
				name: "Tabular to SQL Insert Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToSqlInsert,
				),
				description:
					"Convert tabular columns and rows of data into a SQL-formatted insert statement for ease-of-use when copying data from a source and inserting it into a table structure.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_string,
				),
				pageTitle: "String Formatter",
				name: "String Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_string,
				),
				description:
					"Convert a string, or strings, into uppercase, lowercase, surround with quotes, or format the results as an array.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_markdown,
				),
				pageTitle: "Markdown Formatter",
				name: "Markdown Formatter",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_markdown,
				),
				description:
					"Automatically clean and standardize your Markdown—align headings, lists, code blocks, and links for neat, consistent documentation.",
			},
		],
	},
	{
		key: getFeatureOptionKey(featureRoutes.escapers_encoders),
		pageTitle: "Escapers and Encoders",
		header: "Escapers and Encoders",
		subheader:
			"The Escapers & Encoders section equips you with one-click tools to make any text or binary payload safe for transport, storage, and display. Instantly escape reserved characters, encode or decode URLs, and convert data to and from Base64, keeping everything standards-compliant, secure, and error-free wherever it travels.",
		path: featureRoutes.escapers_encoders,
		items: [
			{
				key: getFeatureOptionItemKey(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_json,
				),
				pageTitle: "JSON Escape/Unescape",
				name: "JSON Escape/Unescape",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_json,
				),
				description:
					"Escape special characters in JSON strings, or unescape them, to safely embed JSON in code, logs, or documentation without syntax errors.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_xml,
				),
				pageTitle: "XML Escape/Unescape",
				name: "XML Escape/Unescape",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_xml,
				),
				description:
					"Convert reserved XML characters (&, <, >, etc.) to entities or reverse the process. Prevent parser errors and XSS issues in one click.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_url,
				),
				pageTitle: "URL Encoder/Decoder",
				name: "URL Encoder/Decoder",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_url,
				),
				description:
					"Encode text for safe use in URLs, or decode it back, so query strings and path segments stay readable, reliable, and standards-compliant.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_base64,
				),
				pageTitle: "Base64 Encoder/Decoder",
				name: "Base64 Encoder/Decoder",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_base64,
				),
				description:
					"Translate binary or text data to Base64 for easy transmission over text-only channels, or decode Base64 back to its original form.",
			},
		],
	},
	{
		key: getFeatureOptionKey(featureRoutes.ciphers),
		pageTitle: "Ciphers",
		header: "Ciphers",
		subheader:
			"Explore lightweight, reversible encryption tools that turn plain text into protected strings, and back again, in seconds. Perfect for quick obfuscation, secure sharing of config values, or hands-on learning about cryptographic concepts.",
		path: featureRoutes.ciphers,
		items: [
			{
				key: getFeatureOptionItemKey(
					featureRoutes.ciphers,
					featureSubRoutes.cipher_griffinere,
				),
				pageTitle: "Griffinere Cipher",
				name: "Griffinere",
				path: getFeatureRouteUniquePath(
					featureRoutes.ciphers,
					featureSubRoutes.cipher_griffinere,
				),
				description:
					"Encrypt and decrypt text with the customizable Griffinere substitution cipher. Great for lightweight reversible obfuscation or cryptography demos.",
			},
		],
	},
	{
		key: getFeatureOptionKey(featureRoutes.rngs),
		pageTitle: "Random Number Generators",
		header: "Random Number Generators",
		subheader:
			"Use the RNG tools when you need fair random outcomes. Roll virtual dice for a game, flip a coin to settle a decision, or generate numbers for testing and simulations. All fast and reliable.",
		path: featureRoutes.rngs,
		items: [
			{
				key: getFeatureOptionItemKey(
					featureRoutes.rngs,
					featureSubRoutes.rng_diceRoll,
				),
				pageTitle: "Dice Roll",
				name: "Dice Roll",
				path: getFeatureRouteUniquePath(
					featureRoutes.rngs,
					featureSubRoutes.rng_diceRoll,
				),
				description:
					"Roll one or more virtual dice with configurable sides to generate fair random results for games, testing, or quick probability checks.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.rngs,
					featureSubRoutes.rng_coinToss,
				),
				pageTitle: "Coin Toss",
				name: "Coin Toss",
				path: getFeatureRouteUniquePath(
					featureRoutes.rngs,
					featureSubRoutes.rng_coinToss,
				),
				description:
					"Flip any number of virtual coins and instantly get heads or tails. Handy for snap decisions, classroom demos, or randomness experiments.",
			},
		],
	},
	{
		key: getFeatureOptionKey(featureRoutes.generators),
		header: "String and Number Generators",
		pageTitle: "Generators",
		subheader:
			"Create random strings or numbers for placeholder content, unique IDs, or test data. Adjust length or range and copy the results instantly.",
		path: featureRoutes.generators,
		items: [
			{
				key: getFeatureOptionItemKey(
					featureRoutes.generators,
					featureSubRoutes.generator_string,
				),
				pageTitle: "String Generator",
				name: "String Generator",
				path: getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_string,
				),
				description:
					"Create random or patterned strings of any length and character set. Ideal for placeholder data, password suggestions, or stress-testing inputs.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.generators,
					featureSubRoutes.generator_number,
				),
				pageTitle: "Number Generator",
				name: "Number Generator",
				path: getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_number,
				),
				description:
					"Produce random or sequential numbers within a specified range for IDs, sample datasets, or statistical simulations.",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.generators,
					featureSubRoutes.generator_lorem,
				),
				pageTitle: "Lorem Ipsum Generator",
				name: "Lorem Ipsum Generator",
				path: getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_lorem,
				),
				description:
					"Generate realistic placeholder text blocks of customizable size to prototype layouts, test text-heavy interfaces, or demo typography.",
			},
		],
	},
] as const;
