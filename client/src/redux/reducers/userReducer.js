import * as types from "../constant";

const initialState = {
  loading: false,
};

const userAuth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_LOADER: {
      return {
        loading: action.payload,
      };
    }

    default:
      return { ...state };
  }
};

export default userAuth;
