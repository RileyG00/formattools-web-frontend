import FeatureHeader from "@/components/common/featureHeader";
import FeatureSubHeader from "@/components/common/featureSubHeader";
import {
	ArrowRightStartOnRectangleIcon,
	CalculatorIcon,
	CodeBracketIcon,
	LockClosedIcon,
	WrenchIcon,
} from "@/components/common/icons";
import { navLinks, OptionItems } from "@/config/site";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
interface OptionsDescriptionsProps {
	identifier: keyof typeof navLinks;
	featureHeader: string;
	featureSubheader: string;
	options: OptionItems;
}

const OptionsDescriptions: React.FC<OptionsDescriptionsProps> = ({
	identifier,
	featureHeader,
	featureSubheader,
	options,
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

		switch (identifier) {
			case "formatters":
				return (
					<WrenchIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "escapers":
				return (
					<CodeBracketIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "ciphers":
				return (
					<LockClosedIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "rngs":
				return (
					<CalculatorIcon
						className={`min-h-8 min-w-8 h-fit w-fit px-3 py-1 mt-1 rounded-md ${color} text-white`}
					/>
				);
			case "generators":
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

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[800px] container flex flex-col w-full gap-4">
			<FeatureHeader>{featureHeader}</FeatureHeader>
			<FeatureSubHeader>{featureSubheader}</FeatureSubHeader>
			<ul className="w-full h-fit grid grid-cols-3 gap-4">
				{options.map((option, index) => {
					return (
						<li key={option.path}>
							<Card isHoverable className="h-[225px]">
								<CardHeader className="flex flex-row gap-3">
									{getIcon(index)}
									<h3>{option.name}</h3>
								</CardHeader>
								<CardBody>{option.description}</CardBody>
								<CardFooter className="flex flex-row justify-end">
									<Button
										color="default"
										variant="flat"
										as={Link}
										href={option.path}
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
