import type { Metadata } from "next";
import FeatureOptionPreview from "@/components/features/featureOptionPreview";
import { featureRoutes, getFeatureOptionByRoute } from "@/config/features";
import { buildFeatureOptionMetadata } from "@/utils/metadataUtils";

const featureOption = getFeatureOptionByRoute(featureRoutes.formatters);

export const metadata: Metadata = buildFeatureOptionMetadata(featureOption);

const FormattersPage: React.FC = () => {
	return <FeatureOptionPreview featureOption={featureOption} />;
};

export default FormattersPage;
