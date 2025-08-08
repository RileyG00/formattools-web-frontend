import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_Html } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import HtmlFormatter from "@/components/features/formatters/html";

const FormattersHtmlPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_Html.pageTitle}
				pageDescription={formatters_Html.description}
				pathUrl={formatters_Html.path}
			/>
			<FeatureOptionItemLayout>
				<HtmlFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersHtmlPage;
