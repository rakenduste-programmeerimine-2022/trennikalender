import axios from "axios"
import jwt_decode from "jwt-decode"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Person2Icon from "@mui/icons-material/Person2"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Select, MenuItem } from "@mui/material"

export default function UserProfile() {
  const Beginner = "Beginner"
  const Intermediate = "Intermediate"
  const Advanced = "Advanced"
  const navigate = useNavigate()
  const theme = createTheme()

  const token = localStorage.getItem("token")
  const decoded = jwt_decode(token)
  const id = decoded["id"]
  console.log(id)

  function refreshPage() {
    window.location.reload(false)
  }

  const [user, setUser] = useState({
    email: "",
    name: "",
    surname: "",
    phonenumber: "",
    level: ""
  })

  const { email, name, surname, phonenumber, level } = user

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    loadUser()
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    await axios
      .put(`http://localhost:8080/user/update/` + id, user)
      .then(res => {
        console.log(res)
        if (res.data.message === "UPDATED") {
          setUser(res.data.data)
          swal("Andmed muudetud!")
          navigate("/profile")
        }
      })
  }

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/` + id)
    setUser(result.data)
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
          <Avatar sx={{ xs: 12, m: 1, bgcolor: "secondary.main" }}>
            <Person2Icon />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
          >
            Minu profiil
          </Typography>

          <Box
            component="form"
            onSubmit={e => onSubmit(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="surname"
              label="Surname"
              value={surname}
              type=""
              id="surname"
              onChange={e => onInputChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              value={email}
              type="email"
              id="email"
              onChange={e => onInputChange(e)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phonenumber"
              label="Phone number"
              value={phonenumber}
              type="text"
              id="phonenumber"
              onChange={e => onInputChange(e)}
            />
            <Select
              id="level"
              required
              name="level"
              type="text"
              value={level}
              label="Player level"
              onChange={e => onInputChange(e)}
            >
              <MenuItem value={Beginner}>Beginner</MenuItem>
              <MenuItem value={Intermediate}>Intermediate</MenuItem>
              <MenuItem value={Advanced}>Advanced</MenuItem>
            </Select>

            <>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Button
                    type="submit"
                    onClick={refreshPage}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "primary.main" }}
                  >
                    Salvesta
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <Button
                    onClick={refreshPage}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Loobu
                  </Button>
                </Grid>
              </Grid>
            </>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
