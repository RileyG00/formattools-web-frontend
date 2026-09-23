"use client";

import NextLink from "next/link";
import { buttonVariants, Card } from "@heroui/react";
import FeatureHeader from "@/components/features/featureHeader";
import FeatureSubHeader from "@/components/features/featureSubHeader";
import FeatureOptionItemStatusChip from "@/components/features/featureOptionItemStatusChip";
import {
	ArrowPathIcon,
	ArrowRightStartOnRectangleIcon,
	CalculatorIcon,
	CodeBracketIcon,
	LockClosedIcon,
	WrenchIcon,
} from "@/components/common/icons";
import { FeatureOption } from "@/types/siteConfigs";
import { toHref } from "@/utils/configUtils";

//----------------------------------------------------------------------------------------
//Icon Styling
//----------------------------------------------------------------------------------------
const iconByFeatureKey: Record<string, typeof WrenchIcon> = {
	"key:formatters": WrenchIcon,
	"key:escapers": CodeBracketIcon,
	"key:ciphers": LockClosedIcon,
	"key:random-numbers": CalculatorIcon,
	"key:generators": ArrowRightStartOnRectangleIcon,
	"key:converter": ArrowPathIcon,
};

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface FeatureOptionPreviewProps {
	featureOption: FeatureOption;
}

const FeatureOptionPreview: React.FC<FeatureOptionPreviewProps> = ({
	featureOption,
}) => {
	const Icon = iconByFeatureKey[featureOption.key] ?? CodeBracketIcon;

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="flex w-full min-w-0 flex-col">
			<FeatureHeader>{featureOption.header}</FeatureHeader>
			<FeatureSubHeader>{featureOption.subheader}</FeatureSubHeader>
			<ul className="mt-8 grid h-fit w-full grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-6">
				{featureOption.items.map((option) => (
					<li key={option.path}>
						<Card className="h-full">
							<Card.Header className="flex flex-row items-center gap-3">
								<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-foreground">
									<Icon
										aria-hidden="true"
										className="size-5"
									/>
								</span>
								<Card.Title className="flex flex-row items-center gap-2">
									{option.name}
									<FeatureOptionItemStatusChip
										status={option.status}
									/>
								</Card.Title>
							</Card.Header>
							<Card.Content>
								<Card.Description>
									{option.description}
								</Card.Description>
							</Card.Content>
							<Card.Footer className="flex flex-row justify-end">
								<NextLink
									href={toHref(option.path)}
									title={`Visit page for ${option.name}`}
									className={buttonVariants({
										variant: "tertiary",
									})}
								>
									Visit Page
								</NextLink>
							</Card.Footer>
						</Card>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FeatureOptionPreview;
