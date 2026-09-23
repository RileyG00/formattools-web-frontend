import type { Metadata } from "next";
import FeatureOptionPreview from "@/components/features/featureOptionPreview";
import { featureRoutes, getFeatureOptionByRoute } from "@/config/features";
import { buildFeatureOptionMetadata } from "@/utils/metadataUtils";

const featureOption = getFeatureOptionByRoute(featureRoutes.escapers_encoders);

export const metadata: Metadata = buildFeatureOptionMetadata(featureOption);

const EscapersEncodersPage: React.FC = () => {
	return <FeatureOptionPreview featureOption={featureOption} />;
};

export default EscapersEncodersPage;
