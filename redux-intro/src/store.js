import {createStore} from "redux"

const initialState = {
    balance:0,
    loan:0,
    loanPurpose: ""

}


function reducer(state= initialState, action){
switch(action.type){
    case "account/deposit":
        return {...state, balance:state.balance + action.payload};
case "account/withdraw":
    return {...state, balance:state.balance - action.payload};

    case "account/requestLoan":
        return{...state, loan: action.payload, balance: state.balance + action.payload};

        case "account/payload":
            return{...state, loan:0, loanPurpose:"", balance: state.balance- state.loan};


        default:
            return state;
}
}


const store = createStore(reducer);

store.dispatch({type: "action/deposit", payload:500 });
console.log(store.getState());