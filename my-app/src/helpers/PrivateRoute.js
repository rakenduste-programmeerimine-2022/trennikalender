import React from "react"
import { Navigate, Routes } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  function hasJWT() {
    return localStorage.getItem("token") != null
  }

  return (
    <Routes
      {...rest}
      render={props =>
        hasJWT() === true ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  )
}

export default PrivateRoute
