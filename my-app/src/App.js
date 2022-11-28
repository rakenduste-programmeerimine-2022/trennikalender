import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import PrivateRoute from "./helpers/PrivateRoute"
import Register from "./pages/signup"
import NavBar from "./components/Header"
import Reset from "./pages/resetpw"
import Forgot from "./pages/forgotpw"
import Activate from "./pages/activateaccount"

import PageNotFound from "./pages/notfound"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/home"
            element={<Home />}
          />
        </Route>
        <Route
          path="/register"
          element={<Register />}
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
        <Route
          path="/*"
          element={<PageNotFound />}
        />
      </Routes>
    </>
  )
}
export default App
