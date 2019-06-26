import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";

import "../App.scss";

class AddTask extends React.Component {
  state = {
    task: "",
    user_id: localStorage.getItem("user_id")
  };

  handleSubmit = e => {
    e.preventDefault();
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axiosWithAuth()
      .post(`${prodURL}/tasks`, this.state)
      .then(res => {
        console.log(res);
        this.setState(
          {
            task: ""
          },
          () => this.props.getData()
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        add a new to do
        <form className="add-new-container" onSubmit={this.handleSubmit}>
          <input
            className="add-new-task"
            name="task"
            value={this.state.task}
            onChange={this.handleInput}
            required
          />
          <button className="add-btn">+</button>
        </form>
      </div>
    );
  }
}

export default AddTask;
