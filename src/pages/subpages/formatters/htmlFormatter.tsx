import NavigationList from "@/components/common/navigationList";
import HtmlFormatter from "@/components/features/html/htmlFormatter";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const HtmlFormatterPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1">
				<NavigationList />
				<HtmlFormatter />
			</main>
		</GradientBackgroundLayout>
	);
};

export default HtmlFormatterPage;
