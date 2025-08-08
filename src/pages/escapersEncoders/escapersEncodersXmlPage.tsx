import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { escapers_Xml } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import XmlEscaper from "@/components/features/escapers/xmlEscaper";

const EscapersEncodersXmlPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={escapers_Xml.pageTitle}
				pageDescription={escapers_Xml.description}
				pathUrl={escapers_Xml.path}
			/>
			<FeatureOptionItemLayout>
				<XmlEscaper />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default EscapersEncodersXmlPage;
