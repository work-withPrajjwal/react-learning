import { createContext } from "react";



const AuthContext = createContext();


export function AuthProvider({children}) {
  return (
  <AuthContext.Provider>
    {children}
  </AuthContext.Provider>
  )
}


function useAuth(){
  const context = useContext(AuthContext);
}

export {AuthProvider}