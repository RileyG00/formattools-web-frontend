import type { Metadata } from "next";
import TabularToTableFormatter from "@/components/features/formatters/tabularToTable";
import { formatters_TabularToTable } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(
	formatters_TabularToTable,
);

const TabularToTableFormatterPage: React.FC = () => {
	return <TabularToTableFormatter />;
};

export default TabularToTableFormatterPage;
