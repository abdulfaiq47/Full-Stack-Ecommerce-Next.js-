"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/page";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Slideshow from "@/components/Slidebar/page";
import { SlideImage } from "./image";
import { FaStar } from "react-icons/fa";

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
      <div className={styles.sami}>
        <div className={styles.aboveSide}>
          <div className={styles.topCate}>
            <h4>Top Categories</h4>
            <ul>
              <li onClick={() => getCategories("elec")}>
                <Image src="/mob20.png" alt="mobile" width={20} height={20} />
                Mobiles & Tablets
              </li>
              <li onClick={() => getCategories("pc")}>
                <Image src="/pc.png" alt="pc" width={20} height={20} /> Computer
                & Gaming
              </li>
              <li onClick={() => getCategories("tv")}>
                <Image src="/tv.png" alt="tv" width={20} height={20} /> TV &
                Video
              </li>
              <li onClick={() => getCategories("mensfashion")}>
                <Image src="/mens.png" alt="mens" width={20} height={20} />{" "}
                Men's Fashion
              </li>
            </ul>
          </div>
          <Slideshow>
            {SlideImage.map((slideImage, index) => (
              <div className={styles.eachSlide} key={index}>
                <div className={styles.bannerContainer}>
                  <Image
                    src={slideImage.imgURL}
                    alt={slideImage.imgAlt}
                    fill
                    // width={744}
                    // height={405}
                    className={`${styles.im} `}
                  />
                </div>
              </div>
            ))}
          </Slideshow>
          <div className={styles.sideIm}>
            <Image
              src="/owned.png"
              alt="Owned"
              width={316}
              height={198.68}
              className={styles.im}
            />
            <Image
              src="/mobiles.jpg"
              alt="mobiles"
              width={316}
              height={198.68}
              className={styles.im}
            />
          </div>
        </div>
        <div className={styles.RestopCate}>

            <ul>
              <li onClick={() => getCategories("elec")}>
                <Image src="/mob20.png" alt="mobile" width={48} height={48} />
                Mobiles & Tablets
              </li>
              <li onClick={() => getCategories("pc")}>
                <Image src="/pc.png" alt="pc" width={48} height={48} /> Computer
                & Gaming
              </li>
              <li onClick={() => getCategories("tv")}>
                <Image src="/tv.png" alt="tv" width={48} height={48} /> TV &
                Video
              </li>
              <li onClick={() => getCategories("mensfashion")}>
                <Image src="/mens.png" alt="mens" width={48} height={48} />{" "}
                Men's Fashion
              </li>
            </ul>
          </div>
        {GetCate?.length > 0 && (
          <div>
            {GetCate.map((prod) => (
              <div className={styles.ElecGala}>
                <h2>{prod.category}</h2>

                <div className={styles.Elecbody}>
                  <div className={styles.elecBanner}>
                    <Image
                      src="/ElecGala.png"
                      alt="elec1"
                      width={201}
                      height={384}
                    />
                  </div>

                  <div className="id" key={prod._id}>
                    <div className="gri">
                      <div key={prod._id} className={styles.productCard}>
                        <div className={styles.ProImg}>
                          <Image
                            src={prod.image}
                            alt={prod.image}
                            width={161}
                            height={256}
                          />
                        </div>
                        <p>{prod.name}</p>
                        <span className={styles.ratingbadge}>
                          4.00 <FaStar />
                        </span>
                        <p className={styles.Prop}>Rs{prod.price}</p>
                        <button
                          className={styles.btn}
                          onClick={() => handleAddtocart(prod)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.ElecGala}>
          <h2>Electronics Gala</h2>

          <div className={styles.Elecbody}>
            <div className={styles.elecBanner}>
              <Image src="/ElecGala.png" alt="elec1" width={201} height={384} />
            </div>
            {categories.map((cat) => (
              <div className="id" key={cat._id}>
                <div className="gri">
                  {cat._id === "elec" &&
                    cat.items.map((prod) => (
                      <>
                        <div key={prod._id} className={styles.productCard}>
                          <div className={styles.ProImg}>
                            <Image
                              src={prod.image}
                              alt={prod.image}
                              width={161}
                              height={256}
                            />
                          </div>
                          <p>{prod.name}</p>
                          <span className={styles.ratingbadge}>
                            4.00 <FaStar />
                          </span>
                          <p className={styles.Prop}>Rs{prod.price}</p>
                          <button
                            className={styles.btn}
                            onClick={() => handleAddtocart(prod)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ElecGala}>
          <h2>Electronics Gala</h2>

          <div className={styles.Elecbody}>
            <div className={styles.elecBanner}>
              <Image src="/ElecGala.png" alt="elec1" width={201} height={384} />
            </div>
            {categories.map((cat) => (
              <div className="id" key={cat._id}>
                <div className="gri">
                  {cat._id === "elec" &&
                    cat.items.map((prod) => (
                      <>
                        <div key={prod._id} className={styles.productCard}>
                          <div className={styles.ProImg}>
                            <Image
                              src={prod.image}
                              alt={prod.image}
                              width={161}
                              height={256}
                            />
                          </div>
                          <p>{prod.name}</p>
                          <span className={styles.ratingbadge}>
                            4.00 <FaStar />
                          </span>
                          <p className={styles.Prop}>Rs{prod.price}</p>
                          <button
                            className={styles.btn}
                            onClick={() => handleAddtocart(prod)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
