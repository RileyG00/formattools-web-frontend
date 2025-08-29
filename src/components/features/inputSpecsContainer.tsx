import { FC, ReactNode } from "react";

interface InputSpecsContainerProps {
	children: ReactNode;
}

const InputSpecsContainer: FC<InputSpecsContainerProps> = ({ children }) => {
	return (
		<div className="flex flex-col flex-col-reverse md:flex-row gap-4 min-h-fit h-full flex-grow">
			{children}
		</div>
	);
};

export default InputSpecsContainer;
