import { useState } from "react";

function App() {
    
   const [items, setItems] = useState([]);
    

    function handleToggleItems(id) {
      setItems((currItems) =>
        currItems.map((item) =>
          item.id === id ? { ...item, packed: !item.packed } : item,
        ),
      );
    }
  

     function handleAddItems(item) {
       setItems((currIrems) => [...currIrems, item]);
     }
     function handleDeleteItems(id){
      setItems((curItems) => curItems.filter((item)=> id !== item.id));
  
     }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItems={handleDeleteItems} onToggleItems={handleToggleItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ FAR AWAY 🎒</h1>;
}
function Form({onAddItems}) {
  const[description, setDescription] = useState("");
  const[quantity, setQuantity] = useState(1);
 


  function handleAdd(e){
    e.preventDefault();
    if(!description) return;
    const newItem = {description, quantity, packed:false, id:Date.now()}
    onAddItems(newItem);
    setDescription('')
    setQuantity(1)
    
  }
  return (
    <form className="add-form" onSubmit={handleAdd}>
      <h3>What do you need for your Trip 😍 ?</h3>
      <select value={quantity} onChange={(e)=> setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
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
function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul className="list">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      🧳 You have 1 item on your list and you already packed x.
    </footer>
  );
}

export default App;
