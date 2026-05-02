import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form"
import PackingList from "./PackingList";
import Item from "./Item";
import Stats from "./Stats";



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


export default App;
