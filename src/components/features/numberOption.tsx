"use client";

import { Description, Label, NumberField } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface NumberOptionProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
	minValue?: number;
	maxValue?: number;
	description?: string;
	placeholder?: string;
	hideStepper?: boolean;
	useGrouping?: boolean;
	className?: string;
}

const NumberOption: React.FC<NumberOptionProps> = ({
	label,
	value,
	onChange,
	minValue,
	maxValue,
	description,
	placeholder,
	hideStepper = false,
	useGrouping = true,
	className,
}) => {
	return (
		<NumberField
			fullWidth
			className={className}
			value={value}
			// An emptied field reports NaN or undefined; keep the last valid number instead.
			onChange={(newValue) => {
				if (newValue !== undefined && !Number.isNaN(newValue)) {
					onChange(newValue);
				}
			}}
			minValue={minValue}
			maxValue={maxValue}
			formatOptions={{ useGrouping }}
		>
			<Label>{label}</Label>
			<NumberField.Group>
				{!hideStepper && <NumberField.DecrementButton />}
				<NumberField.Input placeholder={placeholder} />
				{!hideStepper && <NumberField.IncrementButton />}
			</NumberField.Group>
			{description && <Description>{description}</Description>}
		</NumberField>
	);
};

export default NumberOption;
