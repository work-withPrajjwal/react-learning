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
  const[isOpen, setIsOpen]= useState(true)
  
  function handlePreviousMessage(){
    if(message>1) setMessage((currMessage)=> currMessage-1)
  }


  function handleNextMessage(){
    if(message<data.length) setMessage((currMessage)=>currMessage+1)
  }
  return (
    <div className="App">
      <div className="text">
        <p>{data[message - 1].message}</p>
        <p>-{data[message -1].name}</p>
      </div>
      <div className="buttons">
      <button onClick={handlePreviousMessage} >Prev</button>
      <button onClick={handleNextMessage}>Next</button>
      </div>
    </div>
  );
}

export default App;
