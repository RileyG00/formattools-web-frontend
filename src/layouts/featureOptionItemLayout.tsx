import NavigationList from "@/components/features/navigationList";
import { ReactNode } from "react";

interface FeatureLayoutProps {
	children: ReactNode;
}

const FeatureOptionItemLayout: React.FC<FeatureLayoutProps> = ({
	children,
}) => {
	return (
		<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1 gap-8">
			<NavigationList />
			{children}
		</main>
	);
};

export default FeatureOptionItemLayout;
