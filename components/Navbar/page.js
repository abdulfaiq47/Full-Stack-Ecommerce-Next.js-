"use client";

import Link from "next/link";
import style from "./page.module.css";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [open, setopen] = useState(false);
  const hamclick = () => {
    setopen(!open);
  };

  return (
    <>
      <div className={style.aboveNav}>
        <p>Pakistan's Best Online Shopping Destination</p>
        <ul>
          <li>Support</li>
          <li>|</li>
          <li>Sell on Telemart</li>
          <li>|</li>
          <li></li>
          <li>|</li>
          <li>Takaful Islamic Insurance</li>
          <li>|</li>
          <li>Apply For A Franchise</li>
          <li>|</li>
          <li>Telemart Stores</li>
          <li>|</li>
          <li>Blog</li>
          <li>|</li>
        </ul>
        <img src="./bismillah.png" alt="" />
      </div>
      <div className={style.navbar}>
        <div className={style.logo}>
          <Image alt="Logo" src="/logo.png" width={160} height={38} />
        </div>
        <div className={style.searchBar}>
          <input
            id="search-box"
            name="search-box"
            type="text"
            placeholder="What Are You Looking For?"
            className={style.searchBox}
          />
          <button aria-label="Search button" className={style.searchBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={style.icon}
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 
            44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 
            208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 
            6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 
            9.4 33.9 0l28.3-28.3c9.4-9.4 
            9.4-24.6.1-34zM208 336c-70.7 
            0-128-57.2-128-128 0-70.7 57.2-128 
            128-128 70.7 0 128 57.2 128 
            128 0 70.7-57.2 128-128 128z"
              />
            </svg>
          </button>
        </div>
        <div className={style.list}><li>Sign In <Image src={"/login.svg"} alt="login" width={13.06} height={14.92} /></li></div>
      </div>
      <div className={style.Resnavbar}>
        <div className={style.hamburger}>
          <Hamburger toggled={open} size={28} toggle={setopen} />
        </div>

        {/* <Image
          className={style.hamburger}
          onClick={hamclick}
          src="/ic_setting.svg"
          height={32}
          width={40}
          alt="Btn"
        /> */}
        <div className={`${style.Resmenu} `}>
          <img width={150} height={26} src="./bismillah.png" alt="bismillah" />

          <hr />

          <p>Pakistan's Best Online Shopping Destination</p>
          <ul>
            <li>Support</li>

            <li>Sell on Telemart</li>

            <li>Takaful Islamic Insurance</li>

            <li>Apply For A Franchise</li>

            <li>Telemart Stores</li>

            <li>Blog</li>
          </ul>
        </div>
        <div className={style.Reslogo}>
          <Image alt="Logo" src="/logo.png" width={160} height={38} />
        </div>
        <div className={style.list}>fhfghf</div>
      </div> 
      <div className={`${style.ResSearch} ${open ? style.active : ""}`}>
      
        <div className={style.searchBar}>
          <FaSearch className={style.searchIcon} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </>
  );
};

export default Navbar;
