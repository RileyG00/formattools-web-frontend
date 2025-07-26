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
					aria-label="JSON Formatter"
					key={subPageLinks.jsonFormatter}
					onPress={() =>
						handleNavigation(`/${subPageLinks.jsonFormatter}`)
					}
				>
					JSON Formatter
				</ListboxItem>
				<ListboxItem
					aria-label="XML Formatter"
					key={subPageLinks.xmlFormatter}
					onPress={() =>
						handleNavigation(`/${subPageLinks.xmlFormatter}`)
					}
				>
					XML Formatter
				</ListboxItem>
				<ListboxItem
					aria-label="HTML Formatter"
					key={subPageLinks.htmlFormatter}
					onPress={() =>
						handleNavigation(`/${subPageLinks.htmlFormatter}`)
					}
				>
					HTML Formatter
				</ListboxItem>
			</ListboxSection>
		</Listbox>
	);
};

export default FormattersList;
