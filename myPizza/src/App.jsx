import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <>
      <Header />
     <Menu/>
    </>
  );
}
function Header() {
  return (
    <div className="header">
      <h1>Fast React Pizza Co.</h1>
    </div>
  );
}

function Menu(){
  const pizzas = pizzaData;
  const numPizza = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {
        numPizza > 0 ?(
          <> 
      <p>
        Authentic Italian cuisine.6 Creative dishes to choose from our stone
        oven, all organic, all delicious.
      </p>
      <ul className="pizzas">
        {pizzas.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
      </ul>
      </>):(
        "We are still working on our Menu. Please come back later."
      )}
    </main>
  );
}

function Pizza(props){
  const{ name, ingredients, price, photoName, soldOut} = props.pizzaObj
  return(
    <div className={`pizza ${soldOut? 'sold-out':""}`}>
<img src={photoName} alt={name} />
    <li>
    <h3>{name}</h3>
    <p>{ingredients}</p>
    <span> {soldOut? "Sold Out": price}</span>
    </li>
    </div>
  )
}

function Footer(){
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 17;
  const isOpen = hour >= openHourpenHour && hour <=closeHour;
  return(
<div className="order">
  { 
    isOpen?(
      <Order OpenHour={openHour} closeHour={closeHour}/>
    ):(
      <p>
        we are Happy to welcome you between{openHour}:00 to {closeHour}:00
      </p>
    )
}
</div>
  )
}


export default App;
