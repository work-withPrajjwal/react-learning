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
  function handleBill(e){
    setBill(e.target.value)
    console.log(e.target.value)
  }
  function resetBill(){
    setBill(0)
  }
  return (
    <div className="app">
      <div>
        <label>How much was the bill?</label>
        <input type="number" onChange={handleBill} />
      </div>

      <div>
        <label>How did you like the service?</label>
        <select>
          <option value='disatisfied'>Dissatisfied(0%)</option>
          <option value='okay'>It was okay(5%)</option>
          <option value='good'>It was good(10%)</option>
          <option value='amazing'>Absolutely amazing!(20%)</option>
        </select>
      </div>

      <div>
        <label>How did your friend like the service?</label>
        <select>
          <option>Dissatisfied(0%)</option>
          <option>It was okay(5%)</option>
          <option>It was good(10%)</option>
          <option>Absolutely amazing!(20%)</option>
        </select>
      </div>

      <div>
        <h1>{`You pay Rs.${bill}(Rs.${bill}+ service+ sathi) = total`}</h1>
        <button onClick={resetBill}>Reset</button>
      </div>
    </div>
  );
}

export default App;
