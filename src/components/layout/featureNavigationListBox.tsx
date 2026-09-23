"use client";

import { Fragment } from "react";
import { Header, ListBox, Separator } from "@heroui/react";
import { featureConfigs } from "@/config/features";
import { toHref } from "@/utils/configUtils";
import FeatureOptionItemStatusChip from "@/components/features/featureOptionItemStatusChip";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureNavigationListBoxProps {
	className?: string;
}

// Every feature grouped under its category. Shared by the desktop sidebar and the mobile menu.
const FeatureNavigationListBox: React.FC<FeatureNavigationListBoxProps> = ({
	className,
}) => {
	return (
		<ListBox
			aria-label="List of available formatters, obfuscators, and validators."
			selectionMode="none"
			className={className}
		>
			{featureConfigs.map((feature, index) => (
				<Fragment key={feature.key}>
					{index > 0 && <Separator />}
					<ListBox.Section
						aria-label={`Collection of elements under the '${feature.header}' feature.`}
					>
						<Header>{feature.header}</Header>
						{feature.items.map((item) => (
							<ListBox.Item
								key={item.key}
								id={item.key}
								href={toHref(item.path)}
								textValue={item.name}
							>
								<span className="flex flex-row items-center justify-start gap-2">
									<span className="min-w-fit break-keep">
										{item.name}
									</span>
									<FeatureOptionItemStatusChip
										status={item.status}
									/>
								</span>
							</ListBox.Item>
						))}
					</ListBox.Section>
				</Fragment>
			))}
		</ListBox>
	);
};

export default FeatureNavigationListBox;
