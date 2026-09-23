import type { Metadata } from "next";
import MarkdownFormatter from "@/components/features/formatters/markdown";
import { formatters_Markdown } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(formatters_Markdown);

const MarkdownFormatterPage: React.FC = () => {
	return <MarkdownFormatter />;
};

export default MarkdownFormatterPage;
