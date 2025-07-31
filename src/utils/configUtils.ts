import { featureConfigs } from "@/config/site";
import {
	FeatureOption,
	FeatureOptionItem,
	FeatureOptionKey,
	FeatureRoutePath,
	FeatureRouteSubPath,
	FeatureRouteUniquePath,
	FeatureOptionItemKey,
} from "@/types/siteConfigs";

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

export const getFeatureOptionByKey = (key: FeatureOptionKey): FeatureOption => {
	const option: FeatureOption | undefined = featureConfigs.find(
		(feature) => feature.key === key,
	);

	if (!option) {
		throw new Error("Invalid Feature Option Key.");
	}

	return option;
};

export const getFeatureOptionItemByKey = (
	featureKey: FeatureOptionKey,
	featureItemKey: FeatureOptionItemKey,
): FeatureOptionItem => {
	const option: FeatureOption = getFeatureOptionByKey(featureKey);

	const optionItem: FeatureOptionItem | undefined = option.items.find(
		(item) => item.key === featureItemKey,
	);

	if (!optionItem) {
		throw new Error("Invalid Feature Option Item Key.");
	}

	return optionItem;
};
