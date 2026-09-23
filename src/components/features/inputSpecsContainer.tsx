import { ReactNode } from "react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface InputSpecsContainerProps {
	isDismissFlexGrow?: boolean;
	isDismissColReversal?: boolean;
	children: ReactNode;
}

// Lays out the input card beside the specifications card (stacked on mobile).
const InputSpecsContainer: React.FC<InputSpecsContainerProps> = ({
	isDismissFlexGrow = false,
	isDismissColReversal = false,
	children,
}) => {
	return (
		<div
			className={`flex min-h-fit flex-col gap-4 md:flex-row ${isDismissColReversal ? "" : "flex-col-reverse"} ${isDismissFlexGrow ? "" : "grow"}`}
		>
			{children}
		</div>
	);
};

export default InputSpecsContainer;
