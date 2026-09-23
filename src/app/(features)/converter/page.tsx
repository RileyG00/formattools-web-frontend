import type { Metadata } from "next";
import FeatureOptionPreview from "@/components/features/featureOptionPreview";
import { featureRoutes, getFeatureOptionByRoute } from "@/config/features";
import { buildFeatureOptionMetadata } from "@/utils/metadataUtils";

const featureOption = getFeatureOptionByRoute(featureRoutes.converter);

export const metadata: Metadata = buildFeatureOptionMetadata(featureOption);

const ConvertersPage: React.FC = () => {
	return <FeatureOptionPreview featureOption={featureOption} />;
};

export default ConvertersPage;
