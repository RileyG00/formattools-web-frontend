import FormattersList from "@/components/common/formattersList";
import JsonFormatter from "@/components/features/json/jsonFormatter";
import GradientBackgroundLayout from "@/layouts/GradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const JsonFormatterPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={false}>
			<main className="w-full flex flex-row items-start justify-start gap-20 px-[4%] py-16">
				<FormattersList />
				<JsonFormatter />
			</main>
		</GradientBackgroundLayout>
	);
};

export default JsonFormatterPage;
