import NavigationList from "@/components/common/navigationList";
import JsonEscaper from "@/components/features/json/jsonEscaper";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const JsonEscaperPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1">
				<NavigationList />
				<JsonEscaper />
			</main>
		</GradientBackgroundLayout>
	);
};

export default JsonEscaperPage;
