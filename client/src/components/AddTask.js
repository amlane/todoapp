import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";
import "../styles/Tasks.scss";
class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      user_id: localStorage.getItem("user_id")
    };
  }
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
      <form className="add-new-container" onSubmit={this.handleSubmit}>
        <input
          className="add-new-task"
          name="task"
          value={this.state.task}
          onChange={this.handleInput}
          placeholder={`What do you need to do today, ${this.props.user}?`}
          required
        />
        <button className="add-btn">+</button>
      </form>
    );
  }
}

export default AddTask;
