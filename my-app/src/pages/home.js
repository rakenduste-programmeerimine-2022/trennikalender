import Box from "@mui/material/Box"
import React from "react"

function Home() {
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
            <h2>Who are we?</h2>
            <p>That feels like an existential question, don't you think?</p>
          </main>
        </>
      </Box>
    </>
  )
}

export default Home
