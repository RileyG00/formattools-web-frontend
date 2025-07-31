import { useParams } from "react-router-dom";
import { useGetFeatureOptionByKey } from "@/hooks/useGetOptionItem";
import { FeatureRoutePath } from "@/types/siteConfigs";
import FeatureContainer from "@/components/common/featureContainer";

export const FeatureOptionRouter: React.FC = () => {
	const { featureOption } = useParams();

	const featureRoutePath: FeatureRoutePath =
		featureOption as FeatureRoutePath;

	const featureOptionItemView = useGetFeatureOptionByKey(featureRoutePath);

	return <FeatureContainer>{featureOptionItemView()}</FeatureContainer>;
};

export default FeatureOptionRouter;
