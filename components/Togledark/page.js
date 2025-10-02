"use client";
import React from "react";
import style from "./page.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TogeltoDark = () => {
  const [open, setopen] = useState(false);
  const [dark, setDark] = useState(false);

  const handleClick = () => {

    setopen(!open);
  };
  const handleDark = () => {
    toast("Dark Mode 🌙");
    setDark(false);
  };
  const handlelight =()=>{
    toast("Light Mode 🌞")
    setDark(true);
  }
  useEffect(() => {
    if (dark === false) {
      document.body.classList.add("DarkTheme");
      document.body.classList.remove("LightTheme");
    } else {
      document.body.classList.add("LightTheme");
      document.body.classList.remove("DarkTheme");
    }
  }, [dark]);

  return (
    <div>
      <div className={style.btn}>
        <Image
          onClick={handleClick}
          src="/ic_setting.svg"
          height={32}
          width={40}
          alt="Btn"
        />
      </div>
      <p className={style.ABBtn} >Setting</p>
      <div className={`${style.SliderRight} ${open ? style.active : ""}`}>
        <div className={style.header}></div>
        gsDgsgs
        <button
          onClick={() => {
            setopen(false);
          }}
        >
          Close
        </button>
        <div className={style.dark}><button onClick={handleDark} >Dark</button></div>
        <div className={style.light}><button onClick={handlelight} >Light</button></div>
      </div>
    </div>
  );
};

export default TogeltoDark;
