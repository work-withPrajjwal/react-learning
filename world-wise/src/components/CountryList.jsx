import styles from "./CountryList.module.css"
import Spinner from "./Spinner";
import CountryItem from "./CountryItem"
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
    const { isLoading, cities } = useCities;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  if (isLoading) return <Spinner />;
  if(!countries.length) return <Message message="add your first city by clicking on the map"/>

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
