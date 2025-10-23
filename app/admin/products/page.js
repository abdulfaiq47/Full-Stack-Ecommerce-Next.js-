"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import style from "./page.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

const Products = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    price: 0,
    discount: 0,
    category: "",
  });
  const [File, setFile] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(File);
    const { image, name, price, discount } = formData;

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("category", formData.category);
      if (File) formDataToSend.append("image", File);

      let fetc = await fetch("/api/admin/product", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formDataToSend,
      });
      let result = await fetc.json();

      if (result.success) {
        toast.success("Done Sucessfully ");
        setFormData({ image: "", name: "", price: 0, discount: 0 });
      } else {
        toast.error(result.message);
        console.log(result.message)
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
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            label="Product Category"
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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ color: "white" }}
          />
          {File && <p style={{ color: "gray" }}>Selected file: {File.name}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
      <button>Clickme</button>
    </ThemeProvider>
  );
};

export default Products;