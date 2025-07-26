import { useNavigate } from "react-router-dom";
import { siteConfig, subPageLinks } from "@/config/site";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const FormattersList = () => {
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
		</Listbox>
	);
};

export default FormattersList;
