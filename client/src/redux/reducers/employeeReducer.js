import * as types from "../constant";

const initialState = {
  employees: [],
  loading: false,
  employee: {},
  fetch: false,
};

const employee = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EMPLOYEES: {
      return { ...state, employees: action.payload };
    }
    case types.EMPLOYEES_LOADER: {
      return { ...state, loading: action.payload };
    }
    case types.EMPLOYEE_BY_ID: {
      return { ...state, employee: action.payload };
    }
    case types.EMPLOYEE_BY_ID_LOADER: {
      return { ...state, fetch: action.payload };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return { ...state };
  }
};

export default employee;
