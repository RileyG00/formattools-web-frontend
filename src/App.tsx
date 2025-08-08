import { Route, Routes } from "react-router-dom";
import { navLinks } from "./config/site";

// Pages
import IndexPage from "@/pages/index";
import { getFeatureRouteUniquePath } from "./utils/configUtils";
import { featureRoutes, featureSubRoutes } from "./config/features";
import CipherGriffinerePage from "./pages/ciphers/cipherGriffinerePage";
import FormattersJsonPage from "./pages/formatters/formattersJsonPage";
import FormattersXmlPage from "./pages/formatters/formattersXmlPage";
import FormattersHtmlPage from "./pages/formatters/formattersHtmlPage";
import FormattersTabularToTablePage from "./pages/formatters/formattersTabularToTablePage";
import FormattersTabularToSqlInsertPage from "./pages/formatters/formattersTabularToSqlInsert";
import FormattersStringPage from "./pages/formatters/formattersString";
import FormattersSqlPage from "./pages/formatters/formattersSqlPage";
import FormattersMarkdownPage from "./pages/formatters/formattersMarkdownPage";
import EscapersEncodersJsonPage from "./pages/escapersEncoders/escapersEncodersJsonPage";
import EscapersEncodersXmlPage from "./pages/escapersEncoders/escapersEncodersXmlPage";
import EscapersEncodersUrlPage from "./pages/escapersEncoders/escapersEncodersUrlPage";
import EscapersEncodersBase64Page from "./pages/escapersEncoders/escapersEncodersBase64Page";
import ConverterEpochDatePage from "./pages/converters/converterEpochDatePage";
import RNGDiceRollPage from "./pages/rngs/rngsDiceRolePage";
import RNGCoinTossPage from "./pages/rngs/rngsCoinTossPage";
import GeneratorStringPage from "./pages/generators/generatorStringPage";
import GeneratorNumberPage from "./pages/generators/generatorNumberPage";
import GeneratorLoremIpsumPage from "./pages/generators/generatorLoremIpsumPage";
import FormattersPage from "./pages/formatters/formattersPage";
import CiphersPage from "./pages/ciphers/ciphersPage";
import GeneratorPage from "./pages/generators/generatorPage";
import RNGsPage from "./pages/rngs/rngsPage";
import ConvertorsPage from "./pages/converters/converterPage";
import EscapersEncodersPage from "./pages/escapersEncoders/escapersEcodersPage";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const App: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<Routes>
			<Route element={<IndexPage />} path={navLinks.home} />

			{/* Formatters */}
			<Route
				element={<FormattersPage />}
				path={featureRoutes.formatters}
			/>

			<Route
				element={<FormattersJsonPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_json,
				)}
			/>

			<Route
				element={<FormattersXmlPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_xml,
				)}
			/>

			<Route
				element={<FormattersHtmlPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_html,
				)}
			/>

			<Route
				element={<FormattersSqlPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_sql,
				)}
			/>

			<Route
				element={<FormattersTabularToTablePage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToTable,
				)}
			/>

			<Route
				element={<FormattersTabularToSqlInsertPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_tabularToSqlInsert,
				)}
			/>

			<Route
				element={<FormattersStringPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_string,
				)}
			/>

			<Route
				element={<FormattersMarkdownPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.formatters,
					featureSubRoutes.formatter_markdown,
				)}
			/>

			{/* Escapers and Encoders */}
			<Route
				element={<EscapersEncodersPage />}
				path={featureRoutes.escapers_encoders}
			/>
			<Route
				element={<EscapersEncodersJsonPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_json,
				)}
			/>

			<Route
				element={<EscapersEncodersXmlPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.escaper_xml,
				)}
			/>

			<Route
				element={<EscapersEncodersUrlPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_url,
				)}
			/>

			<Route
				element={<EscapersEncodersBase64Page />}
				path={getFeatureRouteUniquePath(
					featureRoutes.escapers_encoders,
					featureSubRoutes.encoder_base64,
				)}
			/>

			{/* Converters */}
			<Route
				element={<ConvertorsPage />}
				path={featureRoutes.converter}
			/>
			<Route
				element={<ConverterEpochDatePage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.converter,
					featureSubRoutes.converter_epoch_date,
				)}
			/>

			{/* RNGs */}
			<Route element={<RNGsPage />} path={featureRoutes.rngs} />
			<Route
				element={<RNGDiceRollPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.rngs,
					featureSubRoutes.rng_diceRoll,
				)}
			/>

			<Route
				element={<RNGCoinTossPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.rngs,
					featureSubRoutes.rng_coinToss,
				)}
			/>

			{/* Generators */}
			<Route
				element={<GeneratorPage />}
				path={featureRoutes.generators}
			/>
			<Route
				element={<GeneratorStringPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_string,
				)}
			/>

			<Route
				element={<GeneratorNumberPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_number,
				)}
			/>

			<Route
				element={<GeneratorLoremIpsumPage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.generators,
					featureSubRoutes.generator_lorem,
				)}
			/>

			{/* Ciphers */}
			<Route element={<CiphersPage />} path={featureRoutes.ciphers} />
			<Route
				element={<CipherGriffinerePage />}
				path={getFeatureRouteUniquePath(
					featureRoutes.ciphers,
					featureSubRoutes.cipher_griffinere,
				)}
			/>

			{/* Fallback */}
			<Route element={<IndexPage />} path={"*"} />
		</Routes>
	);
};

export default App;
