import type { Metadata } from "next";
import GriffinereCipher from "@/components/features/ciphers/griffinere";
import { ciphers_Griffinere } from "@/config/features";
import { buildFeatureItemMetadata } from "@/utils/metadataUtils";

export const metadata: Metadata = buildFeatureItemMetadata(ciphers_Griffinere);

const GriffinereCipherPage: React.FC = () => {
	return <GriffinereCipher />;
};

export default GriffinereCipherPage;
