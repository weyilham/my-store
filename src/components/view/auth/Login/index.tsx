/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import "boxicons/css/boxicons.min.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button
            type="submit"
            className={styles.login__form__button}
            varian="primary"
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <hr className={styles.login__divinder} />
        <div className={styles.login__other}>
          <Button
            type="button"
            varian="primary"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={styles.login__other__button}
          >
            <i className="bx bxl-google"></i>
            Login with Google
          </Button>
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
