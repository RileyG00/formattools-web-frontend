import type { Metadata } from "next";
import EpochDateConverter from "@/components/features/converters/epochDate";
import { converters_EpochDate } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata =
	buildFeatureItemMetadata(converters_EpochDate);

const EpochDateConverterPage: React.FC = () => {
	return <EpochDateConverter />;
};

export default EpochDateConverterPage;
