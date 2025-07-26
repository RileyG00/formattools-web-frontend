export type SiteConfig = typeof siteConfig;

export const navLinks = {
	home: "/",
	formatters: "formatters",
} as const;

export const subPageLinks = {
	jsonFormatter: `${navLinks.formatters}/json-formatter`,
	xmlFormatter: `${navLinks.formatters}/xml-formatter`,
	htmlFormatter: `${navLinks.formatters}/html-formatter`,
	sqlFormatter: `${navLinks.formatters}/sql-formatter`,
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
