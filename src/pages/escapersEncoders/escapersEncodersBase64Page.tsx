import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { escapers_Base64 } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import Base64EncoderDecoder from "@/components/features/escapers/base64Encoder";

const EscapersEncodersBase64Page = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={escapers_Base64.pageTitle}
				pageDescription={escapers_Base64.description}
				pathUrl={escapers_Base64.path}
			/>
			<FeatureOptionItemLayout>
				<Base64EncoderDecoder />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default EscapersEncodersBase64Page;
