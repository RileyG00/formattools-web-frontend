import type { Metadata } from "next";
import LoremIpsumGenerator from "@/components/features/generators/loremIpsum";
import { generators_LoremIpsum } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(
	generators_LoremIpsum,
);

const LoremIpsumGeneratorPage: React.FC = () => {
	return <LoremIpsumGenerator />;
};

export default LoremIpsumGeneratorPage;
