import type { Metadata } from "next";
import Hero from "@/components/layout/hero";
import { getPageTitle } from "@/utils/metadataUtils";

export const metadata: Metadata = {
	title: { absolute: getPageTitle("Page Not Found") },
	robots: { index: false },
};

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
// Unknown routes fall back to the landing content (with a real 404 status).
const NotFound: React.FC = () => {
	return (
		<Hero
			eyebrow={
				<p className="mb-6 text-sm font-medium text-muted">
					404 · That page doesn&apos;t exist
				</p>
			}
		/>
	);
};

export default NotFound;
