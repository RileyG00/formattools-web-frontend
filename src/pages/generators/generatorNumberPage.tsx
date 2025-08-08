import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { generators_Number } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import NumberGenerator from "@/components/features/generators/number";

const GeneratorNumberPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={generators_Number.pageTitle}
				pageDescription={generators_Number.description}
				pathUrl={generators_Number.path}
			/>
			<FeatureOptionItemLayout>
				<NumberGenerator />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default GeneratorNumberPage;
