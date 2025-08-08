import { featureConfigs } from "@/config/features";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { FeatureOptionItemStatusChip } from "./featureOptionItemStatus.Chip";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const NavigationList = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<nav className="min-w-fit">
			<Listbox
				className="min-w-fit"
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
										key={item.key}
										href={`/${item.path}`}
									>
										<span className="flex flex-row items-center justify-start">
											<span className="break-keep min-w-fit">
												{item.name}
											</span>
											&nbsp;
											<FeatureOptionItemStatusChip
												status={item.status}
											/>
										</span>
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
