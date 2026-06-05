import styles from "./CountryList.module.css"
import Spinner from "./Spinner";
import CountryItem from "./CountryItem"

export default function CountryList({cities, isLoading}) {
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, city)=> 
    {if(!arr.map((el)=>el.country).includes(city.country)) return [...arr, {contry: city.contry, emoji: city.emoji}];
  else return arr;
    },[])
  return (
    <ul className={styles.cityList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
