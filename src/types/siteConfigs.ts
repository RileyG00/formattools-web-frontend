import { featureRoutes, featureSubRoutes } from "@/config/site";

// Types associated with the keys and paths of each feature
type FeatureRouteKey = keyof typeof featureRoutes;
type FeatureRouteSubKey = keyof typeof featureSubRoutes;

export type FeatureRoutePath = (typeof featureRoutes)[FeatureRouteKey];
export type FeatureRouteSubPath = (typeof featureSubRoutes)[FeatureRouteSubKey];
export type FeatureRouteUniquePath =
	`${FeatureRoutePath}/${FeatureRouteSubPath}`;

export type FeatureOptionKey = `key:${FeatureRoutePath}`;
export type FeatureOptionItemKey =
	`key:${FeatureRoutePath}:${FeatureRouteSubPath}`;

// Types associated with how the Site Config is structured
export type FeatureOption = {
	key: FeatureOptionKey;
	header: string;
	subheader: string;
	path: FeatureRoutePath;
	items: FeatureOptionItem[];
};

export type FeatureOptionItem = {
	key: FeatureOptionItemKey;
	name: string;
	path: FeatureRouteUniquePath;
	description: string;
};

export type NavItem = {
	label: string;
	href: "/" | FeatureRoutePath;
};

export type Links = {
	github: string;
};
