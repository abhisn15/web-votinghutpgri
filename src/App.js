import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/Login";
import Registerasi from "./Pages/Auth/Registerasi";
import Terasik from "./Pages/User/Terasik";
import Terkiller from "./Pages/User/Terkiller";
import Terinspiratif from "./Pages/User/Terinspiratif";
import './App.css'
import AkunTerdaftar from "./Pages/Admin/AkunTerdaftar";
import Dashboard from "./Pages/User/Dashboard";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import HalamanError from "./Pages/HalamanError";
import TerasikAdmin from "./Pages/Admin/TerasikAdmin";
import TerkillerAdmin from "./Pages/Admin/TerkillerAdmin";
import TerinspiratifAdmin from "./Pages/Admin/TerinspiratifAdmin";
import LoginChecked from "./Pages/Auth/LoginChecked";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<LoginChecked />} />
				<Route path="*" element={<HalamanError />} />
				<Route path="/registerasi" element={<Registerasi />} />
				<Route path="/akun-terdaftar" element={<AkunTerdaftar />} />
				<Route path="/dashboard-admin" element={<DashboardAdmin />} />
				<Route
					path="/dashboard/guru-terasik-admin"
					element={<TerasikAdmin />}
				/>
				<Route
					path="/dashboard/guru-terkiller-admin"
					element={<TerkillerAdmin />}
				/>
				<Route
					path="/dashboard/guru-terinspiratif-admin"
					element={<TerinspiratifAdmin />}
				/>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/guru-terasik" element={<Terasik />} />
				<Route path="/dashboard/guru-terkiller" element={<Terkiller />} />
				<Route
					path="/dashboard/guru-terinspiratif"
					element={<Terinspiratif />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
