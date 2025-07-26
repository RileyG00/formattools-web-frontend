export type SiteConfig = typeof siteConfig;

export const navLinks = {
	home: "/",
	formatters: "formatters",
};

export const subPageLinks = {
	jsonFormatter: `${navLinks.formatters}/json-formatter`,
	xmlFormatter: `${navLinks.formatters}/xml-formatter`,
};

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

