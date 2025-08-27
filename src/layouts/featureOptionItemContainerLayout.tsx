import { FC, ReactNode } from "react";

interface FeatureOptionItemContainerLayoutProps {
	children: ReactNode;
}

const FeatureOptionItemContainerLayout: FC<
	FeatureOptionItemContainerLayoutProps
> = ({ children }) => {
	return (
		<div className="h-[800px] flex flex-col w-full gap-4">{children}</div>
	);
};

export default FeatureOptionItemContainerLayout;
