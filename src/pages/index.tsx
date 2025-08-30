import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { featureConfigs } from "@/config/features";
import { Helmet } from "react-helmet";
import { getPageTitle } from "@/utils/envUtils";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const IndexPage: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<Helmet>
				<title>{getPageTitle()}</title>
				<meta
					property="og:description"
					content="Data Formatters is a free, browser-based toolbox with 15+ pro coding utilities. Format JSON, XML, and more, convert, test & debug anything in seconds. No installs, just ship faster."
				/>
				<meta
					name="description"
					content="Data Formatters is a free, browser-based toolbox with 15+ pro coding utilities. Format JSON, XML, and more, convert, test & debug anything in seconds. No installs, just ship faster."
				/>
			</Helmet>
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
					<div className={subtitle({ size: "xs", class: "mt-4" })}>
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
