export type SiteConfig = typeof siteConfig;

export const navLinks = {
	home: "/",
	formatters: "formatters",
} as const;

export const subPageLinks = {
	jsonFormatter: `${navLinks.formatters}/json-formatter`,
	xmlFormatter: `${navLinks.formatters}/xml-formatter`,
	htmlFormatter: `${navLinks.formatters}/html-formatter`,
} as const;

export type SubPageLinkValue = (typeof subPageLinks)[keyof typeof subPageLinks];

export const siteConfig = {
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
