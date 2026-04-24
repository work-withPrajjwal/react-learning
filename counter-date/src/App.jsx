
import {useState} from 'react'

function App() {
  const[count , setCount] = useState(0)
  const[step , setStep] = useState(1);
  const date = new Date();
  date.setDate(date.getDate()+ count);
  return (
    <div className='container'>
      <div className="step">
        <button onClick={() => setStep((currStep) => step + 1)}>+</button>
        <span>Step:{step}</span>
        <button onClick={() => setStep((currStep) => step - 1)}>-</button>
      </div>
      <div className="count">
        <button onClick={() => setCount((currCount) => currCount + step)}>
          +
        </button>
        <span>Count:{count}</span>
        <button onClick={() => setCount((currCount) => currCount - step)}>
          -
        </button>
      </div>
      <p>
        {
          count ===0 ? "Today is" : count > 0 ? `${count} day from today` : `${-count} day ago was`
        }
        <span>

        {date.toDateString()}
        </span>
        </p>
        
    </div>
  );
}

export default App;
