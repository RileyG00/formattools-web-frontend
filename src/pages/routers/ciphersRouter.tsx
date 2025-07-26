import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { navLinks, subPageLinks, SubPageLinkValue } from "@/config/site";
import GriffinereCipherPage from "../subpages/ciphers/griffinere";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const CiphersPageRouter = () => {
	//------------------------------------------------------------------------------------
	//Collect Formatter Type
	//------------------------------------------------------------------------------------
	const { cipherType } = useParams();

	const getPageByType = (
		cipherType: SubPageLinkValue | undefined,
	): ReactNode => {
		if (!cipherType) return <GriffinereCipherPage />;

		const formatterPath = `${navLinks.ciphers}/${cipherType}`;

		switch (formatterPath) {
			case subPageLinks.griffinereCipher:
				return <GriffinereCipherPage />;
		}
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return getPageByType(cipherType as unknown as SubPageLinkValue);
};

export default CiphersPageRouter;
