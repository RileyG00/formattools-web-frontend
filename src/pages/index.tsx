import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { featureConfigs } from "@/config/site";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const IndexPage: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="max-w-3xl text-center justify-center mt-20">
					<span className={title({ size: "lg" })}>
						Your All-in-One&nbsp;
					</span>
					<br />
					<span className={title({ size: "lg", color: "pink" })}>
						Developer Toolbox&nbsp;
					</span>
					<br />
					<span className={title({ size: "lg" })}>
						Entitely Free. Always Online.
					</span>
					<div className={subtitle({ size: "sm", class: "mt-4" })}>
						Formatters, Obfuscators, Validators, all included in one
						tool. 15+ pro-grade coding tools. Format faster,
						ad-free, right from your browser.
					</div>
				</div>

				<div className="flex gap-3">
					<Link
						className={buttonStyles({
							color: "primary",
							radius: "full",
							variant: "shadow",
						})}
						href={featureConfigs[0].path}
					>
						Get Started
					</Link>
				</div>
			</main>
		</GradientBackgroundLayout>
	);
};

export default IndexPage;
