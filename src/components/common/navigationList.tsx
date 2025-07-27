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
		<nav>
			<Listbox
				className="w-fit"
				aria-label="List of available formatters, obfuscators, and validators."
				variant="flat"
			>
				<ListboxSection
					showDivider
					role="group"
					title="Formatters"
					aria-label="List of available formatters."
					items={siteConfig.formatters.items}
				>
					{(item) => {
						return (
							<ListboxItem
								aria-label={item.name}
								role="option"
								title={item.name}
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
					role="group"
					title="Escapers / Encoders"
					aria-label="List of available escapers."
					items={siteConfig.escapers.items}
				>
					{(item) => {
						return (
							<ListboxItem
								aria-label={item.name}
								role="option"
								title={item.name}
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
					role="group"
					title="Ciphers"
					aria-label="List of available ciphers."
					items={siteConfig.ciphers.items}
				>
					{(item) => {
						return (
							<ListboxItem
								aria-label={item.name}
								role="option"
								title={item.name}
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
					role="group"
					title="RNGs"
					aria-label="List of available random number generators."
					items={siteConfig.rngs.items}
				>
					{(item) => {
						return (
							<ListboxItem
								aria-label={item.name}
								role="option"
								title={item.name}
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
					role="group"
					title="Generators"
					aria-label="List of available generators, such as strings."
					items={siteConfig.generators.items}
				>
					{(item) => {
						return (
							<ListboxItem
								aria-label={item.name}
								role="option"
								title={item.name}
								key={item.key}
								href={`/${item.path}`}
							>
								{item.name}
							</ListboxItem>
						);
					}}
				</ListboxSection>
			</Listbox>
		</nav>
	);
};

export default NavigationList;
