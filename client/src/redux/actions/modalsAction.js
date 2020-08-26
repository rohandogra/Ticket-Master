import { SHOW_MODAL } from "../constant";

const showModal = (data) => (dispatch) => {
  return dispatch({
    type: SHOW_MODAL,
    payload: data,
  });
};

export { showModal };
