import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import JsonFormatterPage from "../subpages/formatters/jsonFormatter";
import XmlFormatterPage from "../subpages/formatters/xmlFormatter";
import HtmlFormatterPage from "../subpages/formatters/htmlFormatter";
import SqlFormatterPage from "../subpages/formatters/sqlFormatter";

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
		if (!formatterType) return <JsonFormatterPage />;

		const formatterPath = `${navLinks.formatters}/${formatterType}`;

		switch (formatterPath) {
			case subPageLinks.jsonFormatter:
				return <JsonFormatterPage />;
			case subPageLinks.xmlFormatter:
				return <XmlFormatterPage />;
			case subPageLinks.htmlFormatter:
				return <HtmlFormatterPage />;
			case subPageLinks.sqlFormatter:
				return <SqlFormatterPage />;
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return getFormatterPageByType(formatterType as unknown as SubPageLinkValue);
};

export default FormattersPageRouter;
