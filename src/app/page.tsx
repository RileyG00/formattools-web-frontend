import type { Metadata } from "next";
import Hero from "@/components/layout/hero";
import { buildPageMetadata, siteDescription } from "@/utils/metadataUtils";

export const metadata: Metadata = buildPageMetadata(
	undefined,
	siteDescription,
	"/",
);

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const HomePage: React.FC = () => {
	return <Hero />;
};

export default HomePage;
