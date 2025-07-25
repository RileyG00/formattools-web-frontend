import FormattersList from "@/components/common/formattersList";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const FormattersPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={false}>
			<main className="w-full flex flex-col items-start justify-start gap-4 px-[4%] py-16">
				<FormattersList />
			</main>
		</GradientBackgroundLayout>
	);
};

export default FormattersPage;
