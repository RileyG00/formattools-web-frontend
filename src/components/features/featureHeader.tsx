import { ReactNode } from "react";
import { title } from "../primitives";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureHeaderProps {
	children: ReactNode;
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({ children }) => {
	return <h1 className={title({ size: "sm", color: "pink" })}>{children}</h1>;
};

export default FeatureHeader;
