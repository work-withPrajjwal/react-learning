
import {useState} from 'react'

function App() {
  const[count , setCount] = useState(0)
  const[step , setStep] = useState(1);
  const date = new Date();
  date.setDate(date.getDate()+ count);

  function inputStep(e){
    setStep(parseInt(e.target.value))
  }
   function inputCount(e) {
     setCount(parseInt(e.target.value));
   }
   function reset(){
    setCount(0)
   }
   function range(e){
    setCount(parseInt(e.target.value))
   }
  return (
    <div className="container">
      <label for="points">Points (between 0 and 10):</label>
      <input
        className="range"
        onChange={range}
        type="range"
        id="points"
        name="points"
        min="0"
        max="10"
      />

      <div className="step">
        <button className="add" onClick={() => setStep((currStep) => step + 1)}>
          +
        </button>
        <input type="number" onChange={inputStep} />
        <span>Step:{step}</span>
        <button className="sub" onClick={() => setStep((currStep) => step - 1)}>
          -
        </button>
      </div>
      <div className="count">
        <button
          className="add"
          onClick={() => setCount((currCount) => currCount + step)}
        >
          +
        </button>
        <input type="number" onChange={inputCount} />
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
