import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
	navLinks,
	siteConfig,
	subPageLinks,
	SubPageLinkValue,
} from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import DiceRollRng from "@/components/features/rngs/diceRollRng";
import CoinTossRng from "@/components/features/rngs/coinTossRng";
import OptionsDescriptions from "../optionsDescriptions";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const RngsPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type)
			return (
				<OptionsDescriptions
					identifier={"rngs"}
					featureHeader={siteConfig.rngs.header}
					featureSubheader={siteConfig.rngs.subheader}
					options={siteConfig.rngs.items}
				/>
			);

		const formatterPath = `${navLinks.rngs}/${type}`;

		switch (formatterPath) {
			case subPageLinks.diceRoleRng:
				return <DiceRollRng />;
			case subPageLinks.coinTossRng:
				return <CoinTossRng />;
			default:
				return (
					<OptionsDescriptions
						identifier={"rngs"}
						featureHeader={siteConfig.rngs.header}
						featureSubheader={siteConfig.rngs.subheader}
						options={siteConfig.rngs.items}
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

export default RngsPageRouter;
