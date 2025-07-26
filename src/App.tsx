import { Route, Routes } from "react-router-dom";
import { navLinks, subPageLinks } from "./config/site";

// Pages
import IndexPage from "@/pages/index";
import FormattersPage from "@/pages/formatters";

//Sub-pages
import JsonFormatterPage from "@/pages/subpages/jsonFormatter";
import XmlFormatterPage from "./pages/subpages/xmlFormatter";
import HtmlFormatterPage from "./pages/subpages/htmlFormatter";

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
			<Route element={<JsonFormatterPage />} path={navLinks.formatters} />
			<Route
				element={<JsonFormatterPage />}
				path={subPageLinks.jsonFormatter}
			/>
			<Route
				element={<XmlFormatterPage />}
				path={subPageLinks.xmlFormatter}
			/>
			<Route
				element={<HtmlFormatterPage />}
				path={subPageLinks.htmlFormatter}
			/>
		</Routes>
	);
};

export default App;
