import { Route, Routes } from "react-router-dom";
import { navLinks } from "./config/site";

// Pages
import IndexPage from "@/pages/index";
import FormattersRouter from "@/pages/routers/formattersRouter";
import EscaperPageRouter from "./pages/routers/escaperRouter";
import CiphersPageRouter from "./pages/routers/ciphersRouter";
import RngsPageRouter from "./pages/routers/rngsRouter";

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
			<Route
				element={<FormattersRouter />}
				path={`${navLinks.formatters}/:type?`}
			/>
			<Route
				element={<EscaperPageRouter />}
				path={`${navLinks.escapers}/:type?`}
			/>
			<Route
				element={<CiphersPageRouter />}
				path={`${navLinks.ciphers}/:type?`}
			/>
			<Route
				element={<RngsPageRouter />}
				path={`${navLinks.rngs}/:type?`}
			/>
		</Routes>
	);
};

export default App;
