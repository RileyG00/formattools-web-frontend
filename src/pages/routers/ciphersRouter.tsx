import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import FeatureContainer from "@/components/common/featureContainer";
import GriffinereCipher from "@/components/features/ciphers/griffinereCipher";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const CiphersPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { type } = useParams();

	const getPageByType = (type: SubPageLinkValue | undefined): ReactNode => {
		if (!type) return <GriffinereCipher />;

		const formatterPath = `${navLinks.ciphers}/${type}`;

		switch (formatterPath) {
			case subPageLinks.griffinereCipher:
				return <GriffinereCipher />;
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
