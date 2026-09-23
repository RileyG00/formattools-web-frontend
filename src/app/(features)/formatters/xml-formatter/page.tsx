import type { Metadata } from "next";
import XmlFormatter from "@/components/features/formatters/xml";
import { formatters_Xml } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(formatters_Xml);

const XmlFormatterPage: React.FC = () => {
	return <XmlFormatter />;
};

export default XmlFormatterPage;
