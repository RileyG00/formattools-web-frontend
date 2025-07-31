import { featureConfigs } from "@/config/site";
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
				items={featureConfigs}
			>
				{(feature) => {
					return (
						<ListboxSection
							showDivider
							key={feature.key}
							role="group"
							title={feature.header}
							aria-label={`Collection of elements under the '${feature.header} feature.'`}
							items={feature.items}
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
					);
				}}
			</Listbox>
		</nav>
	);
};

export default NavigationList;
