import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import JsonEscaper from "@/components/features/escapers/jsonEscaper";
import UrlEncoderDecoder from "@/components/features/escapers/urlEncoderDecoder";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const EscaperPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type) return <JsonEscaper />;

		const formatterPath = `${navLinks.escapers}/${type}`;

		switch (formatterPath) {
			case subPageLinks.jsonEscaper:
				return <JsonEscaper />;
			case subPageLinks.urlEncoder:
				return <UrlEncoderDecoder />;
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<FeatureContainer>
			{getPageByType(type as unknown as SubPageLinkValue)}
		</FeatureContainer>
	);
};

export default EscaperPageRouter;
