"use client";

import { Button, Description, Dropdown, Label, Separator } from "@heroui/react";
import { ChevronDownIcon } from "@/components/common/icons";
import { FeatureOption } from "@/types/siteConfigs";
import { toHref } from "@/utils/configUtils";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface NavDropdownFeatureItemProps {
	item: FeatureOption;
}

const NavDropdownFeatureItem: React.FC<NavDropdownFeatureItemProps> = ({
	item,
}) => {
	return (
		<Dropdown>
			<Button variant="ghost" size="sm">
				{item.pageTitle}
				<ChevronDownIcon size={14} />
			</Button>
			<Dropdown.Popover placement="bottom start" className="min-w-64">
				<Dropdown.Menu aria-label={`${item.pageTitle} tools`}>
					{/* Allow the user to select the page with all of the features */}
					<Dropdown.Item
						id={item.key}
						href={toHref(item.path)}
						textValue={item.pageTitle}
					>
						<div className="flex flex-col">
							<Label className="text-accent">
								{item.pageTitle}
							</Label>
							<Description>
								Full list of {item.pageTitle} with descriptions
							</Description>
						</div>
					</Dropdown.Item>
					<Separator />

					{/* Allow the user to select a specific feature */}
					{item.items.map((featureItem) => (
						<Dropdown.Item
							key={featureItem.key}
							id={featureItem.key}
							href={toHref(featureItem.path)}
							textValue={featureItem.name}
						>
							<Label>{featureItem.name}</Label>
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
};

export default NavDropdownFeatureItem;
