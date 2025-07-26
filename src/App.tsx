import { Route, Routes } from "react-router-dom";
import { navLinks } from "./config/site";

// Pages
import IndexPage from "@/pages/index";
import FormattersRouter from "@/pages/routers/formattersRouter";

//Sub-pages
// import JsonFormatterPage from "@/pages/subpages/jsonFormatter";
// import XmlFormatterPage from "./pages/subpages/xmlFormatter";
// import HtmlFormatterPage from "./pages/subpages/htmlFormatter";

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
				path={`${navLinks.formatters}/:formatterType?`}
			/>
		</Routes>
	);
};

export default App;
