import { useReducer, createContext, useEffect } from "react";


const QuizContext = createContext();


const SEC_PER_QUESTION = 30;


const initialState = {
  questions: [],
  // loading, error, ready, active, finish
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...state, status: "ready", index: 0, answer: null, points: 0 };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

    
   


      

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

   const { status, questions, index, answer, points, highScore, secondsRemaining} = state;

  const numQuestions = questions.length;

   const maxPossiblePoints = questions.reduce((prev, curr) => {
     return prev + curr.points;
   }, 0);

   useEffect(function () {
     fetch("http://localhost:3001/questions")
       .then((res) => res.json())
       .then((data) => dispatch({ type: "dataRecieved", payload: data }))
       .catch((err) => dispatch({ type: "dataFailed" }));
   }, []);


 
  return (

    <QuizContext.Provider value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
       maxPossiblePoints,
       dispatch,
    

    }}>

{children}

    </QuizContext.Provider>
  )

}




export {QuizProvider, QuizContext}