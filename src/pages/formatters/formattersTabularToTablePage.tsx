import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_TabularToTable } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import TabularToTableFormatter from "@/components/features/formatters/tabularToTable";

const FormattersTabularToTablePage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_TabularToTable.pageTitle}
				pageDescription={formatters_TabularToTable.description}
				pathUrl={formatters_TabularToTable.path}
			/>
			<FeatureOptionItemLayout>
				<TabularToTableFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersTabularToTablePage;
