import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../App.scss";

class SignIn extends React.Component {
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
      .post("http://localhost:4700/auth/login", this.state)
      .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user.id);
        this.props.history.push("/tasks");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <header className="App-header">
        <form onSubmit={this.handleSubmit} className="login-form">
          <h2>Log In</h2>
          <div className="input-container">
            <label>username</label>
            <input
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
              value={this.state.password}
              type="password"
              required
              name="password"
              onChange={this.handleInput}
            />
          </div>
          <button type="submit" className="signin-btn">
            Log In
          </button>
          <p className="new-user-signup">
            Not a user yet? <NavLink to="/signin">Sign Up</NavLink>
          </p>
        </form>
      </header>
    );
  }
}

export default SignIn;
