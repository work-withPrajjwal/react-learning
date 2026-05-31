import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";


const initialState = {
  questions: [],
  // loading, error, ready, active, finish
  status: 'loading'
};
function reducer(state, action){
switch(action.type){
  case "dataReciebed":
    return{...state, questions: action.payload, status: 'ready'};
    case "dataFailed":
      return{...state, status:'error'}
default:
  throw new Error("Action unknown")
  }
}

function App() {


  const[state, dispatch] = useReducer(reducer, initialState)
  useEffect(function(){
    fetch("http://localhost:3001/questions")
    .then((res) => res.json())
    .then((data) => dispatch({type:'datarecieved', payload:data}))
    .then((err) => dispatch({type:'dataFailed'}))
  },[])
  return (
    <div className="app">
      <Header/>
      <Main>
        <p>1/15</p>
        <p>questions</p>
      </Main>
    </div>
  );
}

export default App;
