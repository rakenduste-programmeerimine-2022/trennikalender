//import React from 'react';
//import ReactDOM from "react-dom/client"
//import * as React from "react"
import React, { StrictMode } from "react"

import { BrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createRoot } from "react-dom/client"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

reportWebVitals()
