
import {combineReducers, createStore} from "redux"

const initialStateAccount= {
    balance:0,
    loan:0,
    loanPurpose: ""

}


const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}


function accountReducer(state= initialStateAccount, action){
switch(action.type){
    case "account/deposit":
        return {...state, balance:state.balance + action.payload};
case "account/withdraw":
    return {...state, balance:state.balance - action.payload};

    case "account/requestLoan":
        return{...state, loan: action.payload.amount, 
            loanPurpose: action.payload.loanPurpose,
            balance: state.balance + action.payload.amount};

        case "account/payload":
            return{...state, loan:0, loanPurpose:'', balance: state.balance- state.loan};


        default:
            return state;
}
}



function customerReducer(state= initialStateCustomer, action){
    switch(action.type){
    case "customer/createCustomer":
        return{...state, fullName: action.payload.fullName, nationalID:action.payload.nationalID, createdAt:action.payload.create,};

        case "customer/updateName":
            return{...state, fullName:action.payload}
        default:
            return state;
    }
}



const rootReducer = combineReducers({
    account:accountReducer,
    customer: customerReducer,
})



const store = createStore(rootReducer);

// store.dispatch({type: "account/deposit", payload:500 });
// console.log(store.getState());

// store.dispatch({type:"account/withdraw", payload: 200});
// console.log(store.getState());

// store.dispatch({type:"account/requestLoan", payload:{
//     amount: 1000,
//    loanPurpose: "buy a phone"

// }});

// console.log(store.getState());

// store.dispatch({type: "account/payload"});
// console.log(store.getState());


function deposit(amount){
    return{type:"account/deposit", payload:amount};
}
function withdraw(amount){
    return{type:"account/withdraw", payload:amount};
}
function requestLoan(amount){
    return {
      type: "account/requestLoan",
      payload: {
        amount: 1000,
        loanPurpose: "buy a phone",
      },
    };
}

function payLoan(){
    return{type: "account/payloan"};
}






function createCustomer(fullName, nationalId){
    return{
        type:"customer/createCustome",
        payload: {
            fullName,
            nationalId,
            createdAt: new Date().toLocaleDateString(),
        }
    }
}


function updateName(fullName){
    return{
        type: 'customer/updateName',
        payload: fullName,
    };
}



store.dispatch(deposit(5000));
console.log(store.getState())