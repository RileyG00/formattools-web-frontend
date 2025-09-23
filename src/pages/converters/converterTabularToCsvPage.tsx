import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { converters_TabularToCsv } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import TabularToCsvConverter from "@/components/features/converters/tabularToCsv";

const ConverterTabularToCsvPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={converters_TabularToCsv.pageTitle}
				pageDescription={converters_TabularToCsv.description}
				pathUrl={converters_TabularToCsv.path}
			/>
			<FeatureOptionItemLayout>
				<TabularToCsvConverter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default ConverterTabularToCsvPage;
