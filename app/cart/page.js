"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Cart = () => {
  const { data: session, status } = useSession();
  const [DataOfCart, setDataOfCart] = useState([]);

  useEffect(() => {
    if (status === "loading") return;

    const handlefetch = async () => {
      try {
        const fet = await fetch("/api/cart");
        const json = await fet.json();

        if (json.success) {
          setDataOfCart(json.cart.products || []);
          console.log(json.cart);
        } else {
          toast.error(`Error fetching cart: ${json.message}`);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };
    handlefetch();
  }, [session]);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#172237",
          fontWeight: "700",
          marginBottom: "30px",
        }}
      >
        Your Cart
      </h1>

      {DataOfCart.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: "1.2rem",
          }}
        >
          Your cart is empty 🛒
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {DataOfCart.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: "#172237",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(23, 34, 55, 0.6)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(23, 34, 55, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(23, 34, 55, 0.6)";
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                unoptimized
                style={{
                  borderRadius: "8px",
                  marginBottom: "10px",
                  objectFit: "cover",
                }}
              />
              <h2 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
                {item.name}
              </h2>
              <p style={{ color: "#ccc", marginBottom: "4px" }}>
                Quantity: <strong>{item.quantity}</strong>
              </p>
              <p style={{ color: "#ccc" }}>
                Price: <strong>${item.price}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
