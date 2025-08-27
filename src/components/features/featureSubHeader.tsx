import { ReactNode } from "react";
import { subtitle } from "../primitives";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureSubHeaderProps {
	children: ReactNode;
}

const FeatureSubHeader: React.FC<FeatureSubHeaderProps> = ({ children }) => {
	return (
		<h2
			className={subtitle({
				className: "max-w-3/3 md:max-w-2/3",
			})}
		>
			{children}
		</h2>
	);
};

export default FeatureSubHeader;
