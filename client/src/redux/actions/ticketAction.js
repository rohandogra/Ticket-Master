import * as types from "../constant";
import axios from "../../config/axios";
import { message } from "antd";

const getTickets = () => (dispatch) => {
  dispatch({ type: types.TICKET_LOADER, payload: true });
  axios
    .get("/tickets?page=0&&limit=10")
    .then((response) => {
      dispatch({ type: types.TICKET_LOADER, payload: false });
      dispatch({
        type: types.GET_TICKETS,
        payload: response.data,
      });
    })
    .catch((err) => {
      message.error(err.message);
    });
};

const getTicketById = (id) => (dispatch) => {
  dispatch({ type: types.TICKET_BY_ID_LOADER, payload: true });
  axios
    .get(`/tickets/${id}`)
    .then((response) => {
      dispatch({ type: types.TICKET_BY_ID_LOADER, payload: false });
      dispatch({
        type: types.GET_TICKETBYID,
        payload: response.data,
      });
    })
    .catch((err) => {
      message.error(err.message);
    });
};

const createTicket = (data) => (dispatch) => {
  axios
    .post("/tickets", data)
    .then((_) => {
      message.success("Ticket Created Successfully.");
      dispatch(getTickets());
    })
    .catch((err) => {
      message.error(err.message);
    });
};

const updateTicket = (id, data) => (dispatch) => {
  console.log(id, data, "action");
  axios
    .put(`/tickets/${id}`, data)
    .then((_) => {
      message.success("Ticket Updated successfully");
      dispatch(getTickets());
    })
    .catch((err) => message.error(err.message));
};

const deleteTicket = (id) => (dispatch) => {
  axios
    .delete(`/tickets/${id}`)
    .then((_) => {
      message.success("Ticket Deleted successfully");
      dispatch(getTickets());
    })
    .catch((err) => message.error(err.message));
};

export { getTickets, getTicketById, createTicket, updateTicket, deleteTicket };
