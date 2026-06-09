import { createContext, useState } from "react"


const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext()



 function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setISLoading] = useState(false);

    useEffect(function () {
      async function fetchCities() {
        try {
          setISLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch (err) {
          console.log("Eror fetching cities", err);
        } finally {
          setISLoading(false);
        }
      }
      fetchCities();
    }, []);
  return (
    <div>CitiesContext</div>
  )
}


export {CitiesProvider}