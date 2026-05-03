import './index.css';
import { useState } from 'react';

function App() {
  return (
    <div>
    <Review/>
    </div>
   
  );
}

function Review(){
  const[bill, setBill] = useState(0)
  const[service, setService]= useState('disatisfied');
   const [friendService, setFriendService] = useState("disatisfiedFriend");
  let serviceMoney;
  if(service==='disatisfied') serviceMoney=0;
  if(service==='okay') serviceMoney= 0.05 * Number(bill);
  if(service==='good') serviceMoney = 0.1 * Number(bill);
  if(service==='amazing') serviceMoney = 0.2 * Number(bill);
 

    let friendMoney;
    if (friendService === "disatisfiedFriend") friendMoney = 0;
    if (friendService === "okayFriend") friendMoney = 0.05 * Number(bill);
    if (friendService === "goodFriend") friendMoney = 0.1 * Number(bill);
    if (friendService === "amazingFriend") friendMoney = 0.2 * Number(bill);



  function handleBill(e){
    setBill(e.target.value)
    console.log(e.target.value)
  }
  function resetBill(){
    setBill(0)
  }
  let total = Number(bill)+ Number(serviceMoney)+ Number(friendMoney)
  return (
    <div className="app">
      <div>
        <label>How much was the bill?</label>
        <input type="number" onChange={handleBill} />
      </div>

      <div>
        <label>How did you like the service?</label>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="disatisfied">Dissatisfied(0%)</option>
          <option value="okay">It was okay(5%)</option>
          <option value="good">It was good(10%)</option>
          <option value="amazing">Absolutely amazing!(20%)</option>
        </select>
      </div>

      <div>
        <label>How did your friend like the service?</label>
        <select value={friendService} onChange={(e) => setFriendService(e.target.value)}>
          <option value="disatisfiedFriend">Dissatisfied(0%)</option>
          <option value="okayFriend">It was okay(5%)</option>
          <option value="goodFriend">It was good(10%)</option>
          <option value="amazingFriend">Absolutely amazing!(20%)</option>
        </select>
      </div>

      <div>
        <h1>{`You pay Rs.${bill}(Rs.${bill}+ Rs.${serviceMoney}+ Rs.${friendMoney}) =  Rs.${total}`}</h1>
        <button onClick={resetBill}>Reset</button>
      </div>
    </div>
  );
}

export default App;
