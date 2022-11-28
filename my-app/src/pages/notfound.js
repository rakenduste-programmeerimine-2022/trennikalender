import React from "react"
import Box from "@mui/material/Box"

function PageNotFound() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "25px",
          height: "51.5vh"
        }}
      >
        <>
          <main>
            <h2>404 Page not found</h2>
          </main>
        </>
      </Box>
    </>
  )
}

export default PageNotFound
