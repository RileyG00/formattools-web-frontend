import { ReactNode } from "react";
import FeatureNavigationListBox from "@/components/layout/featureNavigationListBox";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureOptionItemLayoutProps {
	children: ReactNode;
}

// Sidebar navigation (desktop only) next to the active feature page.
const FeatureOptionItemLayout: React.FC<FeatureOptionItemLayoutProps> = ({
	children,
}) => {
	return (
		<main className="flex h-full w-full max-w-screen-2xl grow flex-row justify-between gap-8 px-[4%] pt-8">
			<nav className="hidden max-h-[775px] min-w-fit xl:flex">
				<FeatureNavigationListBox className="h-full min-w-fit overflow-y-auto rounded-2xl bg-surface/60 p-2 shadow-surface" />
			</nav>
			{children}
		</main>
	);
};

export default FeatureOptionItemLayout;
