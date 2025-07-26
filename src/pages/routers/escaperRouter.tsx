import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import JsonEscaperPage from "../subpages/escapers/jsonEscaper";
import UrlEncoderDecoderPage from "../subpages/escapers/urlEncoderDecoder";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const EscaperPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { escaperType } = useParams();

	const getPageByType = (
		escaperType: SubPageLinkValue | undefined,
	): ReactNode => {
		if (!escaperType) return <JsonEscaperPage />;

		const formatterPath = `${navLinks.escapers}/${escaperType}`;

		switch (formatterPath) {
			case subPageLinks.jsonEscaper:
				return <JsonEscaperPage />;
			case subPageLinks.urlEncoder:
				return <UrlEncoderDecoderPage />;
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return getPageByType(escaperType as unknown as SubPageLinkValue);
};

export default EscaperPageRouter;
