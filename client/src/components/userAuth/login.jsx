import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter, Redirect, useLocation } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import * as Yup from "yup";
import "./auth.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("Password is Required")
});

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
            validationSchema={validationSchema}
            onSubmit={(values) => {
              props.login(values, props.history);
            }}
          >
            {({ handleSubmit }) => (
              <div className="login-form">
                <div className="login-text">Login</div>
                <Form onSubmit={handleSubmit}>
                  <div className="input-wrapper mb-3">
                    <div className='d-flex'>
                      <label className='float-right'>Email</label>
                      <ErrorMessage
                        name="email"
                        render={(msg) => <div className='ml-2' style={{ color: "red", fontSize: '12px', lineHeight: '2' }}>{`*${msg}`}</div>}
                      />
                    </div>
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
                    <div className='d-flex'>
                      <label>Password</label>
                      <ErrorMessage
                        name="password"
                        render={(msg) => <div className='ml-2' style={{ color: "red", fontSize: '12px', lineHeight: '2' }}>{`*${msg}`}</div>}
                      />
                    </div>
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
                  <Divider>Or Sign Up</Divider>
                  <Button
                    className="float-right"
                    onClick={() => props.history.push("/register")}
                  >
                    SIGN UP
                  </Button>
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
