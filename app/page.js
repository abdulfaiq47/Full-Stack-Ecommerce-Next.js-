"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/page";
import { useState, useEffect } from "react";

export default function Home() {
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    async function fetchfun() {
      let fet = await fetch("/api/respproduct");
      let json = await fet.json();
      if (json) {
        setcategories(json.getproduct);
      }
    }
    fetchfun();
  }, []);
  const hanclick = () => {
    console.log(categories);
  };

  return (
    <>
      <button onClick={hanclick}>hut alsjfn</button>
      <div className="div">
        {categories.map((cat) => (
          <div className="id" key={cat._id}>
            <h2 className="tex">{cat._id}</h2>
            <ul className="gri">
              {cat._id === "Elec" && cat.items.map((prod) => (
                <li key={prod._id} className="p">
                  <p className="fo">{prod.name}</p>
                  <img src={prod.image} alt="" />
                  <p>${prod.price}</p>
                </li>
                
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
