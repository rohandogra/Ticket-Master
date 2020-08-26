import * as types from "../constant";

const initialState = {
  tickets: [],
  ticket: {},
  loading: false,
  fetch: false,
};

const tickets = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TICKETS: {
      return { ...state, tickets: action.payload };
    }
    case types.GET_TICKETBYID: {
      return { ...state, ticket: action.payload };
    }
    case types.TICKET_LOADER: {
      return { ...state, loading: action.payload };
    }
    case types.TICKET_BY_ID_LOADER: {
      return { ...state, fetch: action.payload };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return { ...state };
  }
};

export default tickets;
