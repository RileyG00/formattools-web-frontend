import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import Script from "next/script";
import { Figtree } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/navbar";
import { env } from "@/config/env";
import { getPageTitle, siteDescription } from "@/utils/metadataUtils";

// Design-system font, exposed as --font-figtree (consumed by --font-sans in globals.css).
const figtree = Figtree({
	subsets: ["latin"],
	variable: "--font-figtree",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(env.siteUrl),
	title: getPageTitle(),
	description: siteDescription,
	applicationName: env.appName,
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon.png", type: "image/png", sizes: "64x64" },
		],
	},
	openGraph: {
		title: getPageTitle(),
		description: siteDescription,
		siteName: env.appName,
		type: "website",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface RootLayoutProps {
	children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang="en" className={figtree.variable} suppressHydrationWarning>
			<body className="bg-background text-foreground antialiased">
				{env.gaMeasurementId && (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${env.gaMeasurementId}`}
							strategy="afterInteractive"
						/>
						<Script
							id="google-analytics"
							strategy="afterInteractive"
						>
							{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "${env.gaMeasurementId}");`}
						</Script>
					</>
				)}
				<Providers>
					<div className="bg-app-gradient flex min-h-screen w-full flex-col items-center justify-start">
						<Navbar />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
