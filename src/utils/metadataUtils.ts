import type { Metadata } from "next";
import { env } from "@/config/env";
import { FeatureOption, FeatureOptionItem } from "@/types/siteConfigs";
import { toHref } from "@/utils/configUtils";

export const siteDescription: string =
	"Data Formatters is a free, browser-based toolbox with 15+ pro coding utilities. Format JSON, XML, and more, convert, test & debug anything in seconds. No installs, just ship faster.";

export const getPageTitle = (
	titleSuffix: string | undefined = undefined,
): string => {
	const prefix: string = env.pageTitlePrefix;

	if (!titleSuffix) return prefix;

	return `${prefix} | ${titleSuffix}`;
};

export const buildPageMetadata = (
	pageTitle: string | undefined,
	pageDescription: string,
	path: string,
): Metadata => {
	const title: string = getPageTitle(pageTitle);

	return {
		title: { absolute: title },
		description: pageDescription,
		alternates: { canonical: path },
		openGraph: {
			title,
			description: pageDescription,
			url: path,
			siteName: env.appName,
			type: "website",
		},
	};
};

export const buildFeatureOptionMetadata = (option: FeatureOption): Metadata =>
	buildPageMetadata(option.pageTitle, option.subheader, toHref(option.path));

export const buildFeatureItemMetadata = (item: FeatureOptionItem): Metadata =>
	buildPageMetadata(item.pageTitle, item.description, toHref(item.path));
