import { FC, ReactNode } from "react";

interface FeatureOptionItemContainerLayoutProps {
	disobeyMinHeightOnMobile?: boolean;
	children: ReactNode;
}

const FeatureOptionItemContainerLayout: FC<
	FeatureOptionItemContainerLayoutProps
> = ({ disobeyMinHeightOnMobile = false, children }) => {
	return (
		<div
			className={`${disobeyMinHeightOnMobile ? "md:h-[800px]" : "h-[800px]"} min-w-0 flex flex-col flex-grow gap-4`}
		>
			{children}
		</div>
	);
};

export default FeatureOptionItemContainerLayout;
