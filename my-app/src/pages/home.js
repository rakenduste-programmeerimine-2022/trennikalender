//import React from "react"
//import React  /*,{useState} */ from 'react'
import Box from "@mui/material/Box"


import React, {useState, useCallback} from 'react'
import axios from "axios"
import swal from "sweetalert"
import { createTheme, Pivot, PivotItem, ThemeProvider } from "@fluentui/react";
import "./styles.css";
import Calendar from "../components/Kalender/Calendar";
import List from "../components/Kalender/List";
import { data } from "../components/Kalender/data_list_json";




//impordid andmed üle api

const myTheme = createTheme({
  palette: {
    themePrimary: "#0078d4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff"
  }
});

export default function home() {
  return (
    <ThemeProvider applyTo="body" theme={myTheme}>
      <Pivot>
        <PivotItem headerText="Calendar">
          <Calendar data={data} onCommitChanges={(props) => {
              saveEvent(props);
            }}/>
        </PivotItem>
        <PivotItem headerText="List">
          <List data={data} />
        </PivotItem>
      </Pivot>
    </ThemeProvider>
  );
}

function saveEvent(data) {
  try {
    console.log(data)
    axios
      .post("http://localhost:8080/calendar/createEvent", {
        ...data
      })
      .then(res => {
        if (res.data.result === "success") {
          swal(
            "Uus event lisatud.",
            res.data.message,
            "success"
          )
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error")
        }
      })
  } catch (error) {
    console.log(error)
    swal("Error!", error, "error")
  }
}


