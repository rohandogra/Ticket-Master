import { combineReducers } from "redux";
import customers from "./customerReducer";
import department from "../reducers/departmentReducer";
import modals from "../reducers/modalsReducers";
import userAuth from "../reducers/userReducer";
import employee from "../reducers/employeeReducer";
import tickets from "../reducers/ticketReducer";

const rootReducer = combineReducers({
  customers,
  department,
  modals,
  userAuth,
  employee,
  tickets,
});
export default rootReducer;
