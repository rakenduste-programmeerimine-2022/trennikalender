import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"

import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const ResetPw = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    token: "",
    newPassword: "",
    confirmPassword: ""
  })
  const theme = createTheme()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      console.log(values)
      axios
        .patch("http://localhost:8080/user/reset", {
          ...values
        })
        .then(res => {
          if (res.data.result === "success") {
            //const token = res.data.token
            //localStorage.setItem("token", token)
            // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            swal(
              "Parool muudetud! Teid suunatakse kohe edasi.",
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
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
          >
            Muuda parooli
          </Typography>
          <Typography>
            Parooli muutmiseks sisesta uus parool ja meilile saadetud
            kinnituskood
          </Typography>

          <Box
            component="form"
            onSubmit={e => handleSubmit(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="token"
              label="Aktiveerimiskood"
              type="text"
              id="token"
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="Uus parool"
              name="newPassword"
              autoFocus
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Kinnita uus parool"
              name="confirmPassword"
              autoFocus
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />

            <>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
              >
                Muuda parool
              </Button>
            </>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ResetPw
