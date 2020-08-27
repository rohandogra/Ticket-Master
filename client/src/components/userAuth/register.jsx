import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { register } from "../../redux/actions/auth";
import "./auth.scss";

function Register(props) {
  useEffect(() => {
    document.title = "Register";
  });
  return (
    <div className="login-form">
      <div className="login-card">
        <Formik
          initialValues={{ user_name: "", email: "", password: "", mobile: "" }}
          onSubmit={(values) => {
            props.register(values, props.history);
          }}
        >
          {({ handleSubmit }) => (
            <div className="login-form">
              <div className="login-text">Register</div>
              <Form onSubmit={handleSubmit}>
                <div className="input-wrapper mb-3">
                  <label className="">User Name</label>
                  <Field
                    className=""
                    name="user_name"
                    type="text"
                    placeholder="Type your User Name"
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
                <div className="input-wrapper mb-3">
                  <label className="">Mobile</label>
                  <Field
                    className=""
                    name="mobile"
                    type="number"
                    placeholder="Enter you're Mobile"
                    as={Input}
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
                  <Button htmlType="submit" type="primary" size="large">
                    Register
                  </Button>
                </div>
              </Form>
              <div className="sign-up">
                <div className="sign-up-text-1">Or Login</div>
                <div
                  className="sign-up-text-2"
                  onClick={() => props.history.push("/login")}
                >
                  Login
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default connect(null, { register })(withRouter(Register));
