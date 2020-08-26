import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter, Redirect, useLocation } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import "./auth.scss";

function Login(props) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    document.title = "Login";
  });

  return (
    <div className="login-form">
      {!token ? (
        <div className="login-card">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              props.login(values, props.history);
            }}
          >
            {({ handleSubmit }) => (
              <div className="login-form">
                <div className="login-text">Login</div>
                <Form onSubmit={handleSubmit}>
                  <div className="input-wrapper mb-3">
                    <label className="">Email</label>
                    <Field
                      className=""
                      name="email"
                      type="text"
                      placeholder="Type your Email"
                      as={Input}
                      prefix={
                        <UserOutlined
                          style={{
                            fontSize: 22,
                            color: "#adadad",
                          }}
                        />
                      }
                    />
                  </div>
                  <div className="input-wrapper">
                    <label className="">Password</label>
                    <Field
                      className=""
                      name="password"
                      type="password"
                      placeholder="Type your password"
                      as={Input}
                      prefix={
                        <LockOutlined
                          style={{
                            fontSize: 22,
                            color: "#adadad",
                          }}
                        />
                      }
                    />
                  </div>
                  <div className="login-btn">
                    <div className="submit-login">
                      <Button
                        loading={props.loading}
                        htmlType="submit"
                        type="primary"
                        size="large"
                      >
                        Login
                      </Button>
                    </div>
                    <Button
                      onClick={() => props.history.push("/loginotp")}
                      type="primary"
                      size="large"
                    >
                      Or Login using Otp
                    </Button>
                  </div>
                </Form>
                <div className="sign-up">
                  <div className="sign-up-text-1">Or Sign Up</div>
                  <div
                    className="sign-up-text-2"
                    onClick={() => props.history.push("/register")}
                  >
                    SIGN UP
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      ) : (
        <Redirect to={`${location.pathname}`} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.userAuth.loading,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
