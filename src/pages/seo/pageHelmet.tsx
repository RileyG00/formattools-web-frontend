import { buildCanonical, getPageTitle } from "@/utils/envUtils";
import { Helmet } from "react-helmet";

interface PageHelmetProps {
	pageTitle: string;
	pageDescription: string;
	pathUrl: string;
}

const PageHelmet: React.FC<PageHelmetProps> = ({
	pageTitle,
	pageDescription,
	pathUrl,
}) => {
	return (
		<Helmet>
			<title>{getPageTitle(pageTitle)}</title>
			<meta name="description" content={pageDescription} />
			<meta property="og:description" content={pageDescription} />
			<link rel="canonical" href={buildCanonical(pathUrl)} />
			<meta property="og:url" content={buildCanonical(pathUrl)} />
		</Helmet>
	);
};

export default PageHelmet;
