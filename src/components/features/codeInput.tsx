"use client";

import { TextArea, TextField } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface CodeInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	spellCheck?: boolean;
}

// A multi-line input that stretches to fill its card.
const CodeInput: React.FC<CodeInputProps> = ({
	value,
	onChange,
	placeholder,
	spellCheck = false,
}) => {
	return (
		<TextField
			fullWidth
			aria-label="Container for the raw text input"
			value={value}
			onChange={onChange}
			className="flex h-full min-h-0 flex-1 flex-col"
		>
			<TextArea
				fullWidth
				variant="secondary"
				placeholder={placeholder}
				spellCheck={spellCheck}
				className="h-full min-h-[120px] flex-1 resize-none font-mono text-sm leading-relaxed"
			/>
		</TextField>
	);
};

export default CodeInput;
