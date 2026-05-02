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

     function handleClearItems(){
      const confirmed = window.confirm();
      if(confirmed)setItems([])
     }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList onClearItems={handleClearItems} items={items} onDeleteItems={handleDeleteItems} onToggleItems={handleToggleItems} />
      <Stats items={items} />
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
function PackingList({ items, onDeleteItems, onToggleItems, onClearItems}) {
  const[sortBy, setSortBy] = useState("input");
  let sortedItems;
  if(sortBy==="input") sortedItems =items;
  if(sortBy==="description") sortedItems= items.slice().sort((a,b)=>a.description.localeCompare(b.description))
    if(sortBy==='packed') sortedItems = items.slice().sort((a,b)=> Number(a.packed)- Number(b.packed));

  return (
    <div className="list">
      <ul className="list">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>sort By Input Order</option>
          <option value="description">sort By Description</option>
          <option value="packed">sort By Packed Status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
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
function Stats({items}) {
  if(items.length===0) return <footer className="stats">"Start adding some items to your packing list🚀"
  </footer>
  const numItems = items.length;
  const numPacked = items.filter((item)=> item.packed).length;
  const percentage = Math.round((numPacked/numItems)*100);
  return (
    <footer className="stats">
    {
      percentage === 100? "You got everything! Ready to go 🛩️" : 
      `🧳 You have ${numItems} item on your list and you already packed ${numPacked}(${percentage}%).`
    }
    </footer>
  );
}

export default App;
