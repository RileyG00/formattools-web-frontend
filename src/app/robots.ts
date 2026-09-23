import type { MetadataRoute } from "next";
import { env } from "@/config/env";

const robots = (): MetadataRoute.Robots => {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: new URL("/sitemap.xml", env.siteUrl).toString(),
	};
};

export default robots;
