import * as types from "../constant";
import axios from "../../config/axios";
import { message } from "antd";

const getEmployees = (history) => (dispatch) => {
  dispatch({ type: types.EMPLOYEES_LOADER, payload: true });
  axios
    .get("/employees")
    .then((response) => {
      dispatch({ type: types.EMPLOYEES_LOADER, payload: false });
      dispatch({
        type: types.GET_EMPLOYEES,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createEmployees = (data) => (dispatch) => {
  // dispatch({ type: types.EMPLOYEES_LOADER, payload: true });
  axios
    .post("/employees", data)
    .then((response) => {
      message.success("Employee Created Successfully");
      dispatch(getEmployees());
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteEmployee = (id) => (dispatch) => {
  axios
    .delete(`/employees/${id}`)
    .then((_) => {
      message.success("Employee Deleted Successfully");
      dispatch(getEmployees());
    })
    .catch((err) => {
      console.log(err);
    });
};

const EmployeeById = (id) => (dispatch) => {
  dispatch({ type: types.EMPLOYEE_BY_ID_LOADER, payload: true });
  axios
    .get(`/employees/${id}`)
    .then((response) => {
      dispatch({ type: types.EMPLOYEE_BY_ID_LOADER, payload: false });
      dispatch({
        type: types.EMPLOYEE_BY_ID,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateEmployees = (id, data) => (dispatch) => {
  axios
    .put(`/employees/${id}`, data)
    .then((_) => {
      message.success("Employee Updated Successfully");
      dispatch(EmployeeById(id));
      dispatch(getEmployees());
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  getEmployees,
  createEmployees,
  deleteEmployee,
  EmployeeById,
  updateEmployees,
};
