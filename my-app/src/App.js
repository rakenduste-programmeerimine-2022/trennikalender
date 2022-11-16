import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import React from "react"
import { History } from "./helpers/history"
import PrivateRoute from "./helpers/PrivateRoute"
import Register from "./pages/signup"
import NavBar from "./components/Header"
import Reset from "./pages/resetpw"
import Forgot from "./pages/forgotpw"
import Activate from "./pages/activateaccount"
import axios from "axios"

const App = () => {
  const token = localStorage.getItem("token")
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else delete axios.defaults.headers.common["Authorization"]

  return (
    <Router history={History}>
      <NavBar />
      <Routes>
        <Route
          path="/home/*"
          element={<Home />}
        >
          <Route element={<PrivateRoute />} />
        </Route>
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/activate"
          element={<Activate />}
        />
        <Route
          path="/forgotpassword"
          element={<Forgot />}
        />
        <Route
          path="/resetpassword"
          element={<Reset />}
        />
      </Routes>
    </Router>
  )
}
export default App
