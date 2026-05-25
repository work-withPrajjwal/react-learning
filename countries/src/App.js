import { useEffect, useState } from "react";

export default function App() {
  const [region, setRegion] = useState("asia");
  const [countries, setCountries] = useState([]);

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
      <Navigation setRegion={setRegion} />
      <CountriesList countries={countries} />
    </div>
  );
}

function CountriesList({ countries }) {
  return (
    <ul className="country">
      {countries.map((country) => (
        <Country country={country} />
      ))}
    </ul>
  );
}

function Country({ country }) {
  return (
    <li>
      <img src={country.flags.png} alt={`Falg of`} />
    </li>
  );
}
function Navigation({ region, setRegion }) {
  return (
    <div>
      <SearchCountries />
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

function SearchCountries() {
  return <input type="text" placeholder="🔎search for a country" />;
}

function FilterCountries({ region, setRegion }) {
  return (
    <select value={region} onChange={(e) => setRegion(e.target.value)}>
      <option value="asia">Asia</option>
      <option value="africa">Africa</option>
      <option value="europe">Europe</option>
      <option value="northAmerica">North America</option>
      <option value="southAmerica">South America</option>
      <option value="ocenia">Ocenia</option>
    </select>
  );
}
