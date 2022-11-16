import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"

import Button from "@mui/material/Button"

function LoginForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: "", password: "" })
  const theme = createTheme()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      console.log(values)
      axios
        .post("http://localhost:8080/user/login", {
          ...values
        })
        .then(res => {
          if (res.data.result === "success") {
            localStorage.setItem("TOKEN_KEY", res.data.token)
            axios.defaults.headers.common["Authorization"] =
              "Bearer" + res.data.token
            swal(
              "Edukalt sisselogitud. Teid suunatakse kohe edasi!",
              res.data.message,
              "success"
            ).then(value => {
              navigate("/home")
            })
          } else if (res.data.result === "error") {
            swal("Error!", res.data.message, "error")
          }
        })
    } catch (error) {
      console.log(error)
      swal("Error!", error, "error")
    }
  }

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
    >
      Logi välja
    </Button>
  )
}

export default LoginForm
