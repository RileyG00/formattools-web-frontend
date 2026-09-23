"use client";

import { Button, useIsHydrated } from "@heroui/react";
import { useTheme } from "next-themes";
import { MoonFilledIcon, SunFilledIcon } from "@/components/common/icons";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const ThemeSwitch: React.FC = () => {
	const isHydrated = useIsHydrated();
	const { resolvedTheme, setTheme } = useTheme();

	// The active theme is unknown during SSR, so render a placeholder to avoid a hydration mismatch.
	if (!isHydrated) return <div className="size-10" aria-hidden="true" />;

	const isLight: boolean = resolvedTheme !== "dark";

	return (
		<Button
			isIconOnly
			variant="ghost"
			aria-label={
				isLight ? "Switch to dark mode" : "Switch to light mode"
			}
			onPress={() => setTheme(isLight ? "dark" : "light")}
		>
			{isLight ? (
				<MoonFilledIcon size={22} />
			) : (
				<SunFilledIcon size={22} />
			)}
		</Button>
	);
};

export default ThemeSwitch;
