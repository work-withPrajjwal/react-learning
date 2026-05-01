
import {useState} from 'react'

function App() {
  const[count , setCount] = useState(0)
  const[step , setStep] = useState(0);
  const date = new Date();
  date.setDate(date.getDate()+ count);

   function inputCount(e) {
     setCount(parseInt(e.target.value));
   }
   function reset(){
    setStep(0)
    setCount(0)
   }
   function handleRange(e){
    setStep(parseInt(e.target.value))
   }
  return (
    <div className="container">
      <label for="points">{step}</label>
      <input
        className="range"
        onChange={handleRange}
        type="range"
        id="points"
        name="points"
        min="0"
        max="10"
        value ={step}
      />

  
      <div className="count">
        <button
          className="add"
          onClick={() => setCount((currCount) => currCount + step)}
        >
          +
        </button>
        <input 
        value={count}
        type="number" onChange={inputCount} />
        <span>Count:{count}</span>
        <button
          className="sub"
          onClick={() => setCount((currCount) => currCount - step)}
        >
          -
        </button>
      </div>
      <p>
        {count === 0
          ? "Today is"
          : count > 0
            ? `${count} day from today is `
            : `${-count} day ago was`}
        <span>{date.toDateString()}</span>
      </p>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
