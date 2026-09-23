import type { Metadata } from "next";
import StringGenerator from "@/components/features/generators/string";
import { generators_String } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(generators_String);

const StringGeneratorPage: React.FC = () => {
	return <StringGenerator />;
};

export default StringGeneratorPage;
