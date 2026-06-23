import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose){
        return{payload:{
          amount,
          purpose,
        },
      };
      },
    
    reducer(state, action) {
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance += action.payload.amount;
    }},
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;



export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/covertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.dev/v2/rate/${currency}/USD`,
    );
    const data = await res.json();
    const converted = Number((amount * data.rate).toFixed(2));

    dispatch({ type: "account/deposit", payload: converted });
  };
}



export default accountSlice.reducer;
