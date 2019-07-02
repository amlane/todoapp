import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/Auth.scss";

class SignUp extends React.Component {
  state = {
    creds: {
      username: "",
      password: ""
    },
    errorMsg: ""
  };

  handleInput = e => {
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axios
      .post(`${prodURL}/auth/register`, this.state.creds)
      .then(res => {
        // console.log(res);
        this.setState({
          errorMsg: ""
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.saved.id);
        this.props.history.push("/tasks");
      })
      .catch(err => {
        console.log(err.response, err.response.status);
        this.setState({
          errorMsg:
            err.response.status === 400
              ? err.response.data.message
              : `This username already exists`
        });
      });
  };

  render() {
    return (
      <div className="auth-page">
        <header className="login-nav">
          <img src={logo} alt="" />
        </header>
        <form onSubmit={this.handleSubmit} className="login-form">
          <h2>Create Account</h2>
          <div className="input-container">
            <label>username</label>
            <input
              className="auth-input"
              value={this.state.creds.username}
              type="text"
              name="username"
              onChange={this.handleInput}
              maxLength="16"
            />
          </div>
          <div className="input-container">
            <label>password</label>
            <input
              className="auth-input"
              value={this.state.creds.password}
              type="password"
              name="password"
              onChange={this.handleInput}
              maxLength="16"
            />
          </div>
          {this.state.errorMsg !== "" ? (
            <p className="error">{this.state.errorMsg}</p>
          ) : null}
          <button type="submit" className="signin-btn">
            Submit
          </button>
          <p className="new-user-signup">
            Already a User? <NavLink to="/">Log In</NavLink>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
