import { useEffect, useState } from "react";

export default function App() {
  const [region, setRegion] = useState("asia");
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('')

  useEffect(
    function () {
      async function fetchCountries() {
        const res = await fetch(
          ` https://restcountries.com/v3.1/region/${region}`,
        );

        const data = await res.json();
        setCountries(data);
      }
      fetchCountries();
    },
    [region],
  );
  return (
    <div className="container">
      <Header />
      <Navigation setRegion={setRegion}><SearchCountries query={query} setQuery={setQuery}/></Navigation>
      <CountriesList countries={countries} />
    </div>
  );
}

function CountriesList({ countries }) {
  return (
    <ul className="countries">
      {countries.map((country) => (
        <Country country={country} key={country.area} />
      ))}
    </ul>
  );
}

function Country({ country }) {
  return (
    <li className="countries-list">
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

function SearchCountries(query, setQuery) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="🔎search for a country"
      value={query}
      onChange={(e)=>e.target.value}
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
      <option value="northAmerica">North America</option>
      <option value="southAmerica">South America</option>
      <option value="ocenia">Ocenia</option>
    </select>
  );
}
