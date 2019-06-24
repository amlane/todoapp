import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";

import "../App.scss";

class Tasks extends React.Component {
  state = {
    user: "",
    tasks: []
  };

  componentDidMount() {
    const userId = localStorage.getItem("user_id");

    axiosWithAuth()
      .get(`http://localhost:4700/users/${userId}/tasks`)
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data.username,
          tasks: res.data.tasks
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <div>
        <h3>What do you need to do today, {this.state.user}?</h3>
        <ul>
          {this.state.tasks.map(task => {
            return <li key={task.id}>{task.task}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Tasks;
