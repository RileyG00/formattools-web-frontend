import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { ciphers_Griffinere } from "@/config/features";
import GriffinereCipher from "@/components/features/ciphers/griffinere";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";

const CipherGriffinerePage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={ciphers_Griffinere.pageTitle}
				pageDescription={ciphers_Griffinere.description}
				pathUrl={ciphers_Griffinere.path}
			/>
			<FeatureOptionItemLayout>
				<GriffinereCipher />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default CipherGriffinerePage;
