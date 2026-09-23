import type { Metadata } from "next";
import StringFormatter from "@/components/features/formatters/string";
import { formatters_String } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(formatters_String);

const StringFormatterPage: React.FC = () => {
	return <StringFormatter />;
};

export default StringFormatterPage;
