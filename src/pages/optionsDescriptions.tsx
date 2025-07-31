import FeatureHeader from "@/components/common/featureHeader";
import FeatureSubHeader from "@/components/common/featureSubHeader";
import { Spacer } from "@heroui/spacer";
import {
	ArrowRightStartOnRectangleIcon,
	CalculatorIcon,
	CodeBracketIcon,
	LockClosedIcon,
	WrenchIcon,
} from "@/components/common/icons";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { FeatureOption } from "@/types/siteConfigs";
import { useEffect } from "react";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface OptionsDescriptionsProps {
	featureOption: FeatureOption;
}

const OptionsDescriptions: React.FC<OptionsDescriptionsProps> = ({
	featureOption,
}) => {
	//------------------------------------------------------------------------------------
	//Get Icon to Use
	//------------------------------------------------------------------------------------
	const colorOptions: string[] = [
		"bg-cyan-800",
		"bg-slate-500",
		"bg-danger-200",
		"bg-green-500",
		"bg-stone-500",
		"bg-teal-500",
		"bg-primary-500",
		"bg-violet-500",
		"bg-secondary-400",
		"bg-orange-400",
	];

	const getIcon = (itemIndex: number) => {
		let newIndex: number = itemIndex;
		let color: string = "bg-cyan-800";

		if (itemIndex >= colorOptions.length - 1) {
			newIndex = (colorOptions.length - 1) % itemIndex;
		}

		color = colorOptions[newIndex];

		switch (featureOption.key) {
			case "key:formatters":
				return (
					<WrenchIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "key:escapers-encoders":
				return (
					<CodeBracketIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "key:ciphers":
				return (
					<LockClosedIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "key:random-numbers":
				return (
					<CalculatorIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "key:generators":
				return (
					<ArrowRightStartOnRectangleIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			default:
				return (
					<CodeBracketIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
		}
	};

	useEffect(() => {
		console.log(featureOption);
	}, [featureOption]);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[800px] container flex flex-col w-full">
			<FeatureHeader>{featureOption.header}</FeatureHeader>
			<FeatureSubHeader>{featureOption.subheader}</FeatureSubHeader>
			<Spacer y={4} />
			<ul className="w-full h-fit grid grid-cols-3 gap-4">
				{featureOption.items.map((option, index) => {
					return (
						<li key={option.path}>
							<Card
								isHoverable
								className="h-[225px] border-1 border-secondary-100/25"
								title={option.name}
							>
								<CardHeader className="flex flex-row gap-3">
									{getIcon(index)}
									<h3>{option.name}</h3>
								</CardHeader>
								<CardBody>{option.description}</CardBody>
								<CardFooter className="flex flex-row justify-end">
									<Button
										className="bg-secondary-400/20"
										as={Link}
										href={option.path}
										title={`Visit page for ${option.name}`}
									>
										Visit Page
									</Button>
								</CardFooter>
							</Card>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default OptionsDescriptions;
