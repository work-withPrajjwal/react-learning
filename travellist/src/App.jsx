import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ FAR AWAY 🎒</h1>;
}
function Form() {
  const[description, setDescription] = useState("");
  const[quantity, setQuantity] = useState(1);
  function handleAdd(e){
    e.preventDefault();
    
  }
  return (
    <form className="add-form">
      <h3>What do you need for your Trip 😍 ?</h3>
      <select value={quantity} onChange={(e)=> setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value="{num}">{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  function handleDeleteItem(e) {
    e.span.value.remove();
  }
  return (
    <ul className="list">
    {initialItems.map((item)=>(
      <Item key ={item.id} item={item} />
    ))}
    </ul>
  );
}
function Item({item}){
  return(
    <li className="item">
      <input type ="checkbox" />
      <span>
        {item.description} {item.quantity}
      </span>
      <button>❌</button>
    </li>
  )
}
function Stats() {
  return (
    <footer className="stats">
      🧳 You have 1 item on your list and you already packed x.
    </footer>
  );
}

export default App;
