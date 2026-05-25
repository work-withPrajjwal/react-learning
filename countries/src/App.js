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

function Search(){
  return(
    <input type='text' placeholder="🔎search for a country"/>
  )
}