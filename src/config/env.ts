//----------------------------------------------------------------------------------------
//Public Environment Configuration
//----------------------------------------------------------------------------------------
// `NEXT_PUBLIC_*` variables must be referenced literally so Next.js can inline them.
export const env = {
	appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Data Formatters",
	pageTitlePrefix:
		process.env.NEXT_PUBLIC_PAGE_TITLE_PREFIX ?? "Data Formatters",
	siteUrl:
		process.env.NEXT_PUBLIC_SITE_URL ??
		"https://dataformatters.netlify.app",
	gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
	chromeExtensionTabularToTable:
		process.env.NEXT_PUBLIC_CHROME_EXTENSION_TABULAR_TO_TABLE ?? "",
} as const;
