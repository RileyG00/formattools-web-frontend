import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_String } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import StringFormatter from "@/components/features/formatters/string";

const FormattersStringPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_String.pageTitle}
				pageDescription={formatters_String.description}
				pathUrl={formatters_String.path}
			/>
			<FeatureOptionItemLayout>
				<StringFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersStringPage;
