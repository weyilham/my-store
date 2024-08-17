import Link from "next/link";
import styles from "./AuthLayout.module.scss";

type propsType = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

export default function AuthLayout(props: propsType) {
  const { error, title, children, link, linkText } = props;
  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>{title}</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>{children}</div>
      <p className={styles.login__link}>
        {linkText}
        <Link href={link}>here</Link>
      </p>
    </div>
  );
}
