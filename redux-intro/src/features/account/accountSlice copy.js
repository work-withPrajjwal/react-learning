import { createSlice } from "@reduxjs/toolkit";
import { payLoan, withdraw } from "./accountSlice";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
};

const accountSlice = createSlice({

  name: "account",
  initialState,
  reducers:{
    deposit(state, action){
      state.balance += action.payload;
    },
    withdraw(state, action){
      state.balamce -=  action.payload;
    },
    requestLoadn(state, action){
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance  += action.payload.amount;
    },
    payLoan(state, action){
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose='';
    }
  }
});

