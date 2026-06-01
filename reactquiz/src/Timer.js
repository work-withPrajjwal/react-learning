import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
     const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return ()=> clearInterval(id);
    },
    [dispatch],
  );
  return (
    <div className="timer">
     0{mins}:{seconds}
    </div>
  );
}
