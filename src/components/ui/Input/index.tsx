import styles from "./Input.module.scss";

type InputProps = {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
};

function Input(props: InputProps) {
  const { name, label, type, placeholder } = props;
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.container__label}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={styles.container__input}
      />
    </div>
  );
}

export default Input;
