import styles from "./CountryList.module.css"
import Spinner from "./Spinner";
import CountryItem from "./CountryItem"

export default function CountryList({cities, isLoading}) {
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, city)=> if(arr.map((e)=>el.country).includes(city.country))),[])
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CountryItem city={city} key={cities.id} />
      ))}
    </ul>
  );
}
