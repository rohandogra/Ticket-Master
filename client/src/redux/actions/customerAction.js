import * as types from "../constant";
import axios from "../../config/axios";
import { message } from "antd";

const getCustomers = (history) => (dispatch) => {
  dispatch({ type: types.CUSTOMERS_LOADER, payload: true });
  axios
    .get("/customers")
    .then((response) => {
      dispatch({ type: types.CUSTOMERS_LOADER, payload: false });
      dispatch({
        type: types.GET_CUSTOMERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCustomerById = (id) => (dispatch) => {
  dispatch({ type: types.CUSTOMERSBYID_LOADER, payload: true });
  axios
    .get(`/customers/${id}`)
    .then((response) => {
      dispatch({ type: types.CUSTOMERSBYID_LOADER, payload: false });
      dispatch({
        type: types.GET_CUSTOMERSBYID,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createCustomers = (formData, history) => (dispatch) => {
  axios
    .post("/customers", formData)
    .then((response) => {
      if (response) {
        dispatch(getCustomers());
        message.success("Customer Created Successfully");
      }
    })
    .catch((err) => {
      message.error(err.message);
    });
};

const deleteCustomer = (id) => (dispatch) => {
  axios
    .delete(`/customers/${id}`)
    .then((_) => {
      message.success("Customer Deleted Successfully");
      dispatch(getCustomers());
    })
    .catch((err) => {
      message.error(err.message);
    });
};

const updateCustomer = (data, id) => (dispatch) => {
  console.log(data, "updateCustomer");
  axios
    .put(`/customers/${id}`, data)
    .then((res) => {
      dispatch(getCustomerById(id));
      // dispatch(getCustomers());
    })
    .catch((err) => {
      message.error(err.message);
    });
};

export {
  getCustomers,
  createCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
};
