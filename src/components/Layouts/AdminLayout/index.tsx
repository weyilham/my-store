import Sidebar from "@/components/Fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-user",
  },

  {
    title: "Products",
    url: "/admin/product",
    icon: "bxs-store-alt",
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: "bxs-user-circle",
  },
];

type propTypes = {
  children: React.ReactNode;
};

function AdminLayout(props: propTypes) {
  const { children } = props;
  return (
    <div>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
}

export default AdminLayout;
