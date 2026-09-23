import type { Metadata } from "next";
import JsonEscaper from "@/components/features/escapers/jsonEscaper";
import { escapers_Json } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(escapers_Json);

const JsonEscaperPage: React.FC = () => {
	return <JsonEscaper />;
};

export default JsonEscaperPage;
