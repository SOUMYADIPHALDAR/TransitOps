
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm"
import Dashboard from "./components/dashboard"
import SignupForm from "./components/signupForm"
import DriverManagementForm from "./components/driverManagementForm"
import FuelExpenseManagement from "./components/fuelExpenseManagement"
import ReportsAnalytics from "./components/reportsAnalytics"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/drivers" element={<DriverManagementForm />} />
      <Route path="/expenses" element={<FuelExpenseManagement />} />
      <Route path="/reports" element={<ReportsAnalytics />} />
    </Routes>
  );
}

export default App
