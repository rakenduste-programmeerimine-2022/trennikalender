import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"

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
            const token = res.data.token
            const user = res.data.user
            localStorage.setItem("token", token)
            localStorage.setItem("user", user)
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
            Tere tulemast tagasi!
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
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={e =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
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
                Logi sisse
              </Button>
              <Grid container>
                <Grid
                  item
                  xs
                >
                  <Link
                    href="/register"
                    variant="body2"
                  >
                    {"Pole veel kasutaja? Registreeri siin"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/forgotpassword"
                    variant="body2"
                  >
                    {"Unustasin parooli"}
                  </Link>
                </Grid>
              </Grid>
            </>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginForm
