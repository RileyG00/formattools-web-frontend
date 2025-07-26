import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import NavigationList from "./navigationList";
import { ReactNode } from "react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureContainerProps {
	children: ReactNode;
}

const FeatureContainer: React.FC<FeatureContainerProps> = ({ children }) => {
	//------------------------------------------------------------------------------------
	//Create Component
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1">
				<NavigationList />
				{children}
			</main>
		</GradientBackgroundLayout>
	);
};

export default FeatureContainer;
