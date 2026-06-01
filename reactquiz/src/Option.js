export default function Option({ question, answer, dispatch }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button className={`btn btn-option ${index===answer ? "answer":""}`} key={option} onClick= {()=>dispatch({type:"newAnswer", payload:index})}>
          {option} 
        </button>
      ))}
    </div>
  );
}
