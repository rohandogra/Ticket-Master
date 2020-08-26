import axios from "../../config/axios";
import { message } from "antd";
import * as types from "../constant";

const login = (loginData, history) => async (dispatch) => {
  console.log(loginData, "action");
  dispatch({ type: types.LOGIN_LOADER, payload: true });
  try {
    if (loginData.email && loginData.isOtp) {
      const res = await axios.post("/login", loginData);
      console.log(res, "action");
      dispatch({ type: types.LOGIN_LOADER, payload: false });
      message.success("Otp Sent Successfully");
      history.push("/otp");
    }
    if (loginData.otp && loginData.email) {
      const res = await axios.post("/login", loginData);
      console.log(res, "action");
      dispatch({ type: types.LOGIN_LOADER, payload: false });
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("email");
      message.success("Successfully Logged in");
      history.push("/");
    }
    if (loginData.email && loginData.password) {
      const res = await axios.post("/login", loginData);
      console.log(res, "action");
      dispatch({ type: types.LOGIN_LOADER, payload: false });
      localStorage.setItem("token", res.data.token);
      message.success("Successfully Logged in");
      history.push("/");
    }
  } catch (e) {
    dispatch({ type: types.LOGIN_LOADER, payload: false });
    if (e.response) return message.error(e.response.data);
    console.log(e);
  }
};

const register = async (userData, history) => {
  console.log(userData);
  try {
    await axios.post("/register", userData);
    message.success("Register Successfully");
    history.push("/login");
  } catch (err) {
    console.log(err);
    if (err.response) return message.error(err.response.data);
  }
};

const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  message.success("Logged out Successfully.");
  dispatch({ type: "RESET" });
};

export { login, register, logout };
