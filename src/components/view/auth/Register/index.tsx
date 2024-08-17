/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authService from "@/services/auth";
import AuthLayout from "@/components/Layouts/AuthLayout";

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

    const result = await authService.registerAccount(data);

    if (result.status === 200) {
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already registered, please login to register");
    }
  };
  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account? Sign in "
      error={error}
    >
      <form onSubmit={handleSubmit}>
        <Input name="email" label="Email" type="email" />
        <Input name="fullname" label="Fullname" type="text" />
        <Input name="phone" label="Phone" type="number" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit" varian="primary" className={styles.button}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default RegisterView;
