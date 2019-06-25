import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";
import AddTask from "../components/AddTask";

import "../App.scss";

class Tasks extends React.Component {
  state = {
    user: "",
    tasks: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
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
  };

  deleteTask = id => {
    axiosWithAuth()
      .delete(`http://localhost:4700/tasks/${id}`)
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h3>What do you need to do today, {this.state.user}?</h3>
        <ul>
          {this.state.tasks.map(task => {
            return (
              <li key={task.id} className="todo">
                {task.task}{" "}
                <i
                  className="far fa-trash-alt"
                  onClick={() => this.deleteTask(task.id)}
                />
              </li>
            );
          })}
        </ul>
        <AddTask getData={this.getData} />
      </div>
    );
  }
}

export default Tasks;
