/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"


const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext()



 function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch (err) {
          console.log("Eror fetching cities", err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    }, []);

    async function getCity(id) {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (err) {
        console.log("Eror fetching cities", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function createCity(newCity){
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`,{
            method: "POST",
            body:  JSON.stringify(newCity),
            headers: {
              "Conternt-Type":"application/json",
            }
          });
          const data = await res.json();
        } catch (err) {
        alert("Eror adding cities", err);
        } finally {
          setIsLoading(false);
        }
    }
  return (
   <CitiesContext.Provider 
   value={{
    cities,
     isLoading,
    currentCity,
     getCity
   }}>

    {children}
   </CitiesContext.Provider>
  )
}


    

function useCities(){
    const context = useContext(CitiesContext);
    if(context===undefined) throw new Error("CitiesContext was used outside the CIties Provider")
        return context;
}


export {CitiesProvider, useCities}