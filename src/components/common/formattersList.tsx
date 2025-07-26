import { useNavigate } from "react-router-dom";
import { subPageLinks } from "@/config/site";
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
			>
				<ListboxItem
					onPress={() =>
						handleNavigation(`/${subPageLinks.jsonFormatter}`)
					}
				>
					JSON Formatter
				</ListboxItem>
				<ListboxItem
					onPress={() =>
						handleNavigation(`/${subPageLinks.xmlFormatter}`)
					}
				>
					XML Formatter
				</ListboxItem>
			</ListboxSection>
			<ListboxSection
				showDivider
				title="Validators"
				aria-label="List of available obfuscators"
			>
				<ListboxItem>Item A</ListboxItem>
				<ListboxItem>Item B</ListboxItem>
			</ListboxSection>
		</Listbox>
	);
};

export default FormattersList;
