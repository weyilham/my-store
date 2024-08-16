/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function RegisterView() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;

    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    if (!data.email || !data.fullname || !data.phone || !data.password) {
      setError("Please fill in all fields");
      setIsLoading(false);

      return;
    }

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already registered, please login to register");
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <Input name="email" label="Email" type="email" />
          <Input name="fullname" label="Fullname" type="text" />
          <Input name="phone" label="Phone" type="number" />
          <Input name="password" label="Password" type="password" />
          <Button
            type="submit"
            varian="primary"
            className={styles.register__form__button}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
}

export default RegisterView;
