import { Link } from "@heroui/link";
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
} from "@heroui/navbar";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/hooks/useThemeSwitch";
import { GithubIcon } from "@/components/common/icons";
import { Logo } from "@/components/common/icons";

export const Navbar = () => {
	return (
		<HeroUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="flex flex-row gap-8">
				<li>
					<NavbarBrand className="gap-3 max-w-fit">
						<Link
							className="flex justify-start items-center gap-1"
							color="foreground"
							href="/"
						>
							<Logo />
							<p className="font-bold text-inherit">
								Data Formatters
							</p>
						</Link>
					</NavbarBrand>
				</li>
				{siteConfig.navItems.map((item) => (
					<NavbarItem key={item.href}>
						<Link color="foreground" href={item.href}>
							{item.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link
						isExternal
						href={siteConfig.links.github}
						title="GitHub"
					>
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<NavbarItem>
					<Link
						isExternal
						href={siteConfig.links.github}
						aria-label="Navigate to RileyG00's GitHub page."
						title="Navigate to RileyG00's GitHub page."
					>
						<GithubIcon
							className="text-default-500"
							id="githubIcon"
						/>
					</Link>
					<ThemeSwitch />
					<NavbarMenuToggle />
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};
