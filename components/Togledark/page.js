"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "./page.module.css";

const TogeltoDark = () => {
  const [open, setopen] = useState(false);
  const [dark, setDark] = useState(false);

  const handleClick = () => setopen(!open);
  const handleDark = () => {
    toast("Dark Mode 🌙");
    setDark(true);
  };
  const handlelight = () => {
    toast("Light Mode 🌞");
    setDark(false);
  };

  useEffect(() => {
    if (dark) {
      document.body.classList.add("DarkTheme");
      document.body.classList.remove("LightTheme");
    } else {
      document.body.classList.add("LightTheme");
      document.body.classList.remove("DarkTheme");
    }
  }, [dark]);

  return (
    <div className={style.wrapper}>
      <div className={style.btn}>
        <Image
          onClick={handleClick}
          src="/ic_setting.svg"
          height={32}
          width={40}
          alt="Btn"
        />
      </div>

      <p className={style.ABBtn}>Setting</p>

      <div className={`${style.SliderRight} ${open ? style.active : ""}`}>
        <div className={style.header}></div>

        <button className={style.closeBtn} onClick={() => setopen(false)}>
          Close
        </button>

        {/* --- Theme Toggle --- */}
        <div className={style.themeToggle}>
          <button
            className={`${style.themeCard} ${!dark ? style.active : ""}`}
            onClick={handlelight}
          >
            <div className={style.icon}>🌞</div>
            <span>Light</span>
          </button>

          <button
            className={`${style.themeCard} ${dark ? style.active : ""}`}
            onClick={handleDark}
          >
            <div className={style.icon}>🌙</div>
            <span>Dark</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TogeltoDark;
