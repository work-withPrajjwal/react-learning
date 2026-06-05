/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.citylist}>
      {cities.map((city) => (
        <CityItem city={city} key={cities.id} />
      ))}
    </ul>
  );
}
