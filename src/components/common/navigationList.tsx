import { useNavigate } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const NavigationList = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const navigate = useNavigate();

	const handleNavigation = (path: string): void => {
		navigate(path);
	};

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<Listbox
			className="w-fit"
			aria-label="List of available formatters, obfuscators, and validators."
			variant="flat"
		>
			<ListboxSection
				showDivider
				title="Formatters"
				aria-label="List of available formatters"
				items={siteConfig.formatters}
			>
				{(formatter) => {
					return (
						<ListboxItem
							aria-label={formatter.name}
							key={formatter.key}
							onPress={() =>
								handleNavigation(`/${formatter.path}`)
							}
						>
							{formatter.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
			<ListboxSection
				showDivider
				title="Escapers / Encoders"
				aria-label="List of available escapers"
				items={siteConfig.escapers}
			>
				{(escaper) => {
					return (
						<ListboxItem
							aria-label={escaper.name}
							key={escaper.key}
							onPress={() => handleNavigation(`/${escaper.path}`)}
						>
							{escaper.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
			<ListboxSection
				showDivider
				title="Ciphers"
				aria-label="List of available ciphers"
				items={siteConfig.ciphers}
			>
				{(ciphers) => {
					return (
						<ListboxItem
							aria-label={ciphers.name}
							key={ciphers.key}
							onPress={() => handleNavigation(`/${ciphers.path}`)}
						>
							{ciphers.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
		</Listbox>
	);
};

export default NavigationList;
