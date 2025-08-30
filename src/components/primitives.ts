import { tv } from "tailwind-variants";

export const heading = tv({
	base: "tracking-tight inline font-semibold",
	variants: {
		color: {
			violet: "from-[#FF1CF7] to-[#b249f8]",
			yellow: "from-[#FF705B] to-[#FFB457]",
			blue: "from-[#5EA2EF] to-[#0072F5]",
			cyan: "from-[#00b7fa] to-[#01cfea]",
			green: "from-[#6FEE8D] to-[#17c964]",
			pink: "from-[#FF72E1] to-[#F54C7A]",
			foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
		},
		level: {
			h1: "md:text-6xl",
			h2: "md:text-5xl",
			h3: "md:text-4xl",
			h4: "md:text-3xl",
			h5: "md:text-2xl",
			h6: "md:text-1xl",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		level: "h1",
	},
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
		},
	],
});

export const title = tv({
	base: "tracking-tight inline font-semibold",
	variants: {
		color: {
			violet: "from-[#FF1CF7] to-[#b249f8]",
			yellow: "from-[#FF705B] to-[#FFB457]",
			blue: "from-[#5EA2EF] to-[#0072F5]",
			cyan: "from-[#00b7fa] to-[#01cfea]",
			green: "from-[#6FEE8D] to-[#17c964]",
			pink: "from-[#FF72E1] to-[#F54C7A]",
			foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
		},
		size: {
			xs: "text-1xl md:text-2xl",
			sm: "text-2xl md:text-3xl",
			md: "text-3xl md:text-4xl",
			lg: "text-4xl md:text-6xl",
		},

		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "sm",
	},
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
		},
	],
});

export const subtitle = tv({
	base: "w-full md:w-1/2 my-2 text-default-600 block max-w-full text-balance",
	variants: {
		fullWidth: {
			true: "!w-full",
		},
		size: {
			xs: "text-md md:text-lg",
			sm: "text-xl md:text-1xl",
			md: "text-1xl md:text-2xl",
			lg: "text-2xl md:text-3xl",
		},
	},
	defaultVariants: {
		fullWidth: true,
		size: "xs",
	},
});
