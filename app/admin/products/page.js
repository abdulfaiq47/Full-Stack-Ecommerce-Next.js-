"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import style from "./page.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

const products = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    price: 0,
    discount: 0,
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { image, name, price, discount } = formData;

    try {
      let fetc = await fetch("/api/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      let result = await fetc.json();

      if (result.success) {
        toast.success("Done Sucessfully ");
        setFormData({ image: "", name: "", price: 0, discount: 0 });
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.log("error", error);

    }
  };
  return (
    // <div className={style.container}>

    // </div>
    <ThemeProvider theme={darkTheme}>
      <div style={{ padding: 20, background: "#121212" }}>
        <form onSubmit={handlesubmit}>
          <TextField
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            label="Product name"
            variant="outlined"
          />
          <TextField
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            label="Product Image"
            variant="outlined"
          />
          <TextField
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            label="Product Price"
            variant="outlined"
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, discount: Number(e.target.value) })
            }
            value={formData.discount}
            label="Product discount"
            variant="outlined"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <button>Clickme</button>
    </ThemeProvider>
  );
};

export default products;
