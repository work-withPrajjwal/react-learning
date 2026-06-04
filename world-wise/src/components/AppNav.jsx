
import { Link } from "react-router-dom"
import styles from "./AppNav.module.css"

export default function AppNav() {
  return (
   <ul className={styles.nav}>
    <li className={styles.list}>
        <link to ="a/app">App</link>
    </li>
   </ul>
  )
}