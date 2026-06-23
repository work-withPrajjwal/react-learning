import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customers/customerSlice";


configureStore({reducer:{
  account: accountReducer,
  customerReducer,  
}})


export default store;