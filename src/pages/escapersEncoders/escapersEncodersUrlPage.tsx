import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { escapers_Url } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import UrlEncoderDecoder from "@/components/features/escapers/urlEncoder";

const EscapersEncodersUrlPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={escapers_Url.pageTitle}
				pageDescription={escapers_Url.description}
				pathUrl={escapers_Url.path}
			/>
			<FeatureOptionItemLayout>
				<UrlEncoderDecoder />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default EscapersEncodersUrlPage;
