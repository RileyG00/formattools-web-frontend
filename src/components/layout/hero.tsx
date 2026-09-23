"use client";

import { ReactNode } from "react";
import NextLink from "next/link";
import { buttonVariants, Typography } from "@heroui/react";
import { featureConfigs } from "@/config/features";
import { toHref } from "@/utils/configUtils";

const headingClass: string =
	"block text-4xl font-semibold tracking-tight md:text-6xl";
const emphasisClass: string = "text-accent";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface HeroProps {
	eyebrow?: ReactNode;
}

// Landing hero used by the home page and the 404 page.
const Hero: React.FC<HeroProps> = ({ eyebrow }) => {
	return (
		<main className="flex flex-col items-center justify-center gap-4 px-6 py-8 md:py-10">
			<div className="mt-20 max-w-3xl text-center">
				{eyebrow}
				<Typography.Heading
					level={1}
					align="center"
					className="flex flex-col gap-1"
				>
					<span className={headingClass}>Your All-in-One</span>
					<span className={`${headingClass} ${emphasisClass}`}>
						Developer Toolbox
					</span>
					<span className={headingClass}>
						Entirely Free. Always Online.
					</span>
				</Typography.Heading>
				<Typography.Paragraph
					align="center"
					color="muted"
					className="mt-4 text-base text-balance md:text-lg"
				>
					Formatters, Obfuscators, Validators, all included in one
					tool. 15+ pro-grade coding tools. Format faster, ad-free,
					right from your browser.
				</Typography.Paragraph>
			</div>

			<NextLink
				href={toHref(featureConfigs[0].path)}
				className={buttonVariants({ variant: "primary", size: "lg" })}
			>
				Get Started
			</NextLink>
		</main>
	);
};

export default Hero;
