
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm"
import Dashboard from "./components/dashboard"
import VehicleRegistry from "./components/vehicalRegistry"
import ManagementPage from "./components/managementPage"
import AppLayout from "./components/appLayout"
import SignupForm from "./components/signupForm"
import DriverManagementForm from "./components/driverManagementForm"
import FuelExpenseManagement from "./components/fuelExpenseManagement"
import ReportsAnalytics from "./components/reportsAnalytics"
import TripManagement from "./components/tripManagement"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicle-registry" element={<VehicleRegistry />} />
        <Route path="/driver-management" element={<DriverManagementForm />} />
        <Route path="/trip-management" element={<ManagementPage title="Trip Management" />} />
        <Route path="/maintenance" element={<ManagementPage title="Maintenance" />} />
        <Route path="/fuel-expenses" element={<FuelExpenseManagement />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
      </Route>
    </Routes>
  );
}

export default App
