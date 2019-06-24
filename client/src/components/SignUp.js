import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../App.scss";

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

    axios
      .post("http://localhost:4700/auth/register", this.state)
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
      <section className="App-header">
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
            />
          </div>
          <button type="submit" className="signin-btn">
            Sign Up
          </button>
          <p className="new-user-signup">
            Already a User? <NavLink to="/signin">Log In</NavLink>
          </p>
        </form>
      </section>
    );
  }
}

export default SignUp;
