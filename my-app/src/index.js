//import React from "react"
//import ReactDOM from "react-dom"

import { StrictMode, React } from "react"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createRoot } from "react-dom/client"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

reportWebVitals()
