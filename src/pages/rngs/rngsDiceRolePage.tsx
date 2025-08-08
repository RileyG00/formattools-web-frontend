import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { rngs_DiceRoll } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import DiceRollRng from "@/components/features/rngs/diceRollRng";

const RNGDiceRollPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={rngs_DiceRoll.pageTitle}
				pageDescription={rngs_DiceRoll.description}
				pathUrl={rngs_DiceRoll.path}
			/>
			<FeatureOptionItemLayout>
				<DiceRollRng />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default RNGDiceRollPage;
