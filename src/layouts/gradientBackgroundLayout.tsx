import { Navbar } from "@/components/navbar";

interface GradientBackgroundLayoutProps {
	isIncludeSvg?: boolean;
	children: React.ReactNode;
}

const GradientBackgroundLayout: React.FC<GradientBackgroundLayoutProps> = ({
	isIncludeSvg = true,
	children,
}) => {
	return (
		<div
			style={{
				backgroundImage: `linear-gradient(to bottom right, rgba(249, 88, 158, 0.10), rgba(137, 211, 226, 0.02), rgba(137, 211, 226, 0.25)) ${isIncludeSvg ? ",url('/backgrounds/swooping-layers.svg')" : ""}`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			className="flex flex-col min-w-screen min-h-screen justify-start items-center"
		>
			<header className="w-full">
				<Navbar />
			</header>
			{children}
		</div>
	);
};

export default GradientBackgroundLayout;
