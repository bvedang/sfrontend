import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionTypes from "../../store/actions/index";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler";
import { LockOutlined } from "@material-ui/icons";
import style from "./SignIn.module.css";
class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const user = { ...this.state };
    let redirect = null;
    if (this.props.authenticated) {
      redirect = <Redirect to="/holder" />;
    }
    return (
      <div className={["col-sm-4 rounded ", style.Container].join(" ")}>
        <div className={["rounded-circle", style.LockedIcondiv].join(" ")}>
          <LockOutlined />
        </div>
        <div className={["dispaly-3", style.Heading].join(" ")}>
          <p>Log In</p>
        </div>
        <div className="form-group">
          <label htmlFor="emailInput">Email :</label>
          <input
            className={["form-control", style.InputField].join(" ")}
            id="emailInput"
            placeholder="Your Email"
            type="email"
            onChange={this.emailHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password :</label>
          <input
            className={["form-control", style.InputField].join(" ")}
            id="passwordInput"
            placeholder="Your Password"
            type="password"
            onChange={this.passwordHandler}
          />
        </div>
        <div className="form-group">
          <button
            onClick={() => this.props.onAuthenticated(user)}
            className={["btn btn-block", style.LogInButton].join(" ")}
          >
            Login
          </button>
        </div>
        {redirect}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticated: (user) => dispatch(actionTypes.authenticationInit(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(SignIn, axios));
