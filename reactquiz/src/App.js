import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from './Question'

const initialState = {
  questions: [],
  // loading, error, ready, active, finish
  status: "loading",
  index:0,
  answer:null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
      case "start":
        return{...state, status: "active"}
        case "newAnswer":
          return{...state, answer:action.payload}
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{status, questions, index, answer}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;


  useEffect(function () {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
       {status === 'loading' && <Loader />}
       {status === "error" && <Error/>}
       {status==='ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
       {status === 'active' && <Question question={questions[index]} answer={answer} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
