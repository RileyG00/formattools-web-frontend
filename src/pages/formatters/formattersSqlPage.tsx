import PageHelmet from "../seo/pageHelmet";
import GradientBackgroundLayout from "@/layouts/gradientBackgroundLayout";
import { formatters_Sql } from "@/config/features";
import FeatureOptionItemLayout from "@/layouts/featureOptionItemLayout";
import SqlFormatter from "@/components/features/formatters/sql";

const FormattersSqlPage = () => {
	return (
		<GradientBackgroundLayout isIncludeSvg={true}>
			<PageHelmet
				pageTitle={formatters_Sql.pageTitle}
				pageDescription={formatters_Sql.description}
				pathUrl={formatters_Sql.path}
			/>
			<FeatureOptionItemLayout>
				<SqlFormatter />
			</FeatureOptionItemLayout>
		</GradientBackgroundLayout>
	);
};

export default FormattersSqlPage;
