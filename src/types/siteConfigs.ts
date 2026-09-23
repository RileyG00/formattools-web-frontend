import type { featureRoutes, featureSubRoutes } from "@/config/features";
import type { navLinks } from "@/config/site";

// Types associated with the keys and paths of each feature
type FeatureRouteKey = keyof typeof featureRoutes;
type FeatureRouteSubKey = keyof typeof featureSubRoutes;
type NavRouteKey = keyof typeof navLinks;

export type FeatureRoutePath = (typeof featureRoutes)[FeatureRouteKey];
export type FeatureRouteSubPath = (typeof featureSubRoutes)[FeatureRouteSubKey];
export type NavRoutePath = (typeof navLinks)[NavRouteKey];
export type FeatureRouteUniquePath =
	`${FeatureRoutePath}/${FeatureRouteSubPath}`;

export type FeatureOptionKey = `key:${FeatureRoutePath}`;
export type FeatureOptionItemKey =
	`key:${FeatureRoutePath}:${FeatureRouteSubPath}`;

// Types associated with how the Site Config is structured
export type FeatureOption = {
	key: FeatureOptionKey;
	pageTitle: string;
	header: string;
	subheader: string;
	path: FeatureRoutePath;
	items: FeatureOptionItem[];
};

export type Status = "New" | "Updated" | null;

export type FeatureOptionItem = {
	key: FeatureOptionItemKey;
	pageTitle: string;
	name: string;
	path: FeatureRouteUniquePath;
	description: string;
	status: Status;
};

export type NavItem = {
	label: string;
	href: NavRoutePath | FeatureRoutePath;
};

export type Links = {
	github: string;
};
