/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import "boxicons/css/boxicons.min.css";

function LoginView() {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        email: form.email.value,
        password: form.password.value,
        redirect: false,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.login__form__item__input}
            />
          </div>
          <button
            type="submit"
            className={styles.login__form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <hr className={styles.login__divinder} />
        <div className={styles.login__other}>
          <button
            type="button"
            className={styles.login__other__button}
            disabled={isLoading}
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
          >
            <i className="bx bxl-google"></i>
            {isLoading ? "Loading..." : "Login with Google"}
          </button>
        </div>
      </div>
      <p className={styles.login__link}>
        Don{"'"}t have an account? Sign Up{" "}
        <Link href="/auth/register">here</Link>
      </p>
    </div>
  );
}

export default LoginView;
