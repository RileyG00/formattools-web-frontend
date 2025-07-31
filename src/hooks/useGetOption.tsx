import OptionsDescriptions from "@/pages/optionsDescriptions";
import {
	FeatureOption,
	FeatureOptionKey,
	FeatureRoutePath,
} from "@/types/siteConfigs";
import {
	getFeatureOptionByKey,
	getFeatureOptionKey,
} from "@/utils/configUtils";
import { ReactNode, useCallback } from "react";

export const useGetOption = (routeRootPath: FeatureRoutePath) => {
	const optionKey: FeatureOptionKey = getFeatureOptionKey(routeRootPath);

	return useCallback((): ReactNode => {
		const featureOption: FeatureOption = getFeatureOptionByKey(optionKey);

		return <OptionsDescriptions featureOption={featureOption} />;
	}, [routeRootPath]);
};
