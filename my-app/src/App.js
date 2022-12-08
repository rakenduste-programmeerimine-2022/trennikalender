import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import PrivateRoute from "./helpers/PrivateRoute"
import Register from "./pages/signup"
import Navbar from "./components/Navbar"
import Reset from "./pages/resetpw"
import Forgot from "./pages/forgotpw"
import Activate from "./pages/activateaccount"
import UserProfile from "./components/UserProfile"

import PageNotFound from "./pages/notfound"

function App() {
  return (
    <>
      <Navbar />
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
          path="/profile"
          element={<UserProfile />}
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
