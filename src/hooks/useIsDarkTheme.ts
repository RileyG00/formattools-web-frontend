import { useMemo, useState } from "react";

const ThemeProps = {
	key: "heroui-theme",
	light: "light",
	dark: "dark",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

const useIsDarkTheme = (defaultTheme?: Theme) => {
	const [theme, _] = useState<Theme>(() => {
		const storedTheme = localStorage.getItem(
			ThemeProps.key,
		) as Theme | null;

		return storedTheme || (defaultTheme ?? ThemeProps.light);
	});

	const isDark = useMemo(() => {
		return theme === ThemeProps.dark;
	}, [theme]);

	return isDark;
};

export default useIsDarkTheme;
