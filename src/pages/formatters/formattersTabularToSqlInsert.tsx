import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_TabularToSql } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import TabularToSqlInsertFormatter from "@/components/features/formatters/tabularToSqlInsert";

const FormattersTabularToSqlInsertPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_TabularToSql.pageTitle}
				pageDescription={formatters_TabularToSql.description}
				pathUrl={formatters_TabularToSql.path}
			/>
			<FeatureOptionItemLayout>
				<TabularToSqlInsertFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersTabularToSqlInsertPage;
