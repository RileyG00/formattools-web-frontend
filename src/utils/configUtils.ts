// Kept free of imports from "@/config/features" (which depends on these helpers)
// so the two modules never form an initialization cycle.
import type {
	FeatureOptionKey,
	FeatureRoutePath,
	FeatureRouteSubPath,
	FeatureRouteUniquePath,
	FeatureOptionItemKey,
} from "@/types/siteConfigs";

export const getFeatureRoutePath = (path: FeatureRoutePath | "/"): string =>
	path === "/" ? "/" : "/" + path;

// Converts a config path (e.g. "formatters/json-formatter") into an absolute href.
export const toHref = (
	path: FeatureRoutePath | FeatureRouteUniquePath,
): string => "/" + path;

export const getFeatureOptionKey = (
	routeRootKey: FeatureRoutePath,
): FeatureOptionKey => `key:${routeRootKey}`;

export const getFeatureOptionItemKey = (
	routeRootKey: FeatureRoutePath,
	routeSubKey: FeatureRouteSubPath,
): FeatureOptionItemKey => `key:${routeRootKey}:${routeSubKey}`;

export const getFeatureRouteUniquePath = (
	routeRootKey: FeatureRoutePath,
	routeSubKey: FeatureRouteSubPath,
): FeatureRouteUniquePath => `${routeRootKey}/${routeSubKey}`;
