import FormattersList from "@/components/common/formattersList";
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
		<GradientBackgroundLayout isIncludeSvg={false}>
			<main className="w-full flex flex-row items-start justify-start gap-20 px-[4%] pt-8 h-full flex-grow-1">
				<FormattersList />
				<HtmlFormatter />
			</main>
		</GradientBackgroundLayout>
	);
};

export default HtmlFormatterPage;
