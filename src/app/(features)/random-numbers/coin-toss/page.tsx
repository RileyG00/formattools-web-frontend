import type { Metadata } from "next";
import CoinTossRng from "@/components/features/rngs/coinTossRng";
import { rngs_CoinToss } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(rngs_CoinToss);

const CoinTossRngPage: React.FC = () => {
	return <CoinTossRng />;
};

export default CoinTossRngPage;
