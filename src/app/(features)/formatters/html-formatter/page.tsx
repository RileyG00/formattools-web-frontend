import type { Metadata } from "next";
import HtmlFormatter from "@/components/features/formatters/html";
import { formatters_Html } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(formatters_Html);

const HtmlFormatterPage: React.FC = () => {
	return <HtmlFormatter />;
};

export default HtmlFormatterPage;
