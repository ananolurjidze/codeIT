"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

function layout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link
          className={`
            ${styles.link}
            ${
              pathname.includes("/products")
                ? styles.activeLink
                : styles.inActiveLink
            }`}
          href="/products"
        >
          Products
        </Link>
        <Link
          className={`
            ${styles.link}
            ${
              pathname.includes("/profile")
                ? styles.activeLink
                : styles.inActiveLink
            }
            `}
          href="/profile"
        >
          Profile
        </Link>
        <Link
          className={`
            ${styles.link}
            ${
              pathname.includes("/cart")
                ? styles.activeLink
                : styles.inActiveLink
            }
            `}
          href="/cart"
        >
          Cart
        </Link>
      </nav>
      {children}
      
    <footer className={styles.footer}>
  <h5>Conditions of Use </h5>
  <h5>Privacy Notice</h5>
  <h5>interest-Based Ads</h5>
</footer>  
    </div>
  );
}
 



export default layout;
