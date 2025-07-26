import NavigationList from "@/components/common/navigationList";
import JsonFormatter from "@/components/features/json/jsonFormatter";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const JsonFormatterPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1">
				<NavigationList />
				<JsonFormatter />
			</main>
		</GradientBackgroundLayout>
	);
};

export default JsonFormatterPage;
