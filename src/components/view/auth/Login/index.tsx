/* eslint-disable react-hooks/rules-of-hooks */

import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import "boxicons/css/boxicons.min.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/Layouts/AuthLayout";

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
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign Up "
      error={error}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit" className={styles.button} varian="primary">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.divinder} />
      <div className={styles.other}>
        <Button
          type="button"
          varian="primary"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.other__button}
        >
          <i className="bx bxl-google"></i>
          Login with Google
        </Button>
      </div>
    </AuthLayout>
  );
}

export default LoginView;
