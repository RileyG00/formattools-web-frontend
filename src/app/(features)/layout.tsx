import { ReactNode } from "react";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeaturesLayoutProps {
	children: ReactNode;
}

// Every category and tool page shares the sidebar navigation layout.
const FeaturesLayout: React.FC<FeaturesLayoutProps> = ({ children }) => {
	return <FeatureOptionItemLayout>{children}</FeatureOptionItemLayout>;
};

export default FeaturesLayout;
