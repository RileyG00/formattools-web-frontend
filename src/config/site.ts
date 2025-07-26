export type SiteConfig = typeof siteConfig;

export const navLinks = {
	home: "/",
	formatters: "formatters",
	escapers: "escapers",
	ciphers: "ciphers",
	rngs: "random-number",
	generators: "generators",
} as const;

export const subPageLinks = {
	// Formatters
	jsonFormatter: `${navLinks.formatters}/json-formatter`,
	xmlFormatter: `${navLinks.formatters}/xml-formatter`,
	htmlFormatter: `${navLinks.formatters}/html-formatter`,
	sqlFormatter: `${navLinks.formatters}/sql-formatter`,

	// Escapers
	jsonEscaper: `${navLinks.escapers}/json-escape`,
	urlEncoder: `${navLinks.escapers}/url-encoder`,

	// Ciphers
	griffinereCipher: `${navLinks.ciphers}/griffinere`,

	// RNGs
	diceRoleRng: `${navLinks.rngs}/dice-role`,

	// Generators
	stringGenerator: `${navLinks.generators}/string-generator`,
	numberGenerator: `${navLinks.generators}/number-generator`,
	loremIpsumGenerator: `${navLinks.generators}/lorem-ipsum-generator`,
} as const;

export type SubPageLinkValue = (typeof subPageLinks)[keyof typeof subPageLinks];

export const siteConfig = {
	formatters: [
		{
			key: subPageLinks.jsonFormatter,
			name: "JSON Formatter",
			path: subPageLinks.jsonFormatter,
		},
		{
			key: subPageLinks.xmlFormatter,
			name: "XML Formatter",
			path: subPageLinks.xmlFormatter,
		},
		{
			key: subPageLinks.htmlFormatter,
			name: "HTML Formatter",
			path: subPageLinks.htmlFormatter,
		},
		{
			key: subPageLinks.sqlFormatter,
			name: "SQL Formatter",
			path: subPageLinks.sqlFormatter,
		},
	],
	escapers: [
		{
			key: subPageLinks.jsonEscaper,
			name: "JSON Escape/Unescape",
			path: subPageLinks.jsonEscaper,
		},
		{
			key: subPageLinks.urlEncoder,
			name: "URL Encoder/Decoder",
			path: subPageLinks.urlEncoder,
		},
	],
	ciphers: [
		{
			key: subPageLinks.griffinereCipher,
			name: "Griffinere",
			path: subPageLinks.griffinereCipher,
		},
	],
	rngs: [
		{
			key: subPageLinks.diceRoleRng,
			name: "Dice Roll",
			path: subPageLinks.diceRoleRng,
		},
	],
	generators: [
		{
			key: subPageLinks.stringGenerator,
			name: "String Generator",
			path: subPageLinks.stringGenerator,
		},
		{
			key: subPageLinks.numberGenerator,
			name: "Number Generator",
			path: subPageLinks.numberGenerator,
		},
		{
			key: subPageLinks.loremIpsumGenerator,
			name: "Lorem Ipsum Generator",
			path: subPageLinks.loremIpsumGenerator,
		},
	],
	navItems: [
		{
			label: "Home",
			href: navLinks.home,
		},
		{
			label: "Formatters",
			href: navLinks.formatters,
		},
	],
	links: {
		github: "https://github.com/RileyG00",
		sponsor: "https://www.google.com",
	},
};
