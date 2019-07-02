import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/Auth.scss";

class SignIn extends React.Component {
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
    console.log("creds", this.state.creds);
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axios
      .post(`${prodURL}/auth/login`, this.state.creds)
      .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user.id);
        this.props.history.push("/tasks");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <div className="auth-page">
        <header className="login-nav">
          <img src={logo} alt="" />
        </header>
        <form onSubmit={this.handleSubmit} className="login-form">
          <h2>Log In</h2>
          <div className="input-container">
            <label>username</label>
            <input
              className="auth-input"
              value={this.state.creds.username}
              type="text"
              required
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
              required
              name="password"
              onChange={this.handleInput}
              maxLength="16"
            />
          </div>
          <button type="submit" className="signin-btn">
            Submit
          </button>
          <p className="new-user-signup">
            Not a user yet? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
