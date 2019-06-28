import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/Auth.scss";

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axios
      .post(`${prodURL}/auth/register`, this.state)
      .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.saved.id);
        this.props.history.push("/tasks");
      })
      .catch(err => {
        console.log(err);
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
              value={this.state.username}
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
              value={this.state.password}
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
            Already a User? <NavLink to="/">Log In</NavLink>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
