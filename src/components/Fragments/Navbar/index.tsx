import React from "react";
import styles from "./Navbar.module.scss";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data } = useSession();
  return (
    <div className={styles.navbar}>
      <button
        className={styles.navbar__button}
        onClick={() => (data ? signOut() : signIn())}
      >
        {" "}
        {data ? "Logout" : "Login"}{" "}
      </button>
    </div>
  );
}

export default Navbar;
