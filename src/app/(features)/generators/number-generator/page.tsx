import type { Metadata } from "next";
import NumberGenerator from "@/components/features/generators/number";
import { generators_Number } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(generators_Number);

const NumberGeneratorPage: React.FC = () => {
	return <NumberGenerator />;
};

export default NumberGeneratorPage;
