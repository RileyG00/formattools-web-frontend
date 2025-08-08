import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { generators_LoremIpsum } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import LoremIpsumGenerator from "@/components/features/generators/loremIpsum";

const GeneratorLoremIpsumPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={generators_LoremIpsum.pageTitle}
				pageDescription={generators_LoremIpsum.description}
				pathUrl={generators_LoremIpsum.path}
			/>
			<FeatureOptionItemLayout>
				<LoremIpsumGenerator />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default GeneratorLoremIpsumPage;
