import { useEffect, useState } from "react";

export default function App() {
  const [region, setRegion] = useState("asia");
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [modalCountry, setModalCountry] = ({})

function handleOpenModal(country){
  setModalCountry(country)
}

  useEffect(
    function () {
      async function fetchCountries() {
        if (!query.length > 0) {
          const res = await fetch(
            ` https://restcountries.com/v3.1/region/${region}`,
          );

          const data = await res.json();
          setCountries(data);
        } else {
          const res = await fetch(
            ` https://restcountries.com/v3.1/name/${query}`,
          );
          const data = await res.json();
          setCountries(data);
        }
      }
      fetchCountries();
    },
    [region, query],
  );
  return (
    <div className="container">
      <Header />
      <Navigation setRegion={setRegion}>
        <SearchCountries query={query} setQuery={setQuery} />
      </Navigation>
      <CountriesList countries={countries} onOpenModal = {handleOpenModal}/>
    </div>
  );
}

function CountriesList({ countries, onOpenModal }) {
  return (
    <ul className={countries.length === 1 ? "single-country" : "countries"}>
      {countries.map((country) => (
        <Country country={country} onOpenModal={onOpenModal}/>
      ))}
    </ul>
  );
}

function CountryModal(){
  return (
    <div>Hello</div>
  )
}
function Country({ country, countries, onOpenModal }) {
  return (
    <li className="countries-list" onClick={()=>onOpenModal(country)}>
      <img src={country.flags.png} alt={`Falg of ${country.name.common}`} />
      <div className="info">
        <h3>{country.name.common}</h3>
        <p>
          <strong>Population:</strong>
          {country.population}
        </p>
        <p>
          <strong>Region:</strong>
          {country.region}
        </p>
        <p>
          <strong>Capital:</strong>
          {country.capital}
        </p>
      </div>
    </li>
  );
}
function Navigation({ region, setRegion, children }) {
  return (
    <div className="navigation">
      {children}
      <FilterCountries region={region} setRegion={setRegion} />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h4>Where in the world?</h4>
      <button>
        <span>🌑</span>
        dark Mode
      </button>
    </div>
  );
}

function SearchCountries({ query, setQuery }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="🔎search for a country"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function FilterCountries({ region, setRegion }) {
  return (
    <select
      className="filter-select"
      value={region}
      onChange={(e) => setRegion(e.target.value)}
    >
      <option value="asia">Asia</option>
      <option value="africa">Africa</option>
      <option value="europe">Europe</option>
      <option value="america">America</option>
      <option value="ocenia">Ocenia</option>
    </select>
  );
}
