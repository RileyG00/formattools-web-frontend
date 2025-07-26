import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import GriffinereCipher from "@/components/features/ciphers/griffinereCipher";
import DiceRollRng from "@/components/features/rngs/diceRollRng";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const RngsPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type) return <GriffinereCipher />;

		const formatterPath = `${navLinks.rngs}/${type}`;

		switch (formatterPath) {
			case subPageLinks.diceRoleRng:
				return <DiceRollRng />;
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
