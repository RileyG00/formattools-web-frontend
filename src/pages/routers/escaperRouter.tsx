import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import JsonEscaperPage from "../subpages/formatters/jsonEscaper";

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
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return getPageByType(escaperType as unknown as SubPageLinkValue);
};

export default EscaperPageRouter;
