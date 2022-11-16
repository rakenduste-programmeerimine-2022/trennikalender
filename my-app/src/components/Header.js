//import React, { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { AccountCircle } from "@mui/icons-material"

function NavBar() {
  //const classes = useStyles()
  //const [auth, setAuth] = useState(false)

  return (
    <AppBar
      position="sticky"
      enableColorOnDark
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          element="Home"
          href="/home"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
        <Button
          element="Logout"
          href="/"
          color="inherit"
        >
          Minu trennid
        </Button>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>

        <Button
          element="Register"
          href="/"
          color="inherit"
        >
          Logi välja
        </Button>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
