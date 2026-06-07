import { useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"

export default function Map() {
  const[searchParams, setSearchParams]=useSearchParams();
  
  return (
    <div className={styles.mapContainer}>Map</div>
  )
}