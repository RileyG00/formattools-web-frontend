import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_Json } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import JsonFormatter from "@/components/features/formatters/json";

const FormattersJsonPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_Json.pageTitle}
				pageDescription={formatters_Json.description}
				pathUrl={formatters_Json.path}
			/>
			<FeatureOptionItemLayout>
				<JsonFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersJsonPage;
