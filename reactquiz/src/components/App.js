import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import NextButton from "./NextButton";
import FinishedScreen from "./FinishedScreen"
import Footer from "../Footer";

const initialState = {
  questions: [],
  // loading, error, ready, active, finish
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0
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
      return { ...state, index: state.index + 1, answer:null };
      case "finish":
        return{...state, status:'finished', highScore: state.points> state.highScore ? state.points : state.highScore};
        case "restart":
          return{...state, status: 'ready', index:0, answer:null, points:0}
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ status, questions, index, answer,points, highScore }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce((prev, curr)=>{
   return prev + curr.points
  },0)

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
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
