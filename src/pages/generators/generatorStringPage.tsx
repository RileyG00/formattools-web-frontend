import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { generators_String } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import StringGenerator from "@/components/features/generators/string";

const GeneratorStringPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={generators_String.pageTitle}
				pageDescription={generators_String.description}
				pathUrl={generators_String.path}
			/>
			<FeatureOptionItemLayout>
				<StringGenerator />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default GeneratorStringPage;
