import styles from "./CityList.module.css"

export default function CityList({cities, isLoading}) {

  return (
    <ul className={styles.citylist}>
     {
        cities.map((city)=>)
     }  
    </ul>
  )
}