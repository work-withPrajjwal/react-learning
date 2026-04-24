
function App() {
  return (
    <div className="App">
    <Logo />
    <Form />
    <PackingList/>
    <Stats />
    </div>
  );
}

function Logo(){
  return(
    <h1>🏝️ FAR AWAY 🎒</h1>
  )

}
function Form(){
  return(
    <div className="add-form">
      <h3>What do you need for your 😍 Trip?</h3>
      <input type="text" />
    </div>
  )

}
function PackingList(){
  return <div className="list">
    <span>Shirt</span>
    <button>❌</button>
  </div>

}
function Stats(){
  return(
    <footer className="stats">
      🧳 You have  1 item  on your list and you already packed x.
    </footer>
  )

}

export default App;
