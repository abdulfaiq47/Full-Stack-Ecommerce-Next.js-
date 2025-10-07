"use client";
import React from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { sendError } from "next/dist/server/api-utils";
import Image from "next/image";

const Cart = () => {
  const { data: session, status } = useSession();
  const [DataOfCart, setDataOfCart] = useState([]);

  useEffect(() => {
    if (status === "loading") return;

    const handlefetch = async () => {
      try {
        let fet = await fetch("/api/cart");

        let json = await fet.json();
        if (json.success) {
          setDataOfCart(json.cart.products || []);
          console.log(json.cart); // logs the correct new cart immediately
        } else {
          toast.error(`Error adding to cart: ${json.message}`);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };
    handlefetch();
  }, [session]);

  return (
    <>
      sdgsdgsgsg
      {DataOfCart.map((item) => (
        <div key={item._id} className="f">
          <p>{item.name}</p>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s"
            alt="Product"
            width={200}
            height={200}
            unoptimized
          />
        </div>
      ))}
    </>
  );
};

export default Cart;
