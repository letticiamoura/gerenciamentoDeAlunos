import {  BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import List from "./pages/admin/List"
import Home from "./pages/admin/Home"

function App() {

  return (

      <Router>

        <Routes>
          <Route path="/gerenciamentoDeAlunos" element={<List />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>
      
  )
}

export default App
