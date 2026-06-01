import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";

const initialState = {
  questions: [],
  // loading, error, ready, active, finish
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index)
      return { ...state, answer: action.payload, points: action.payload === question.correctOption? state.points +question.points: state.points};
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );
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
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress index={index} numQuestions={numQuestions}/>
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
