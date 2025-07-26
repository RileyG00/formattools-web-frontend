import { siteConfig } from "@/config/site";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const NavigationList = () => {
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
				aria-label="List of available formatters."
				items={siteConfig.formatters}
			>
				{(item) => {
					return (
						<ListboxItem
							aria-label={item.name}
							key={item.key}
							href={`/${item.path}`}
						>
							{item.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
			<ListboxSection
				showDivider
				title="Escapers / Encoders"
				aria-label="List of available escapers."
				items={siteConfig.escapers}
			>
				{(item) => {
					return (
						<ListboxItem
							aria-label={item.name}
							key={item.key}
							href={`/${item.path}`}
						>
							{item.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
			<ListboxSection
				showDivider
				title="Ciphers"
				aria-label="List of available ciphers."
				items={siteConfig.ciphers}
			>
				{(item) => {
					return (
						<ListboxItem
							aria-label={item.name}
							key={item.key}
							href={`/${item.path}`}
						>
							{item.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
			<ListboxSection
				showDivider
				title="RNGs"
				aria-label="List of available random number generators."
				items={siteConfig.rngs}
			>
				{(item) => {
					return (
						<ListboxItem
							aria-label={item.name}
							key={item.key}
							href={`/${item.path}`}
						>
							{item.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
			<ListboxSection
				showDivider
				title="Generators"
				aria-label="List of available generators, such as strings."
				items={siteConfig.generators}
			>
				{(item) => {
					return (
						<ListboxItem
							aria-label={item.name}
							key={item.key}
							href={`/${item.path}`}
						>
							{item.name}
						</ListboxItem>
					);
				}}
			</ListboxSection>
		</Listbox>
	);
};

export default NavigationList;
