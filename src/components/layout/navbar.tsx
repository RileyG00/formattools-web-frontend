"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Drawer, Link } from "@heroui/react";
import { featureConfigs } from "@/config/features";
import { siteConfig } from "@/config/site";
import { env } from "@/config/env";
import { Bars3Icon, GithubIcon, Logo } from "@/components/common/icons";
import ThemeSwitch from "./themeSwitch";
import NavDropdownFeatureItem from "./navDropdownFeatureItem";
import FeatureNavigationListBox from "./featureNavigationListBox";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const Navbar: React.FC = () => {
	const pathname = usePathname();

	// Track the path the menu was opened on, so navigating to another page closes it.
	const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null);
	const isMenuOpen: boolean = menuOpenedOn === pathname;

	return (
		<header className="sticky top-0 z-40 w-full border-b border-separator/60 bg-background/70 backdrop-blur-lg">
			<nav className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-6">
				<Link
					href="/"
					className="flex items-center gap-1 text-foreground no-underline"
				>
					<Logo />
					<span className="font-bold">{env.appName}</span>
				</Link>

				<ul className="hidden flex-row gap-4 xl:flex">
					{featureConfigs.map((item) => (
						<li key={item.path}>
							<NavDropdownFeatureItem item={item} />
						</li>
					))}
				</ul>

				<div className="flex flex-row items-center gap-1">
					<Link
						href={siteConfig.links.github}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						className="p-2 text-muted"
					>
						<GithubIcon />
					</Link>
					<ThemeSwitch />
					<Button
						isIconOnly
						variant="ghost"
						className="xl:hidden"
						aria-label="Open the navigation menu"
						onPress={() => setMenuOpenedOn(pathname)}
					>
						<Bars3Icon />
					</Button>
				</div>
			</nav>

			<Drawer.Backdrop
				isOpen={isMenuOpen}
				onOpenChange={(isOpen) =>
					setMenuOpenedOn(isOpen ? pathname : null)
				}
			>
				<Drawer.Content placement="left">
					<Drawer.Dialog aria-label="Navigation menu">
						<Drawer.CloseTrigger />
						<Drawer.Header>
							<Drawer.Heading>{env.appName}</Drawer.Heading>
						</Drawer.Header>
						<Drawer.Body>
							<FeatureNavigationListBox />
						</Drawer.Body>
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</header>
	);
};

export default Navbar;
