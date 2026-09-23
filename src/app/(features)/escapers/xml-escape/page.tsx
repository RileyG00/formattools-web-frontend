import type { Metadata } from "next";
import XmlEscaper from "@/components/features/escapers/xmlEscaper";
import { escapers_Xml } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(escapers_Xml);

const XmlEscaperPage: React.FC = () => {
	return <XmlEscaper />;
};

export default XmlEscaperPage;
