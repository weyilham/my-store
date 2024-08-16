import styles from "./Button.module.scss";

type propsType = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  varian: string;
};

function Button(props: propsType) {
  const { type, onClick, children, className, varian } = props;
  return (
    <>
      <button
        type={type}
        className={`${styles.button} ${styles[varian]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
