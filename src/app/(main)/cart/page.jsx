"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

function Page() {
  const [cartProducts, setCartProducts] = useState([]);

  const getProductsFromStorage = async () => {
    const products = await JSON.parse(localStorage.getItem("products"));
    setCartProducts(products);
  };

  useEffect(() => {
    getProductsFromStorage();
  }, []);

  const handleAddOne = async (product) => {
    const products = await JSON.parse(localStorage.getItem("products"));
    const index = products.findIndex((item) => item.product.id === product.id);
    products[index].count++;

    setCartProducts(products);
    localStorage.setItem("products", JSON.stringify([...products]));
  };

  const handleRemoveOne = async (product) => {
    const products = await JSON.parse(localStorage.getItem("products"));
    const index = products.findIndex((item) => item.product.id === product.id);
    products[index].count--;

    setCartProducts(products);
    localStorage.setItem("products", JSON.stringify([...products]));
  };

  const handleDeleteProduct = async (product) => {
    const products = await JSON.parse(localStorage.getItem("products"));
    const filtered = products.filter((item) => item.product.id !== product.id);

    setCartProducts(filtered);
    localStorage.setItem("products", JSON.stringify(filtered));
  };

  return (
    <div className={styles.container}>
      {cartProducts?.map((prod) => (
        <div key={prod.product.id} className={styles.itemWrapper}>
          <Image
            src={prod.product.image}
            width={70}
            height={70}
            alt={prod.product.title}
          />
          <div>
            <h4>{prod.product.title}</h4>
            <h5>{prod.product.price} $</h5>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.add}
              onClick={() => handleAddOne(prod.product)}
            >
              +
            </button>
            <p className={styles.p}>{prod.count}</p>
            <button
              className={styles.remove}
              onClick={() => handleRemoveOne(prod.product)}
            >
              -
            </button>
            <button 
              className={styles.delete}
              onClick={() => handleDeleteProduct(prod.product)}
            >
               <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    fill="grey"
    style={{ marginRight: "5px" }}
  >
    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
  </svg>

            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
