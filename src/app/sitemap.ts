import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { featureConfigs } from "@/config/features";
import { toHref } from "@/utils/configUtils";

// Generated from the feature config so every tool is always listed.
const sitemap = (): MetadataRoute.Sitemap => {
	const lastModified: Date = new Date();
	const url = (path: string): string => new URL(path, env.siteUrl).toString();

	return [
		{ url: url("/"), lastModified },
		...featureConfigs.flatMap((feature) => [
			{ url: url(toHref(feature.path)), lastModified },
			...feature.items.map((item) => ({
				url: url(toHref(item.path)),
				lastModified,
			})),
		]),
	];
};

export default sitemap;
