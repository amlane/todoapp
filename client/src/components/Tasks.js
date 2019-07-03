import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";
import { withRouter } from "react-router-dom";
import AddTask from "../components/AddTask";
import "../styles/Tasks.scss";

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
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    const userId = localStorage.getItem("user_id");
    axiosWithAuth()
      .get(`${prodURL}/users/${userId}/tasks`)
      .then(res => {
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
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axiosWithAuth()
      .delete(`${prodURL}/tasks/${id}`)
      .then(res => {
        this.setState(
          {
            id: null
          },
          () => this.getData()
        );
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

  handleEditInput = e => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.editTask(this.state.newTask, this.state.id);
  };

  editTask = (updatedTask, id) => {
    // const devURL = "http://localhost:4700/";
    // if (this.state.task === "") return;
    const prodURL = "https://master-tasker.herokuapp.com";
    axiosWithAuth()
      .put(`${prodURL}/tasks/${id}`, updatedTask)
      .then(res => {
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

  toggleComplete = (task, id) => {
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axiosWithAuth()
      .put(`${prodURL}/tasks/${id}`, {
        ...task,
        completed: !task.completed
      })
      .then(res => {
        this.getData();
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    this.props.history.push("/");
  };

  render() {
    console.log(this.state.tasks);
    return (
      <div className="task-page">
        <nav className="logout-nav">
          <h3>Let's accomplish your goals, {this.state.user}.</h3>
          <button className="logout-btn" onClick={this.logout}>
            logout
          </button>
        </nav>
        <ul>
          {this.state.tasks
            .sort(function(a, b) {
              return b.id - a.id; // keeps to dos from changing order when this.getData is invoked
            })
            .map(task => {
              return (
                <div className="todo">
                  {this.state.id && this.state.id === task.id ? (
                    <input
                      className="edit-input"
                      name="task"
                      value={this.state.newTask.task}
                      defaultValue={task.task}
                      onChange={this.handleEditInput}
                      maxLength="160"
                      required
                    />
                  ) : (
                    <div className="todo-container" key={task.id}>
                      <div>
                        <div
                          className={
                            task.completed ? "checked checkbox" : `checkbox`
                          }
                          onClick={() => this.toggleComplete(task, task.id)}
                        />
                      </div>
                      <li className={task.completed ? `completed` : null}>
                        {task.task}
                      </li>
                    </div>
                  )}
                  <div className="btn-container">
                    <button
                      className="edit"
                      onClick={
                        this.state.id
                          ? this.handleSubmit
                          : () => this.startEdit(task.id)
                      }
                    >
                      {this.state.id ? `save` : `edit`}
                    </button>
                    {this.state.id && this.state.id === task.id ? (
                      <button
                        className="delete"
                        onClick={() => this.deleteTask(task.id)}
                      >
                        x
                      </button>
                    ) : null}
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

export default withRouter(Tasks);
