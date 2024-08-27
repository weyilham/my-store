import React from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

type propsType = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

function Sidebar(props: propsType) {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h2 className={styles.sidebar__top__title}>Admin Panel</h2>
        <div className={styles.sidebar__top__list}>
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={list.title}
              className={`${styles.sidebar__top__list__item} ${
                pathname === list.url && styles.sidebar__top__list__item__active
              }`}
            >
              <i
                className={`bx ${list.icon} ${styles.sidebar__top__list__item__icon}`}
              />{" "}
              {list.title}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.sidebar__bottom}>
        <Button
          className={styles.sidebar__bottom__button}
          varian="secondary"
          type="button"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
