import Logo from "./Logo";
import styles from "./Sidebar.module.css"

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo/>
    </div>
  );
}