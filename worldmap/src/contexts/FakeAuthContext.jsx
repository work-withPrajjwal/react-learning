import { createContext, useReducer } from "react";


const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};


const AuthContext = createContext();


export function AuthProvider({children}) {
  return (
  <AuthContext.Provider>
    {children}
  </AuthContext.Provider>
  )
}


const initialState={
  user:null,
  isAuthenticated: false,
}

function reducer(state, action){
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };
      
      default: throw new Error("unknown Action");
  }
  

}


function useAuth(){


  const[{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

  const context = useContext(AuthContext);
  if(context === undefined) 
    throw new Error("AuthContect was outside the Auth Provider")
}

export {AuthProvider, useAuth};