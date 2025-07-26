import FormattersList from "@/components/common/formattersList";
import SqlFormatter from "@/components/features/sql/sqlFormatter";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const SqlFormatterPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={false}>
			<main className="w-full flex flex-row items-start justify-start gap-20 px-[4%] pt-8 h-full flex-grow-1">
				<FormattersList />
				<SqlFormatter />
			</main>
		</GradientBackgroundLayout>
	);
};

export default SqlFormatterPage;
