import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { escapers_Json } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import JsonEscaper from "@/components/features/escapers/jsonEscaper";

const EscapersEncodersJsonPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={escapers_Json.pageTitle}
				pageDescription={escapers_Json.description}
				pathUrl={escapers_Json.path}
			/>
			<FeatureOptionItemLayout>
				<JsonEscaper />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default EscapersEncodersJsonPage;
