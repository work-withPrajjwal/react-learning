import { useState } from "react"

export default function App(){
  const [region, setRegion] = useState("")
return (
  <div className="container">

  <Header/>
  <Navigation setRegion={setRegion}/>
  </div>
)
}

function Navigation({region, setRegion}){
  return(
    <div>
      <SearchCountries/>
      <FilterCountries region={region} setRegion={setRegion}/>
    </div>
  )
}

function Header(){
return(
  <div className="header">
    <h4>Where in the world?</h4>
    <button>
      <span>
      🌑
      </span>
      dark Mode</button>

  </div>
)
}

function SearchCountries(){
  return(
    <input type='text' placeholder="🔎search for a country"/>
  )
}

function FilterCountries({region, setRegion}){
  return(
    <select value={region} onChange={(e)=>setRegion(e.target.value)}>
    <option value='asia'>Asia</option>
    <option value='africa'>Africa</option>
    <option value='europe'>Europe</option>
    <option value='northAmerica'>North America</option>
    <option value='southAmerica'>South America</option>
    <option value='ocenia'>Ocenia</option>
    </select>
  );
}