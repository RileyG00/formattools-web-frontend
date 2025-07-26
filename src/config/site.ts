export type SiteConfig = typeof siteConfig;

export const navLinks = {
	home: "/",
	formatters: "formatters",
	escapers: "escapers",
} as const;

export const subPageLinks = {
	jsonFormatter: `${navLinks.formatters}/json-formatter`,
	xmlFormatter: `${navLinks.formatters}/xml-formatter`,
	htmlFormatter: `${navLinks.formatters}/html-formatter`,
	sqlFormatter: `${navLinks.formatters}/sql-formatter`,
	jsonEscaper: `${navLinks.escapers}/json-escape`,
	urlEncoder: `${navLinks.escapers}/url-encoder`,
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
