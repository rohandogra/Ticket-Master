import * as types from "../constant";

const initialState = {
  customers: [],
  loading1: false,
  customer: {},
  fetch: false,
};

const customers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CUSTOMERS: {
      return { ...state, customers: action.payload, loading1: false };
    }
    case types.GET_CUSTOMERSBYID: {
      return { ...state, customer: action.payload };
    }
    case types.CUSTOMERS_LOADER: {
      return { ...state, loading1: action.payload };
    }
    case types.CUSTOMERSBYID_LOADER: {
      return { ...state, fetch: action.payload };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return { ...state };
  }
};

export default customers;
