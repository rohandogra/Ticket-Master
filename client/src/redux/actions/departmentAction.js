import * as types from "../constant";
import axios from "../../config/axios";
import { message } from "antd";

const getDepartments = () => (dispatch) => {
  dispatch({ type: types.DEPARTMENT_LOADER, payload: true });
  axios
    .get("/departments")
    .then((res) => {
      dispatch({ type: types.DEPARTMENT_LOADER, payload: false });
      dispatch({
        type: types.GET_DEPARTMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createDepartment = (data) => (dispatch) => {
  axios
    .post("/departments", data)
    .then((_) => {
      dispatch(getDepartments());
      message.success("Department Created Successfully");
    })
    .catch((err) => {
      message.error(err.message);
    });
};

const deleteDepartment = (id) => (dispatch) => {
  axios
    .delete(`/departments/${id}`)
    .then((_) => {
      dispatch(getDepartments());
      message.success("Department Deleted Successfully");
    })
    .catch((err) => {
      message.error(err.message);
    });
};

export { getDepartments, createDepartment, deleteDepartment };
