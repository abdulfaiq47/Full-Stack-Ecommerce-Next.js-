"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import style from "./page.module.css"

const products = () => {
  return (
    <div className={style.container} >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  );
};

export default products;
