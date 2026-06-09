import { useState } from "react";


const data=[
  {
    message: "This is the best product I've ever used!",
    name:"Rijan Tiwari",

  },
  {
    message: "I highly recommend this product to everyone!",
    name:"Prajjwal Budha",

  },
  {
    message: "I am not satisfied with the quality of this product.",
    name:"Rohit Bist",

  },
  {
    message: "Ts was not worth the price I paid for it.",
    name:"Lhosang Lama",

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
    <div>
       <button onClick={()=>setIsOpen(!isOpen)}>&times;</button>
{isOpen && (
    <div className="App">
     
      <div className="text">
        <p>{data[message - 1].message}</p>
        <p className="bold">-{data[message -1].name}</p>
      </div>
      <div className="buttons">
      <button onClick={handlePreviousMessage} >Prev</button>
      <button onClick={handleNextMessage}>Next</button>
      </div>
    </div>)}
    </div>
  );
}

export default App;
