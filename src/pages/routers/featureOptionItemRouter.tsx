import { useParams } from "react-router-dom";
import { useGetFeatureOptionItemByKey } from "@/hooks/useGetOptionItem";
import {
	FeatureOptionItem,
	FeatureOptionItemKey,
	FeatureOptionKey,
	FeatureRoutePath,
	FeatureRouteSubPath,
} from "@/types/siteConfigs";
import FeatureContainer from "@/components/common/featureContainer";
import {
	getFeatureOptionItemByKey,
	getFeatureOptionItemKey,
	getFeatureOptionKey,
} from "@/utils/configUtils";
import { Helmet } from "react-helmet";
import { buildCanonical, getPageTitle } from "@/utils/envUtils";

export const FeatureOptionItemRouter: React.FC = () => {
	const { featureOption, featureOptionItem } = useParams();

	const featureRoutePath: FeatureRoutePath =
		featureOption as FeatureRoutePath;
	const featureRouteSubPath: FeatureRouteSubPath =
		featureOptionItem as FeatureRouteSubPath;

	const featureOptionItemView = useGetFeatureOptionItemByKey(
		featureRoutePath,
		featureRouteSubPath,
	);

	const featureOptionKey: FeatureOptionKey =
		getFeatureOptionKey(featureRoutePath);
	const featureOptionItemKey: FeatureOptionItemKey = getFeatureOptionItemKey(
		featureRoutePath,
		featureRouteSubPath,
	);

	const featureOptionItems: FeatureOptionItem = getFeatureOptionItemByKey(
		featureOptionKey,
		featureOptionItemKey,
	);

	return (
		<FeatureContainer>
			<Helmet>
				<title>{getPageTitle(featureOptionItems.pageTitle)}</title>
				<meta
					name="description"
					content={featureOptionItems.description}
				/>
				<meta
					property="og:description"
					content={featureOptionItems.description}
				/>
				<link
					rel="canonical"
					href={buildCanonical(
						`${featureRoutePath}/${featureRouteSubPath}`,
					)}
				/>
				<meta
					property="og:url"
					content={buildCanonical(
						`${featureRoutePath}/${featureRouteSubPath}`,
					)}
				/>
			</Helmet>
			{featureOptionItemView()}
		</FeatureContainer>
	);
};

export default FeatureOptionItemRouter;
