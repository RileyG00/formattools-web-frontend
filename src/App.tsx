import { Route, Routes } from "react-router-dom";
import { navLinks, subPageLinks } from "./config/site";

// Pages
import IndexPage from "@/pages/index";
import FormattersPage from "@/pages/formatters";

//Sub-pages
import JsonFormatterPage from "@/pages/subpages/jsonFormatter";
import XmlFormatterPage from "./pages/subpages/xmlFormatter";

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
			<Route element={<FormattersPage />} path={navLinks.formatters} />
			<Route
				element={<JsonFormatterPage />}
				path={subPageLinks.jsonFormatter}
			/>
			<Route
				element={<XmlFormatterPage />}
				path={subPageLinks.xmlFormatter}
			/>
		</Routes>
	);
};

export default App;

