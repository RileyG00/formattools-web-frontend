export const getPageTitle = (
	titleSuffix: string | undefined = undefined,
): string => {
	const prefix: string = import.meta.env.VITE_Page_Title_Prefix;

	if (!titleSuffix) return prefix;

	return `${prefix} | ${titleSuffix}`;
};

export const buildCanonical = (pathname: string): string => {
	const base: string = import.meta.env.VITE_Page_AbsoluteURI;

	const url = new URL(pathname || "/", base);
	url.search = ""; // drop query params
	url.hash = ""; // drop hash

	// Optional: enforce no trailing slash (except root). Flip logic if you prefer slashes.
	if (url.pathname !== "/" && url.pathname.endsWith("/")) {
		url.pathname = url.pathname.slice(0, -1);
	}
	return url.toString();
};
