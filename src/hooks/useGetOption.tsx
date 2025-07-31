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

export const useGetFeatureOptionByKey = (routeRootPath: FeatureRoutePath) => {
	return useCallback((): ReactNode => {
		const optionKey: FeatureOptionKey = getFeatureOptionKey(routeRootPath);
		const option: FeatureOption = getFeatureOptionByKey(optionKey);

		return <OptionsDescriptions featureOption={option} />;
	}, [routeRootPath]);
};
