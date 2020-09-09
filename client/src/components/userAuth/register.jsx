import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { register } from '../../redux/actions/auth'
import "./auth.scss"

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
                <div className='input-wrapper mb-3'>
                  <label className=''>User Name</label>
                  <Field name='user_name' type='text' placeholder='Type your User Name' as={Input} prefix={<UserOutlined style={{
                    fontSize: 22,
                    color: '#adadad',
                  }} />} />
                </div>
                <div className='input-wrapper mb-3'>
                  <label className=''>Email</label>
                  <Field name='email' type='text' placeholder='Type your Email' as={Input} prefix={<MailOutlined style={{
                    fontSize: 22,
                    color: '#adadad',
                  }} />} />
                </div>
                <div className='input-wrapper mb-3'>
                  <label className=''>Mobile</label>
                  <Field name='mobile' type='text' placeholder='Type your Mobile Number' as={Input} prefix={<MobileOutlined style={{
                    fontSize: 22,
                    color: '#adadad',
                  }} />} />
                </div>
                <div className='input-wrapper'>
                  <label className=''>Password</label>
                  <Field name='password' type='password' placeholder="Type your password" as={Input} prefix={<LockOutlined style={{
                    fontSize: 22,
                    color: '#adadad',
                  }} />} />
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
              </Form>
              <div className='sign-up'>
                <Divider>Or Login</Divider>
                <Button className='float-right' onClick={() => props.history.push('/login')}>
                  Login
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default connect(null, { register })(withRouter(Register));
