import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
	navLinks,
	siteConfig,
	subPageLinks,
	SubPageLinkValue,
} from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import JsonFormatter from "@/components/features/formatters/jsonFormatter";
import XmlFormatter from "@/components/features/formatters/xmlFormatter";
import HtmlFormatter from "@/components/features/formatters/htmlFormatter";
import SqlFormatter from "@/components/features/formatters/sqlFormatter";
import SqlToJiraTableFormatter from "@/components/features/formatters/sqlToJiraTableFormatter";
import OptionsDescriptions from "../optionsDescriptions";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const FormattersPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type)
			return (
				<OptionsDescriptions
					identifier={navLinks.formatters}
					featureHeader={siteConfig.formatters.header}
					featureSubheader={siteConfig.formatters.subheader}
					options={siteConfig.formatters.items}
				/>
			);

		const formatterPath = `${navLinks.formatters}/${type}`;

		switch (formatterPath) {
			case subPageLinks.jsonFormatter:
				return <JsonFormatter />;
			case subPageLinks.xmlFormatter:
				return <XmlFormatter />;
			case subPageLinks.htmlFormatter:
				return <HtmlFormatter />;
			case subPageLinks.sqlFormatter:
				return <SqlFormatter />;
			case subPageLinks.sqlToJiraTableFormatter:
				return <SqlToJiraTableFormatter />;
			default:
				return (
					<OptionsDescriptions
						identifier={navLinks.formatters}
						featureHeader={siteConfig.formatters.header}
						featureSubheader={siteConfig.formatters.subheader}
						options={siteConfig.formatters.items}
					/>
				);
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

export default FormattersPageRouter;
