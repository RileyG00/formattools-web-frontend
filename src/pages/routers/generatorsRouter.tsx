import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
	navLinks,
	siteConfig,
	subPageLinks,
	SubPageLinkValue,
} from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import StringGenerator from "@/components/features/generators/stringGenerator";
import LoremIpsumGenerator from "@/components/features/generators/loremIpsumGenerator";
import NumberGenerator from "@/components/features/generators/numberGenerator";
import OptionsDescriptions from "../optionsDescriptions";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const GeneratorsPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type)
			return (
				<OptionsDescriptions
					identifier={navLinks.generators}
					featureHeader={siteConfig.generators.header}
					featureSubheader={siteConfig.generators.subheader}
					options={siteConfig.generators.items}
				/>
			);

		const formatterPath = `${navLinks.generators}/${type}`;

		switch (formatterPath) {
			case subPageLinks.stringGenerator:
				return <StringGenerator />;
			case subPageLinks.numberGenerator:
				return <NumberGenerator />;
			case subPageLinks.loremIpsumGenerator:
				return <LoremIpsumGenerator />;
			default:
				return (
					<OptionsDescriptions
						identifier={navLinks.generators}
						featureHeader={siteConfig.generators.header}
						featureSubheader={siteConfig.generators.subheader}
						options={siteConfig.generators.items}
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

export default GeneratorsPageRouter;
