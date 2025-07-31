import { useParams } from "react-router-dom";
import { useGetFeatureOptionItemByKey } from "@/hooks/useGetOptionItem";
import { FeatureRoutePath, FeatureRouteSubPath } from "@/types/siteConfigs";
import FeatureContainer from "@/components/common/featureContainer";

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

	return <FeatureContainer>{featureOptionItemView()}</FeatureContainer>;
};

export default FeatureOptionItemRouter;
