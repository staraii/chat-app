import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "views/home/Home.jsx";
import Login from "views/login/login.jsx";
import Register from "views/register/register.jsx";
import User from "views/user/User.jsx";
import Channels from "views/channels/Channels.jsx";
import Admin from "views/admin/Admin.jsx";
import Dashboard from "views/dashboard/Dashboard.jsx";

import "./App.css";

function App() {

	return (
		<div className="app" id="appTheme" data-darkmode="dark">
			<Router>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<Navigate to="/" />} />		
						<Route path="/user" element={<User />}>
							<Route index element={<Channels />} />
							<Route path="channels" element={<Channels />} />
						</Route>
					<Route path="/admin" element={<Admin />}>
						<Route index element={<Dashboard />} />
						<Route path="dashboard" element={<Dashboard />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
