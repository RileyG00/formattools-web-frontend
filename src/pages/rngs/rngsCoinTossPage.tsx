import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { rngs_CoinToss } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import CoinTossRng from "@/components/features/rngs/coinTossRng";

const RNGCoinTossPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={rngs_CoinToss.pageTitle}
				pageDescription={rngs_CoinToss.description}
				pathUrl={rngs_CoinToss.path}
			/>
			<FeatureOptionItemLayout>
				<CoinTossRng />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default RNGCoinTossPage;
