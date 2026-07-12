
import LoginForm from "./components/loginForm"
import { useState } from "react"
function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <LoginForm />
   </div>
  )
}

export default App
