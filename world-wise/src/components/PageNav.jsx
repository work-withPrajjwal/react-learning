import { Link } from "react-router-dom";

export default function PageNav() {
  return (
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
           <li>

            <Link to="/pricing">Pricing</Link>
           </li>
            <li>

            <Link to="/product">Procuct</Link>
            </li>
    </ul>
  )
}