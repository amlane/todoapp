import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";
import AddTask from "../components/AddTask";

import "../App.scss";

class Tasks extends React.Component {
  state = {
    user: "",
    tasks: [],
    id: null,
    newTask: {
      task: "",
      user_id: null
    }
  };

  componentDidMount() {
    this.getData();
    this.setState({
      newTask: {
        user_id: localStorage.getItem("user_id")
      }
    });
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
        this.getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  startEdit = id => {
    this.setState({
      id: id
    });
  };

  handleInput = e => {
    this.setState({
      newTask: {
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.editTask(this.state.newTask, this.state.id);
  };

  editTask = (updatedTask, id) => {
    console.log("new task", updatedTask);
    axiosWithAuth()
      .put(`http://localhost:4700/tasks/${id}`, updatedTask)
      .then(res => {
        console.log(res);
        this.setState(
          {
            id: null,
            newTask: {
              task: ""
            }
          },
          () => this.getData()
        );
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <div>
        <h3>What do you need to do today, {this.state.user}?</h3>
        <ul>
          {this.state.tasks.map(task => {
            return (
              <div className="todo">
                {this.state.id && this.state.id === task.id ? (
                  <input
                    placeholder={task.task}
                    name="task"
                    value={this.state.newTask.task}
                    onChange={this.handleInput}
                  />
                ) : (
                  <li key={task.id}>{task.task}</li>
                )}
                <div>
                  <i
                    className="fas fa-pencil-alt"
                    onClick={
                      this.state.id
                        ? this.handleSubmit
                        : () => this.startEdit(task.id)
                    }
                  />{" "}
                  <i
                    className="far fa-trash-alt"
                    onClick={() => this.deleteTask(task.id)}
                  />
                </div>
              </div>
            );
          })}
        </ul>
        <AddTask getData={this.getData} />
      </div>
    );
  }
}

export default Tasks;
