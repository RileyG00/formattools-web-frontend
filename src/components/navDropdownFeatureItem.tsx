import { FC } from "react";
import { FeatureOption, FeatureOptionItem } from "@/types/siteConfigs";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { ChevronDownIcon } from "./common/icons";
import { getFeatureRoutePath } from "@/utils/configUtils";

interface NavDropdownFeatureItemProps {
	item: FeatureOption;
}

const NavDropdownFeatureItem: FC<NavDropdownFeatureItemProps> = ({ item }) => {
	return (
		<Dropdown backdrop="opaque">
			<DropdownTrigger>
				<Button
					disableRipple
					className="p-0 bg-transparent data-[hover=true]:bg-transparent"
					variant="light"
					endContent={<ChevronDownIcon size={14} />}
				>
					{item.pageTitle}
				</Button>
			</DropdownTrigger>
			<DropdownMenu items={item.items}>
				{[
					// Allow the user to select the page with all of the features
					<DropdownItem
						key={item.key}
						color="primary"
						href={getFeatureRoutePath(item.path)}
						description={`Full list of ${item.pageTitle} with descriptions`}
					>
						{item.pageTitle}
					</DropdownItem>,

					// Allow the user to select a specific feature
					...item.items.map((featureItem: FeatureOptionItem) => (
						<DropdownItem
							key={featureItem.key}
							href={"/" + featureItem.path}
						>
							{featureItem.name}
						</DropdownItem>
					)),
				]}
			</DropdownMenu>
		</Dropdown>
	);
};

export default NavDropdownFeatureItem;
