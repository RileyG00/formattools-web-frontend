import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
	navLinks,
	siteConfig,
	subPageLinks,
	SubPageLinkValue,
} from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import GriffinereCipher from "@/components/features/ciphers/griffinereCipher";
import OptionsDescriptions from "../optionsDescriptions";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const CiphersPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type)
			return (
				<OptionsDescriptions
					identifier={navLinks.ciphers}
					featureHeader={siteConfig.ciphers.header}
					featureSubheader={siteConfig.ciphers.subheader}
					options={siteConfig.ciphers.items}
				/>
			);

		const formatterPath = `${navLinks.ciphers}/${type}`;

		switch (formatterPath) {
			case subPageLinks.griffinereCipher:
				return <GriffinereCipher />;
			default:
				return (
					<OptionsDescriptions
						identifier={navLinks.ciphers}
						featureHeader={siteConfig.ciphers.header}
						featureSubheader={siteConfig.ciphers.subheader}
						options={siteConfig.ciphers.items}
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

export default CiphersPageRouter;
