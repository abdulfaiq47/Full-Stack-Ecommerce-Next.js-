"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/page";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [categories, setcategories] = useState([]);
  const [GetCate, setGetCate] = useState([]);
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
  const handleAddtocart = async (product) => {
    const res = await fetch("/api/addtocart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      }),
    });
    const result = await res.json();
    toast.success("Added to cart");
  };

  const getCategories = async (cate) => {
    let res = await fetch(`/api/categories?cate=${cate}`);
    let result = await res.json();
    setGetCate(result.categories);
    console.log(result.categories);
    if (!result.success) {
      return toast.error(result.message);
    }
  };

  return (
    <>
      <button onClick={hanclick}>hut alsjfn</button>
      <div className="div">
        {categories.map((cat) => (
          <div className="id" key={cat._id}>
            <h2 className="tex">{cat._id}</h2>
            <ul className="gri">
              {cat._id === "Elec" &&
                cat.items.map((prod) => (
                  <li key={prod._id} className="p">
                    <p className="fo">{prod.name}</p>
                    <img src={prod.image} alt="" />
                    <p>${prod.price}</p>
                    <button onClick={() => handleAddtocart(prod)}>
                      Add to cart
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <button onClick={()=> getCategories("Elec")} >Electronic</button>
      </div>
    </>
  );
}
