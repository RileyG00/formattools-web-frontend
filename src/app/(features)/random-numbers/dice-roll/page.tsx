import type { Metadata } from "next";
import DiceRollRng from "@/components/features/rngs/diceRollRng";
import { rngs_DiceRoll } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(rngs_DiceRoll);

const DiceRollRngPage: React.FC = () => {
	return <DiceRollRng />;
};

export default DiceRollRngPage;
