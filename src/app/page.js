"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const router = useRouter();

  const handleLoginChange = () => {
    return setLogin(!login);
  };

  const checkIfUserExists = async () => {
    const result = await JSON.parse(localStorage.getItem("user"));

    if (result !== null) {
      router.replace("/products", { path: "products" });
    }
  };

  useEffect(() => {
    checkIfUserExists();
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password, 
        }),
      });
      const result = await res.json();
      if (result.token) {
        localStorage.setItem("user", JSON.stringify(result.token));
        router.replace("/products", { path: "products" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      id: 0, 
      username: username,
      email: email,
      password: password,
      name: {
        firstname: "john", 
        lastname: "doe", 
      },
      phone: "1-570-236-7033", 
      address: {
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
        city: "kilcoole",
        street: "new road",
        number: 7682,
        zipcode: "12926-3874",
      },
    };

    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (result.id) {
        localStorage.setItem("user", JSON.stringify(result));
        router.replace("/products", { path: "products" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.container} onSubmit={login ? handleLoginSubmit : handleRegisterSubmit}>
        {login ? (
          <>
            <h3 className={styles.signin}>Sign In</h3>
            <p className={styles.desc}>Please sign in to access the market.</p>
            <input
              onChange={(event) => setUsername(event.target.value)}
              className={styles.input}
              placeholder="Username"
            />
            <input
              onChange={(event) => setPassword(event.target.value)}
              className={styles.input}
              type="password"
              placeholder="Password"
            />
            <button className={styles.button} type="submit">
              Sign In
            </button>
            <button onClick={handleLoginChange} className={styles.notResgitered}>
              Not Registered? Sign up
            </button>
          </>
        ) : (
          <>
            <h3 className={styles.signin}>Sign Up</h3>
            <input
              onChange={(event) => setUsername(event.target.value)}
              className={styles.input}
              placeholder="Username"
            />
            <input
              onChange={(event) => setEmail(event.target.value)}
              className={styles.input}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(event) => setPassword(event.target.value)}
              className={styles.input}
              type="password"
              placeholder="Password"
            />
            <input
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={styles.input}
              type="password"
              placeholder="Confirm Password"
            />
            <button className={styles.button} type="submit">
              Sign Up
            </button>
            <button onClick={handleLoginChange} className={styles.notResgitered}>
              Already Registered? Sign in
            </button>
          </>
        )}
      </form>
    </main>
  );
}
