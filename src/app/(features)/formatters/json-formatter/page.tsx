import type { Metadata } from "next";
import JsonFormatter from "@/components/features/formatters/json";
import { formatters_Json } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(formatters_Json);

const JsonFormatterPage: React.FC = () => {
	return <JsonFormatter />;
};

export default JsonFormatterPage;
