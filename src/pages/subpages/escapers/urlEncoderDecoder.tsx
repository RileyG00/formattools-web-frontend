import NavigationList from "@/components/common/navigationList";
import UrlEncoderDecoder from "@/components/features/url/urlEncoderDecoder";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const UrlEncoderDecoderPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1">
				<NavigationList />
				<UrlEncoderDecoder />
			</main>
		</GradientBackgroundLayout>
	);
};

export default UrlEncoderDecoderPage;
