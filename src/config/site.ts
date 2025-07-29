export type SiteConfig = typeof siteConfig;

export const navLinks = {
	home: "/",
	formatters: "formatters",
	escapers: "escapers",
	ciphers: "ciphers",
	rngs: "random-number",
	generators: "generators",
} as const;

export type NavLinkKeys = keyof typeof navLinks;

export const subPageLinks = {
	// Formatters
	jsonFormatter: `${navLinks.formatters}/json-formatter`,
	xmlFormatter: `${navLinks.formatters}/xml-formatter`,
	htmlFormatter: `${navLinks.formatters}/html-formatter`,
	sqlFormatter: `${navLinks.formatters}/sql-formatter`,
	sqlToJiraTableFormatter: `${navLinks.formatters}/sql-to-jira-table-formatter`,
	tabDelimitedToSqlInsertFormatter: `${navLinks.formatters}/tabular-to-sql-insert-formatter`,

	// Escapers / Encoders
	jsonEscaper: `${navLinks.escapers}/json-escape`,
	xmlEscaper: `${navLinks.escapers}/xml-escape`,
	urlEncoder: `${navLinks.escapers}/url-encoder`,
	base64Encoder: `${navLinks.escapers}/base64-encoder-decoder`,

	// Ciphers
	griffinereCipher: `${navLinks.ciphers}/griffinere`,

	// RNGs
	diceRoleRng: `${navLinks.rngs}/dice-role`,
	coinTossRng: `${navLinks.rngs}/coin-toss`,

	// Generators
	stringGenerator: `${navLinks.generators}/string-generator`,
	numberGenerator: `${navLinks.generators}/number-generator`,
	loremIpsumGenerator: `${navLinks.generators}/lorem-ipsum-generator`,
} as const;

export type SubPageLinkValue = (typeof subPageLinks)[keyof typeof subPageLinks];

export type Option = {
	header: string;
	subheader: string;
	items: OptionItems;
};

export type OptionItems = {
	key: string;
	name: string;
	path: string;
	description: string;
}[];

export type NavItem = {
	label: string;
	href: string;
};

export type Links = {
	github: string;
};

export const siteConfig: {
	formatters: Option;
	escapers: Option;
	ciphers: Option;
	rngs: Option;
	generators: Option;
	navItems: NavItem[];
	links: Links;
} = {
	formatters: {
		header: "Formatters",
		subheader:
			"The Formatters section of the application provides a suite of tools designed to make working with structured data faster, easier, and more reliable. Whether you're preparing code for debugging, beautifying output for readability, or converting results for use in other platforms like Jira, these formatters are built to save you time and reduce friction.",
		items: [
			{
				key: subPageLinks.jsonFormatter,
				name: "JSON Formatter",
				path: subPageLinks.jsonFormatter,
				description:
					"Beautify, validate, and structure raw JSON instantly. Perfect for inspecting API payloads, config files, or deeply nested objects without eye strain.",
			},
			{
				key: subPageLinks.xmlFormatter,
				name: "XML Formatter",
				path: subPageLinks.xmlFormatter,
				description:
					"Re-indent and pretty-print XML so you can navigate complex markup, SOAP responses, or configuration files with ease and confidence.",
			},
			{
				key: subPageLinks.htmlFormatter,
				name: "HTML Formatter",
				path: subPageLinks.htmlFormatter,
				description:
					"Clean up raw or minified HTML into readable, well-spaced markup. Ideal for debugging layouts, reviewing snippets, or handing code off to teammates.",
			},
			{
				key: subPageLinks.sqlFormatter,
				name: "SQL Formatter",
				path: subPageLinks.sqlFormatter,
				description:
					"Apply consistent casing, indentation, and line breaks to tangled SQL queries so you can quickly grasp logic, joins, and subqueries.",
			},
			{
				key: subPageLinks.sqlToJiraTableFormatter,
				name: "SQL To Jira Table Formatter",
				path: subPageLinks.sqlToJiraTableFormatter,
				description:
					"Convert SQL result sets into Jira-compatible HTML tables that paste straight into Visual Mode comments. No manual markup or reformatting needed.",
			},
			{
				key: subPageLinks.tabDelimitedToSqlInsertFormatter,
				name: "Tabular to SQL Insert Formatter",
				path: subPageLinks.tabDelimitedToSqlInsertFormatter,
				description:
					"Convert tabular columns and rows of data into a Microsoft SQL-formatted insert statement for ease-of-use when copying data from a source and inserting it into a table structure.",
			},
		],
	},

	escapers: {
		header: "Escapers and Encoders",
		subheader:
			"The Escapers & Encoders section equips you with one-click tools to make any text or binary payload safe for transport, storage, and display. Instantly escape reserved characters, encode or decode URLs, and convert data to and from Base64, keeping everything standards-compliant, secure, and error-free wherever it travels.",
		items: [
			{
				key: subPageLinks.jsonEscaper,
				name: "JSON Escape/Unescape",
				path: subPageLinks.jsonEscaper,
				description:
					"Escape special characters in JSON strings, or unescape them, to safely embed JSON in code, logs, or documentation without syntax errors.",
			},
			{
				key: subPageLinks.xmlEscaper,
				name: "XML Escape/Unescape",
				path: subPageLinks.xmlEscaper,
				description:
					"Convert reserved XML characters (&, <, >, etc.) to entities or reverse the process. Prevent parser errors and XSS issues in one click.",
			},
			{
				key: subPageLinks.urlEncoder,
				name: "URL Encoder/Decoder",
				path: subPageLinks.urlEncoder,
				description:
					"Encode text for safe use in URLs, or decode it back, so query strings and path segments stay readable, reliable, and standards-compliant.",
			},
			{
				key: subPageLinks.base64Encoder,
				name: "Base64 Encoder/Decoder",
				path: subPageLinks.base64Encoder,
				description:
					"Translate binary or text data to Base64 for easy transmission over text-only channels, or decode Base64 back to its original form.",
			},
		],
	},

	ciphers: {
		header: "Ciphers",
		subheader:
			"Explore lightweight, reversible encryption tools that turn plain text into protected strings, and back again, in seconds. Perfect for quick obfuscation, secure sharing of config values, or hands-on learning about cryptographic concepts.",
		items: [
			{
				key: subPageLinks.griffinereCipher,
				name: "Griffinere",
				path: subPageLinks.griffinereCipher,
				description:
					"Encrypt and decrypt text with the customizable Griffinere substitution cipher. Great for lightweight reversible obfuscation or cryptography demos.",
			},
		],
	},

	rngs: {
		header: "Random Number Generators",
		subheader:
			"Use the RNG tools when you need fair random outcomes. Roll virtual dice for a game, flip a coin to settle a decision, or generate numbers for testing and simulations. All fast and reliable.",
		items: [
			{
				key: subPageLinks.diceRoleRng,
				name: "Dice Roll",
				path: subPageLinks.diceRoleRng,
				description:
					"Roll one or more virtual dice with configurable sides to generate fair random results for games, testing, or quick probability checks.",
			},
			{
				key: subPageLinks.coinTossRng,
				name: "Coin Toss",
				path: subPageLinks.coinTossRng,
				description:
					"Flip any number of virtual coins and instantly get heads or tails. Handy for snap decisions, classroom demos, or randomness experiments.",
			},
		],
	},

	generators: {
		header: "String and Number Generators",
		subheader:
			"Create random strings or numbers for placeholder content, unique IDs, or test data. Adjust length or range and copy the results instantly.",
		items: [
			{
				key: subPageLinks.stringGenerator,
				name: "String Generator",
				path: subPageLinks.stringGenerator,
				description:
					"Create random or patterned strings of any length and character set. Ideal for placeholder data, password suggestions, or stress-testing inputs.",
			},
			{
				key: subPageLinks.numberGenerator,
				name: "Number Generator",
				path: subPageLinks.numberGenerator,
				description:
					"Produce random or sequential numbers within a specified range for IDs, sample datasets, or statistical simulations.",
			},
			{
				key: subPageLinks.loremIpsumGenerator,
				name: "Lorem Ipsum Generator",
				path: subPageLinks.loremIpsumGenerator,
				description:
					"Generate realistic placeholder text blocks of customizable size to prototype layouts, test text-heavy interfaces, or demo typography.",
			},
		],
	},
	navItems: [
		{
			label: "Home",
			href: navLinks.home,
		},
		{
			label: "Formatters",
			href: navLinks.formatters,
		},
		{
			label: "Escapers and Encoders",
			href: navLinks.escapers,
		},
		{
			label: "Ciphers",
			href: navLinks.ciphers,
		},
		{
			label: "Random Number Generators",
			href: navLinks.rngs,
		},
		{
			label: "Generators",
			href: navLinks.generators,
		},
	],
	links: {
		github: "https://github.com/RileyG00",
	},
} as const;
