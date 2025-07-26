import NavigationList from "@/components/common/navigationList";
import XmlFormatter from "@/components/features/xml/xmlFormatter";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const XmlFormatterPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1">
				<NavigationList />
				<XmlFormatter />
			</main>
		</GradientBackgroundLayout>
	);
};

export default XmlFormatterPage;
