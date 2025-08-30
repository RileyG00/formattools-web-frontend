import { FC } from "react";
import { Link } from "@heroui/link";
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@heroui/navbar";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/hooks/useThemeSwitch";
import { GithubIcon } from "@/components/common/icons";
import { Logo } from "@/components/common/icons";
import { FeatureOption } from "@/types/siteConfigs";
import { featureConfigs } from "@/config/features";
import NavDropdownFeatureItem from "./navDropdownFeatureItem";

export const Navbar: FC = () => {
	return (
		<HeroUINavbar maxWidth="2xl" position="sticky">
			<NavbarContent>
				<li>
					<NavbarBrand className="gap-3 max-w-fit">
						<Link
							className="flex justify-start items-center gap-1"
							color="foreground"
							href="/"
						>
							<Logo />
							<p className="font-bold text-inherit">
								{import.meta.env.VITE_App_Name}
							</p>
						</Link>
					</NavbarBrand>
				</li>
			</NavbarContent>
			<NavbarContent className="hidden xl:flex flex-row gap-8">
				{featureConfigs.map((item: FeatureOption) => {
					return (
						<NavbarItem key={item.path}>
							<NavDropdownFeatureItem item={item} />
						</NavbarItem>
					);
				})}
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarMenuToggle
					aria-label="Toggle the state of the navigation menu"
					className="xl:hidden"
				/>
				<NavbarItem className="flex flex-row gap-2">
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

			<NavbarMenu>
				{featureConfigs.map((item: FeatureOption) => {
					return (
						<NavbarMenuItem key={item.path}>
							<NavDropdownFeatureItem item={item} />
						</NavbarMenuItem>
					);
				})}
			</NavbarMenu>
		</HeroUINavbar>
	);
};
