import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import DiceRollRng from "@/components/features/rngs/diceRollRng";
import CoinTossRng from "@/components/features/rngs/coinTossRng";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const RngsPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type) return <DiceRollRng />;

		const formatterPath = `${navLinks.rngs}/${type}`;

		switch (formatterPath) {
			case subPageLinks.diceRoleRng:
				return <DiceRollRng />;
			case subPageLinks.coinTossRng:
				return <CoinTossRng />;
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
