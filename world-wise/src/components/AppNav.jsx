import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css"

export default function AppNav(){
 return (
    <nav>
<ul className={StyleSheet.nav}>
    <li>
        <NavLink to="/app">Cities</NavLink>
    </li>
    <li>
        <NavLink to="/app">Countries</NavLink>
    </li>
</ul>
        </nav>

  )
}