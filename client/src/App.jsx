
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm"
import HomePage from "./components/homePage"
import Dashboard from "./components/dashboard"
import VehicleRegistry from "./components/vehicalRegistry"
import AppLayout from "./components/appLayout"
import SignupForm from "./components/signupForm"
import DriverManagementForm from "./components/driverManagementForm"
import FuelExpenseManagement from "./components/fuelExpenseManagement"
import ReportsAnalytics from "./components/reportsAnalytics"
import TripManagement from "./components/tripManagement"
import MaintenanceManagement from "./components/maintenanceManagement"
import { ThemeProvider } from "./components/themeContext"
function App() {
  return (
    <ThemeProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicle-registry" element={<VehicleRegistry />} />
        <Route path="/driver-management" element={<DriverManagementForm />} />
        <Route path="/trip-management" element={<TripManagement />} />
        <Route path="/maintenance" element={<MaintenanceManagement />} />
        <Route path="/fuel-expenses" element={<FuelExpenseManagement />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
      </Route>
    </Routes>
    </ThemeProvider>
  );
}

export default App
