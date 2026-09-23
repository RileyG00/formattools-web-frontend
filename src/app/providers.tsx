"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { RouterProvider, Toast } from "@heroui/react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface ProvidersProps {
	children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
	// Lets HeroUI links (Link, ListBox.Item, Dropdown.Item) use client-side navigation.
	const router = useRouter();

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<RouterProvider navigate={router.push}>
				<Toast.Provider placement="top" />
				{children}
			</RouterProvider>
		</ThemeProvider>
	);
};

export default Providers;
