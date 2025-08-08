import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_Xml } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import XmlFormatter from "@/components/features/formatters/xml";

const FormattersXmlPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_Xml.pageTitle}
				pageDescription={formatters_Xml.description}
				pathUrl={formatters_Xml.path}
			/>
			<FeatureOptionItemLayout>
				<XmlFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersXmlPage;
