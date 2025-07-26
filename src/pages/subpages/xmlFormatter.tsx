import FormattersList from "@/components/common/formattersList";
import JsonFormatter from "@/components/features/json/jsonFormatter";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const XmlFormatterPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={false}>
			<main className="w-full flex flex-row items-start justify-start gap-20 px-[4%] pt-16 h-full flex-grow-1">
				<FormattersList />
				<JsonFormatter />
			</main>
		</GradientBackgroundLayout>
	);
};

export default XmlFormatterPage;
