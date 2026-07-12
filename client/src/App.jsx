
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm"
import Dashboard from "./components/dashboard"
import { useState } from "react"
import SignupForm from "./components/signupForm"
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App
