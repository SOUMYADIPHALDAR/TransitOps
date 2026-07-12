
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm"
import { useState } from "react"
import SignupForm from "./components/signupForm"
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
}

export default App
