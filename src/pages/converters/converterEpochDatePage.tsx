import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { converters_EpochDate } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import EpochDateConverter from "@/components/features/converters/epochDate";

const ConverterEpochDatePage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={converters_EpochDate.pageTitle}
				pageDescription={converters_EpochDate.description}
				pathUrl={converters_EpochDate.path}
			/>
			<FeatureOptionItemLayout>
				<EpochDateConverter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default ConverterEpochDatePage;
