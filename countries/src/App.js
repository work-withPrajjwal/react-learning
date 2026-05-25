export default function App(){
return (
  <div className="container">

  <Header/>
  <Search/>
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

function FilterCountries(){
  return(
    <select>
    <option value='asia'>Asia</option>
    <option value='africa'>Africa</option>
    <option value='europe'>Europe</option>
    <option value='northAmerica'>North America</option>
    <option value='southAmerica'>South America</option>
    <option value='ocenia'>Ocenia</option>
    </select>
  );
}