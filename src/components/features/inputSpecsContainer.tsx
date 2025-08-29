import { FC, ReactNode } from "react";

interface InputSpecsContainerProps {
	isDismissFlexGrow?: boolean;
	isDissmisColReversal?: boolean;
	children: ReactNode;
}

const InputSpecsContainer: FC<InputSpecsContainerProps> = ({
	isDismissFlexGrow = false,
	isDissmisColReversal = false,
	children,
}) => {
	return (
		<div
			className={`flex flex-col ${isDissmisColReversal ? "" : "flex-col-reverse"} md:flex-row gap-4 min-h-fit ${isDismissFlexGrow ? "" : "flex-grow"}`}
		>
			{children}
		</div>
	);
};

export default InputSpecsContainer;
