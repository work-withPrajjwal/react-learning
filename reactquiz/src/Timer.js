import { useEffect } from "react"

export default function Timer({secondsRemaining, dispatch}) {
    useEffect(function (){
 setInterval(function(){
    dispatch({type:"tick"})
 },1000)
    },[dispatch])
  return (
    <div className="timer">{secondsRemaining}</div>
  )
}