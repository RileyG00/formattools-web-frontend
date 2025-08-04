export const getPageTitle = (
	titleSuffix: string | undefined = undefined,
): string => {
	const prefix: string = import.meta.env.VITE_Page_Title_Prefix;

	if (!titleSuffix) return prefix;

	return `${prefix} | ${titleSuffix}`;
};
