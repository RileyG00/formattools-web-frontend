import NavigationList from "@/components/common/navigationList";
import GriffinereCipher from "@/components/features/ciphers/griffinereCipher";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const GriffinereCipherPage = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<main className="w-full flex flex-row justify-between items-between px-[4%] pt-8 h-full flex-grow-1">
				<NavigationList />
				<GriffinereCipher />
			</main>
		</GradientBackgroundLayout>
	);
};

export default GriffinereCipherPage;
