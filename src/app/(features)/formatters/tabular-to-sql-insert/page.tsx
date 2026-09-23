import type { Metadata } from "next";
import TabularToSqlInsertFormatter from "@/components/features/formatters/tabularToSqlInsert";
import { formatters_TabularToSql } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(
	formatters_TabularToSql,
);

const TabularToSqlInsertFormatterPage: React.FC = () => {
	return <TabularToSqlInsertFormatter />;
};

export default TabularToSqlInsertFormatterPage;
