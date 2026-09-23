"use client";

import { Description, Label, ListBox, Select } from "@heroui/react";

export type SelectOption<T extends string> = {
	id: T;
	label: string;
};

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface OptionSelectProps<T extends string> {
	label: string;
	options: readonly SelectOption<T>[];
	value: T;
	onChange: (value: T) => void;
	description?: string;
	isDisabled?: boolean;
	className?: string;
}

// A single-select dropdown driven by a list of options.
const OptionSelect = <T extends string>({
	label,
	options,
	value,
	onChange,
	description,
	isDisabled,
	className = "w-full sm:w-56",
}: OptionSelectProps<T>) => {
	return (
		<Select
			fullWidth
			className={className}
			isDisabled={isDisabled}
			value={value}
			onChange={(key) => {
				const option = options.find((o) => o.id === key);
				if (option) onChange(option.id);
			}}
		>
			<Label>{label}</Label>
			<Select.Trigger>
				<Select.Value />
				<Select.Indicator />
			</Select.Trigger>
			{description && <Description>{description}</Description>}
			<Select.Popover>
				<ListBox>
					{options.map((option) => (
						<ListBox.Item
							key={option.id}
							id={option.id}
							textValue={option.label}
						>
							{option.label}
							<ListBox.ItemIndicator />
						</ListBox.Item>
					))}
				</ListBox>
			</Select.Popover>
		</Select>
	);
};

export default OptionSelect;

// Indentation choices shared by the JSON, XML, and HTML tools.
export type IndentationOption = "2" | "4" | "tab" | "compact";

export const indentationOptions: readonly SelectOption<IndentationOption>[] = [
	{ id: "2", label: "2 spaces" },
	{ id: "4", label: "4 spaces" },
	{ id: "tab", label: "Tab" },
	{ id: "compact", label: "Compact" },
];
