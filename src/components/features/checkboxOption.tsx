"use client";

import { ReactNode } from "react";
import { Checkbox } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface CheckboxOptionProps {
	isSelected: boolean;
	onChange: (isSelected: boolean) => void;
	children: ReactNode;
	isDisabled?: boolean;
	className?: string;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
	isSelected,
	onChange,
	children,
	isDisabled,
	className,
}) => {
	return (
		<Checkbox
			isSelected={isSelected}
			onChange={onChange}
			isDisabled={isDisabled}
			className={className}
		>
			<Checkbox.Content className="text-nowrap">
				<Checkbox.Control>
					<Checkbox.Indicator />
				</Checkbox.Control>
				{children}
			</Checkbox.Content>
		</Checkbox>
	);
};

export default CheckboxOption;
