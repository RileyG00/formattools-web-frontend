import { ReactNode } from "react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureOptionItemContainerLayoutProps {
	disobeyMinHeightOnMobile?: boolean;
	children: ReactNode;
}

const FeatureOptionItemContainerLayout: React.FC<
	FeatureOptionItemContainerLayoutProps
> = ({ disobeyMinHeightOnMobile = false, children }) => {
	return (
		<div
			className={`${disobeyMinHeightOnMobile ? "md:h-[775px]" : "h-[775px]"} flex min-w-0 grow flex-col gap-4`}
		>
			{children}
		</div>
	);
};

export default FeatureOptionItemContainerLayout;
