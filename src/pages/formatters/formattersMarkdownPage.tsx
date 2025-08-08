import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_Markdown } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import MarkdownFormatter from "@/components/features/formatters/markdown";

const FormattersMarkdownPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_Markdown.pageTitle}
				pageDescription={formatters_Markdown.description}
				pathUrl={formatters_Markdown.path}
			/>
			<FeatureOptionItemLayout>
				<MarkdownFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersMarkdownPage;
