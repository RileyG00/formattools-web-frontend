import { Links, NavItem } from "@/types/siteConfigs";
import { featureRoutes } from "./features";

export const navLinks = {
	home: "/",
} as const;

export const siteConfig: {
	navItems: NavItem[];
	links: Links;
} = {
	navItems: [
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
