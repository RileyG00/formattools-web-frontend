import type { Metadata } from "next";
import SqlFormatter from "@/components/features/formatters/sql";
import { formatters_Sql } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(formatters_Sql);

const SqlFormatterPage: React.FC = () => {
	return <SqlFormatter />;
};

export default SqlFormatterPage;
