import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import "./auth.scss";

function LoginOtp(props) {
  useEffect(() => {
    document.title = "Login";
  });

  return (
    <div className="login-form">
      <div className="login-card">
        <Formik
          initialValues={{ email: "", isOtp: true }}
          onSubmit={(values) => {
            localStorage.setItem("email", values.email);
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
                <div className="login-btn">
                  <div className="submit-login">
                    <Button htmlType="submit" type="primary" size="large">
                      Get Otp
                    </Button>
                  </div>
                  <Button
                    // loading={props.loading}
                    onClick={() => props.history.push("/login")}
                    type="primary"
                    size="large"
                  >
                    Or Login using Password
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.userAuth.loading,
});

export default connect(mapStateToProps, { login })(withRouter(LoginOtp));
