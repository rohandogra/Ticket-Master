import * as types from "../constant";

const initialState = {
  modalType: "",
  modalProps: false,
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    default: {
      return { ...state };
    }
  }
};

export default modals;
