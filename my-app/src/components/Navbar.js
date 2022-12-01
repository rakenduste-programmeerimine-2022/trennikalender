import React from "react"
import { AppBar, Toolbar, CssBaseline, Grid } from "@material-ui/core"
import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import HomeIcon from '@mui/icons-material/Home';
import IconButton from "@material-ui/core/IconButton"
//import { createTheme } from "@mui/material/styles"


const handleClick = () => {
  localStorage.clear()
  window.location.reload()
}

function NavBar() {
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Grid
          justifyContent="space-between"
          container
          spacing={20}
        >
          <Grid item>
            <IconButton
              href="/"
              fontSize="large"
            >
              <HomeIcon />
            </IconButton>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Grid item>
              <Button
                color="error"
                variant="contained"
                onClick={handleClick}
              >
                LOGOUT
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
