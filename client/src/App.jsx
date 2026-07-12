
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm"
import Dashboard from "./components/dashboard"
import VehicleRegistry from "./components/vehicalRegistry"
import ManagementPage from "./components/managementPage"
import SignupForm from "./components/signupForm"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vehicle-registry" element={<VehicleRegistry />} />
      <Route path="/driver-management" element={<ManagementPage title="Driver Management" />} />
      <Route path="/trip-management" element={<ManagementPage title="Trip Management" />} />
      <Route path="/maintenance" element={<ManagementPage title="Maintenance" />} />
      <Route path="/fuel-expenses" element={<ManagementPage title="Fuel & Expense Management" />} />
      <Route path="/reports-analytics" element={<ManagementPage title="Reports & Analytics" />} />
    </Routes>
  );
}

export default App
