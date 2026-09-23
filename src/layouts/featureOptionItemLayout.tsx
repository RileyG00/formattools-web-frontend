import { ReactNode } from "react";
import FeatureNavigationListBox from "@/components/layout/featureNavigationListBox";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureOptionItemLayoutProps {
	children: ReactNode;
}

// Page frame for category and tool pages. The sidebar only appears on very wide
// screens; below that the navbar menus cover navigation and tools get the full width.
const FeatureOptionItemLayout: React.FC<FeatureOptionItemLayoutProps> = ({
	children,
}) => {
	return (
		<main className="mx-auto flex w-full max-w-screen-2xl grow flex-row gap-10 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
			{/* Size containment keeps the sidebar from making the page taller than its content;
			    it just stretches to match. The card owns the rounded corners and padding, and the
			    list scrolls inside it so the scrollbar stays clear of the corners. */}
			<nav className="hidden w-60 shrink-0 [contain:size] 2xl:block">
				<div className="sticky top-24 flex max-h-[min(100%,calc(100dvh-8rem))] overflow-hidden rounded-2xl bg-surface py-3 pr-1 pl-2">
					<FeatureNavigationListBox className="scrollbar-subtle w-full overflow-y-auto pr-1" />
				</div>
			</nav>
			{children}
		</main>
	);
};

export default FeatureOptionItemLayout;
