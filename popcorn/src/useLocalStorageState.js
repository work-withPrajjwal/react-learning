import { useEffect } from "react";

export function useLocalStorageState(key){
     const [value, setValue] = useState(function () {
       const storedValue = localStorage.getItem("key");
       return JSON.parse(storedValue);
     });

     useEffect(function (){
     localStorage.setItem("value", JSON.stringify(key));

     },[key, value])

     return[value, setValue]
}