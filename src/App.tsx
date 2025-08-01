import { Route, Routes } from "react-router-dom";
import { navLinks } from "./config/site";

// Pages
import IndexPage from "@/pages/index";
import FeatureOptionItemRouter from "./pages/routers/featureOptionItemRouter";
import FeatureOptionRouter from "./pages/routers/featureOptionRouter";

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

			<Route element={<FeatureOptionRouter />} path={`:featureOption`} />
			<Route
				element={<FeatureOptionItemRouter />}
				path={`:featureOption/:featureOptionItem`}
			/>
		</Routes>
	);
};

export default App;
