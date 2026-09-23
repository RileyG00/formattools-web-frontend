import type { Metadata } from "next";
import UrlEncoderDecoder from "@/components/features/escapers/urlEncoder";
import { escapers_Url } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(escapers_Url);

const UrlEncoderDecoderPage: React.FC = () => {
	return <UrlEncoderDecoder />;
};

export default UrlEncoderDecoderPage;
