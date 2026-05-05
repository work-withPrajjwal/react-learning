import { useState } from "react";


const data=[
  {
    message: "This is the best product I've ever used!",
    name:"Jane Doe",

  },
  {
    message: "I highly recommend this product to everyone!",
    name:"Jane Doe",

  },
]

function App() {
  const[message, setMessage]= useState(1);
  
  function handlePreviousMessage(){
    if(message>1) setMessage((currMessage)=> currMessage-1)
  }

  function 
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
