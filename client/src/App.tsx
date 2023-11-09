import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upcoming from "./pages/upcoming/Upcoming.component";
import History from "./pages/history/History.component";
import Lauches from "./pages/launches/Lauches.component";
import Layout from "./pages/layout/Layout.component";
import usePlanets from "./hooks/usePlanets";
import useLaunches from "./hooks/useLaunches";
import { onAbortSound, onSuccessSound, onFailureSound } from "./utils/sounds";

function App() {
	const { launches, isPendingLaunch, submitLaunch, abortLaunch } =
		useLaunches(onSuccessSound, onAbortSound, onFailureSound);
	const planets = usePlanets();

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Layout />}
				>
					<Route
						index
						element={
							<Lauches
								planets={planets}
								submitLaunch={submitLaunch}
								isPendingLaunch={isPendingLaunch}
							/>
						}
					/>
					<Route
						path="/upcoming"
						element={
							<Upcoming
								launches={launches}
								abortLaunch={abortLaunch}
							/>
						}
					/>
					<Route
						path="/history"
						element={<History launches={launches} />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
