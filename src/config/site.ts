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
	converter: "converter",
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

	// Conveters
	converter_epoch_date: "epoch-date-converter",
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
		{
			label: "Converters",
			href: featureRoutes.converter,
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
				name: "JSON",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_json,
				),
				description:
					"Beautify, validate, and structure raw JSON instantly. Perfect for inspecting API payloads, config files, or deeply nested objects without eye strain.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_xml,
				),
				pageTitle: "XML Formatter",
				name: "XML",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_xml,
				),
				description:
					"Re-indent and pretty-print XML so you can navigate complex markup, SOAP responses, or configuration files with ease and confidence.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_html,
				),
				pageTitle: "HTML Formatter",
				name: "HTML",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_html,
				),
				description:
					"Clean up raw or minified HTML into readable, well-spaced markup. Ideal for debugging layouts, reviewing snippets, or handing code off to teammates.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_sql,
				),
				pageTitle: "SQL Formatter",
				name: "SQL",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_sql,
				),
				description:
					"Apply consistent casing, indentation, and line breaks to tangled SQL queries so you can quickly grasp logic, joins, and subqueries.",
				status: "Updated",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToTable,
				),
				pageTitle: "Tabular to Table",
				name: "Tabular to Table",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToTable,
				),
				description:
					"Convert SQL result sets into Jira-compatible HTML tables that paste straight into Visual Mode comments. No manual markup or reformatting needed.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToSqlInsert,
				),
				pageTitle: "Tabular to SQL",
				name: "Tabular to SQL Insert",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToSqlInsert,
				),
				description:
					"Convert tabular columns and rows of data into a SQL-formatted insert statement for ease-of-use when copying data from a source and inserting it into a table structure.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_string,
				),
				pageTitle: "String Formatter",
				name: "String",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_string,
				),
				description:
					"Convert a string, or strings, into uppercase, lowercase, surround with quotes, format the results as an array, or choose an optional delimiter.",
				status: "Updated",
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.formatters,
					featureSubRoutes.formatter_markdown,
				),
				pageTitle: "Markdown Formatter",
				name: "Markdown",
				path: getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_markdown,
				),
				description:
					"Automatically clean and standardize your Markdown—align headings, lists, code blocks, and links for neat, consistent documentation.",
				status: null,
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
				pageTitle: "JSON",
				name: "JSON",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_json,
				),
				description:
					"Escape special characters in JSON strings, or unescape them, to safely embed JSON in code, logs, or documentation without syntax errors.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_xml,
				),
				pageTitle: "XML",
				name: "XML",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_xml,
				),
				description:
					"Convert reserved XML characters (&, <, >, etc.) to entities or reverse the process. Prevent parser errors and XSS issues in one click.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_url,
				),
				pageTitle: "URL",
				name: "URL",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_url,
				),
				description:
					"Encode text for safe use in URLs, or decode it back, so query strings and path segments stay readable, reliable, and standards-compliant.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_base64,
				),
				pageTitle: "Base64",
				name: "Base64",
				path: getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_base64,
				),
				description:
					"Translate binary or text data to Base64 for easy transmission over text-only channels, or decode Base64 back to its original form.",
				status: null,
			},
		],
	},
	{
		key: getFeatureOptionKey(featureRoutes.converter),
		pageTitle: "Converters",
		header: "Converters",
		subheader:
			"Various lightweight converter options that allow you to transform one format, such as JSON, XML, and Epoch into another format.",
		path: featureRoutes.ciphers,
		items: [
			{
				key: getFeatureOptionItemKey(
					featureRoutes.converter,
					featureSubRoutes.converter_epoch_date,
				),
				pageTitle: "Epoch and Date",
				name: "Epoch and Date",
				path: getFeatureRouteUniquePath(
					featureRoutes.converter,
					featureSubRoutes.converter_epoch_date,
				),
				description:
					"Converts an epoch/unix timestamp into a human readable date. It also lets you do the inverse, i.e. converts a human readable date into an epoch/unix timestamp.",
				status: "New",
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
				pageTitle: "Griffinere",
				name: "Griffinere",
				path: getFeatureRouteUniquePath(
					featureRoutes.ciphers,
					featureSubRoutes.cipher_griffinere,
				),
				description:
					"Encrypt and decrypt text with the customizable Griffinere substitution cipher. Great for lightweight reversible obfuscation or cryptography demos.",
				status: null,
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
				status: null,
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
				status: null,
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
				pageTitle: "String",
				name: "String",
				path: getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_string,
				),
				description:
					"Create random or patterned strings of any length and character set. Ideal for placeholder data, password suggestions, or stress-testing inputs.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.generators,
					featureSubRoutes.generator_number,
				),
				pageTitle: "Number",
				name: "Number",
				path: getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_number,
				),
				description:
					"Produce random or sequential numbers within a specified range for IDs, sample datasets, or statistical simulations.",
				status: null,
			},
			{
				key: getFeatureOptionItemKey(
					featureRoutes.generators,
					featureSubRoutes.generator_lorem,
				),
				pageTitle: "Lorem Ipsum",
				name: "Lorem Ipsum",
				path: getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_lorem,
				),
				description:
					"Generate realistic placeholder text blocks of customizable size to prototype layouts, test text-heavy interfaces, or demo typography.",
				status: null,
			},
		],
	},
] as const;
