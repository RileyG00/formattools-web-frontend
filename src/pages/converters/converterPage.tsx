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

const ConvertorsPage = () => {
	const key: FeatureOptionKey = getFeatureOptionKey(featureRoutes.converter);
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

export default ConvertorsPage;
