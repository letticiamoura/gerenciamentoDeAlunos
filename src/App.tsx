import {  BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/admin/Home"
import Login from "./pages/Login"

function App() {

  return (

      <Router>

        <Routes>
          <Route path="/gerenciamentoDeAlunos" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>
      
  )
}

export default App
