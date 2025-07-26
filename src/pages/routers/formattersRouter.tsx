import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import JsonFormatterPage from "../subpages/jsonFormatter";
import XmlFormatterPage from "../subpages/xmlFormatter";
import HtmlFormatterPage from "../subpages/htmlFormatter";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const FormattersPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { formatterType } = useParams();

	const getFormatterPageByType = (
		formatterType: SubPageLinkValue | undefined,
	): ReactNode => {
		const formatterPath = `${navLinks.formatters}/${formatterType}`;

		switch (formatterPath) {
			case subPageLinks.jsonFormatter:
				return <JsonFormatterPage />;
			case subPageLinks.xmlFormatter:
				return <XmlFormatterPage />;
			case subPageLinks.htmlFormatter:
				return <HtmlFormatterPage />;
			default:
				return <JsonFormatterPage />;
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return getFormatterPageByType(formatterType as unknown as SubPageLinkValue);
};

export default FormattersPageRouter;
