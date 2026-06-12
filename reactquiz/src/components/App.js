import { useContext, useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import NextButton from "./NextButton";
import FinishedScreen from "./FinishedScreen";
import Footer from "../Footer";
import Timer from "../Timer";
import {QuizContext} from "../context/QuizContext"


function App() {
   const {
     status,
     dispatch,
     questions,
     index,
     points,
     answer,
     highScore,
     secondsRemaining,
     numQuestions,
     maxPossiblePoints,
   } = useContext(QuizContext);



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
                <Timer
                  secondsRemaining={secondsRemaining}
                  dispatch={dispatch}
                />
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
