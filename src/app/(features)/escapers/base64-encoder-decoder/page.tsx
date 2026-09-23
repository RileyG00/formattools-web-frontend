import type { Metadata } from "next";
import Base64EncoderDecoder from "@/components/features/escapers/base64Encoder";
import { escapers_Base64 } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(escapers_Base64);

const Base64EncoderDecoderPage: React.FC = () => {
	return <Base64EncoderDecoder />;
};

export default Base64EncoderDecoderPage;
