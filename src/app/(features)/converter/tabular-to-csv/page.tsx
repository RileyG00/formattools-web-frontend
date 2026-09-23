import type { Metadata } from "next";
import TabularToCsvConverter from "@/components/features/converters/tabularToCsv";
import { converters_TabularToCsv } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(
	converters_TabularToCsv,
);

const TabularToCsvConverterPage: React.FC = () => {
	return <TabularToCsvConverter />;
};

export default TabularToCsvConverterPage;
