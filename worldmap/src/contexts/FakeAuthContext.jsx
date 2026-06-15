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
  if(context === undefined) 
    throw new Error("AuthContect was outside the Auth Provider")
}

export {AuthProvider}