import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import "./otp.css";
import { withRouter } from "react-router-dom";

const Otp = (props) => {
  let [otp, setOtp] = useState("");
  const [numInputs, setNumInputs] = useState(4);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const clearOtp = () => {
    setOtp((otp = ""));
  };

  const handleSubmit = (e) => {
    const email = localStorage.getItem("email");
    e.preventDefault();
    props.login({ email: email, otp: otp }, props.history);
  };

  return (
    <div className="container__cust">
      <div className="view">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <p>Enter verification code</p>
            <div className="margin-top--small">
              <OtpInput
                inputStyle="inputStyle"
                numInputs={6}
                isDisabled={isDisabled}
                errorStyle="error"
                onChange={handleOtpChange}
                separator={<span>-</span>}
                isInputNum={true}
                shouldAutoFocus
                value={otp}
              />
            </div>
            <div className="btn-row">
              <button
                className="btn margin-top--large"
                type="button"
                disabled={isDisabled}
                onClick={clearOtp}
              >
                Clear
              </button>
              <button
                className="btn margin-top--large"
                disabled={otp.length < numInputs}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { login })(withRouter(Otp));
