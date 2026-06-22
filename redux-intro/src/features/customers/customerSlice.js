const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};





export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.create,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}



export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustome",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toLocaleDateString(),
    },
  };
}

export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}



