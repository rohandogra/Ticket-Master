import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import Register from "./components/userAuth/register.jsx";
import Login from "./components/userAuth/login";
import Dashboard from "./components/dashboard/Home.jsx";
import RootModal from "./components/modals/rootModal";
import { PrivateRoute } from "./components/utilityComponents/PrivateRoute";
import CustomersShow from "./components/customers/customersShow.jsx";
import DepartmentsShow from "./components/departments/DepartmentsShow";
import EmployeesShow from "./components/employees/EmployeesShow";
import TicketShow from "./components/tickets/TicketShow";
import loginOtp from "./components/userAuth/loginOtp";
import Otp from "./components/userAuth/Otp";

const location = window.location.pathname;
function App(props) {
  console.log(location);
  return (
    <Router>
      <RootModal />
      <div>
        <Switch>
          <Redirect from="/" to="/home" exact />
          <PrivateRoute path="/home" component={Dashboard} />
          <PrivateRoute
            path="/customers"
            component={CustomersShow}
            exact={true}
          />

          <PrivateRoute
            path="/departments"
            component={DepartmentsShow}
            exact={true}
          />

          <PrivateRoute
            path="/employees"
            component={EmployeesShow}
            exact={true}
          />

          <PrivateRoute path="/tickets" component={TicketShow} exact={true} />
          <Route path="/register" component={Register} exact={true} />

          <Route path="/login" component={Login} exact={true} />
          <Route path="/loginotp" component={loginOtp} exact={true} />
          <Route path="/otp" component={Otp} exact={true} />
        </Switch>
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(App);
