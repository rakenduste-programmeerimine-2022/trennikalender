import React from "react"
import { AppBar, Toolbar, CssBaseline, makeStyles } from "@material-ui/core"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

//import { createTheme } from "@mui/material/styles"

const handleClick = () => {
  localStorage.clear()
  window.location.reload()
}

const useStyles = makeStyles(theme => ({
  button: {
    display: "flex",
    marginLeft: theme.spacing(5)
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    marginTom: theme.spacing(2),
    display: "flex"
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "pink",
      borderBottom: "2px solid pink"
    }
  }
}))

function NavBar() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "primary.main" }}
          className={classes.button}
          onClick={handleClick}
        >
          Logout
        </Button>
        <div className={classes.navlinks}>
          <Link
            to="/home"
            className={classes.link}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={classes.link}
          >
            Profile
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
