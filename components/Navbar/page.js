"use client";

import Link from "next/link";
import style from "./page.module.css";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const Navbar = () => {
  const [open, setopen] = useState(false);
  const [query, setQuery] = useState("");
  const [SreachResult, setSreachResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const HandleSearch = async (e) => {
    e.preventDefault();
    setIsSearch(true);

    if (!query) return;

    let res = await fetch(`/api/search?q=${query}`);
    let result = await res.json();
    if (result.success) setSreachResult(result.products);
  };

  return (
    <>
      <div className={style.aboveNav}>
        <p>{"Pakistan's Best Online Shopping Destination"}</p>
        <ul>
          <a
            href="https://support.telemart.pk/?_gl=1*ntnx5s*_ga*MTUzODgwMTA2NC4xNzU4NTM0NDM2*_ga_P59NGPVRVE*czE3NjAyNTc0NzMkbzMwJGcwJHQxNzYwMjU3NDczJGo2MCRsMCRoMA.."
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Support</li>
          </a>
          <li>|</li>
          <a
            href="https://www.telemart.pk/vendor/register?_gl=1*11ahqyq*_ga*MTUzODgwMTA2NC4xNzU4NTM0NDM2*_ga_P59NGPVRVE*czE3NjAyNTc0NzMkbzMwJGcxJHQxNzYwMjU4MTk2JGo1NyRsMCRoMA.."
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Sell on Telemart</li>
          </a>
          <li>|</li>
          <a
            href="https://telemart.pk/takaful"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <li>Takaful Islamic Insurance</li>
          </a>
          <li>|</li>
          <a
            href="https://telemart.pk/franchise_form"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Apply For A Franchise</li>
          </a>
          <li>|</li>
          <a
            href="https://telemart.pk/telemart_franchise"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Telemart Stores</li>
          </a>
          <li>|</li>
          <a
            href="https://telemart.pk/blogs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <li>Blog</li>
          </a>
          <li>|</li>
        </ul>
        <Image width={150} height={26} src="/bismillah.png" alt="bismillah" />
      </div>
      <div className={style.navbar}>
        <div className={style.logo}>
          <Link href="/">
            <Image alt="Logo" src="/logo.png" width={160} height={38} />
          </Link>
        </div>
        <form onSubmit={HandleSearch}>
          <div className={style.searchBar}>
            <input
              id="search-box"
              name="search-box"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What Are You Looking For?"
              className={style.searchBox}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  HandleSearch(e);
                }
              }}
            />
            <button
              type="submit"
              aria-label="Search button"
              className={style.searchBtn}
            >
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
        </form>

        <div className={style.list}>
          <ul>
            <li key={"navbar-ul"}>
              <Link href={"/login"}>
                Sign In
                <Image
                  src={"/login.svg"}
                  alt="login"
                  width={13.06}
                  height={14.92}
                />
              </Link>
            </li>
            <li>
              <Link href={"/cart"}>
                Cart
                <Image
                  src={"/cart.svg"}
                  alt="cart"
                  width={13.06}
                  height={14.92}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={style.Resnavbar}>
        <div className={style.hamburger}>
          <Hamburger toggled={open} size={28} toggle={setopen} />
        </div>

        <div className={`${style.Resmenu} ${open ? style.active : ""}`}>
          <Image width={150} height={26} src="/bismillah.png" alt="bismillah" />
          <hr />
          <p>{"Pakistan's Best Online Shopping Destination"}</p> <hr />
          <ul>
            <a
              href="https://support.telemart.pk/?_gl=1*ntnx5s*_ga*MTUzODgwMTA2NC4xNzU4NTM0NDM2*_ga_P59NGPVRVE*czE3NjAyNTc0NzMkbzMwJGcwJHQxNzYwMjU3NDczJGo2MCRsMCRoMA.."
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>Support</li>
            </a>

            <a
              href="https://www.telemart.pk/vendor/register?_gl=1*11ahqyq*_ga*MTUzODgwMTA2NC4xNzU4NTM0NDM2*_ga_P59NGPVRVE*czE3NjAyNTc0NzMkbzMwJGcxJHQxNzYwMjU4MTk2JGo1NyRsMCRoMA.."
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>Sell on Telemart</li>
            </a>

            <a
              href="https://telemart.pk/takaful"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <li>Takaful Islamic Insurance</li>
            </a>

            <a
              href="https://telemart.pk/franchise_form"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>Apply For A Franchise</li>
            </a>

            <a
              href="https://telemart.pk/telemart_franchise"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>Telemart Stores</li>
            </a>

            <a
              href="https://telemart.pk/blogs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <li>Blog</li>
            </a>
          </ul>
        </div>
        <div className={style.Reslogo}>
          <Image alt="Logo" src="/logo.png" width={160} height={38} />
        </div>
        <div className={style.list}>
          <ul>
            <li key={"navbar-ul"}>
              <Link href={"/login"}>
                Sign In
                <Image
                  src={"/login.svg"}
                  alt="login"
                  width={13.06}
                  height={14.92}
                />
              </Link>
            </li>
            <li>
              <Link href={"/cart"}>
                Cart
                <Image
                  src={"/cart.svg"}
                  alt="cart"
                  width={13.06}
                  height={14.92}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${style.ResSearch} ${open ? style.active : ""}`}>
        <div className={style.searchBar}>
          <form onSubmit={HandleSearch}>
            <FaSearch className={style.searchIcon} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  HandleSearch(e);
                }
              }}
            />
          </form>
        </div>
      </div>

      {isSearch &&
        (SreachResult.length > 0 ? (
          SreachResult.map((prod) => (
            <>
              <div className={style.ElecGala}>
                <h2>{prod.name}</h2>

                <div className={style.Elecbody}>
                  <div className={style.elecBanner}>
                    <p>You Searched</p>
                    {/* <Image
                      src="/ElecGala.png"
                      alt="elec1"
                      width={201}
                      height={384}
                    /> */}
                  </div>
                  <div className="id" key={prod._id}>
                    <div className="gri">
                      <div className={style.productCard}>
                        <div className={style.ProImg}>
                          <Image
                            src={prod.image}
                            alt={prod.image}
                            width={161}
                            height={256}
                          />
                        </div>
                        <p>{prod.name}</p>
                        <span className={style.ratingbadge}>
                          4.00 <FaStar />
                        </span>
                        <p className={style.Prop}>Rs{prod.price}</p>
                        <button
                          className={style.btn}
                          onClick={() => handleAddtocart(prod)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div key={p._id} className="p-2 border-b">
                <h3 className="font-bold">{p.name}</h3>
                <Image src={p.image} height={20} width={40} alt={p.name} />
                <img src={p.image} alt="" />
                <p>{p.price}</p>
              </div> */}
            </>
          ))
        ) : (
          <p>No Product Found!!</p>
        ))}
    </>
  );
};

export default Navbar;
