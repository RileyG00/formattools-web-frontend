import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import JsonEscaper from "@/components/features/escapers/jsonEscaper";
import UrlEncoderDecoder from "@/components/features/escapers/urlEncoderDecoder";
import XmlEscaper from "@/components/features/escapers/xmlEscaper";
import Base64EncoderDecoder from "@/components/features/escapers/base64EncoderDecoder";

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
			case subPageLinks.xmlEscaper:
				return <XmlEscaper />;
			case subPageLinks.urlEncoder:
				return <UrlEncoderDecoder />;
			case subPageLinks.base64Encoder:
				return <Base64EncoderDecoder />;
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
