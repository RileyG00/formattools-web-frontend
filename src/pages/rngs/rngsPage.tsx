import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { featureRoutes } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import { FeatureOption, FeatureOptionKey } from "@/types/siteConfigs";
import {
	getFeatureOptionByKey,
	getFeatureOptionKey,
} from "@/utils/configUtils";
import FeatureOptionPreview from "../../components/features/featureOptionPreview";

const RNGsPage = () => {
	const key: FeatureOptionKey = getFeatureOptionKey(featureRoutes.rngs);
	const featureOption: FeatureOption = getFeatureOptionByKey(key);

	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={featureOption.pageTitle}
				pageDescription={featureOption.subheader}
				pathUrl={featureOption.path}
			/>
			<FeatureOptionItemLayout>
				<FeatureOptionPreview featureOption={featureOption} />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default RNGsPage;
