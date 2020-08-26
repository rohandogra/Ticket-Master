import * as types from "../constant";

const initialState = {
  department: [],
  loading: false,
};

const department = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS: {
      return { ...state, department: action.payload };
    }

    case types.DEPARTMENT_LOADER: {
      return { ...state, loading: action.payload };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return { ...state };
  }
};

export default department;
