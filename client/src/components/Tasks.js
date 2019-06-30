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
    },
    completedTask: {
      completed: null
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
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.editTask(this.state.newTask, this.state.id);
  };

  editTask = (updatedTask, id) => {
    // console.log("new task", updatedTask);
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axiosWithAuth()
      .put(`${prodURL}/tasks/${id}`, updatedTask)
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

  markComplete = id => {
    this.setState(
      {
        completedTask: {
          completed: true
        }
      },
      () => this.toggleComplete(this.state.completedTask, id)
    );
  };

  toggleComplete = (completedTask, id) => {
    // const devURL = "http://localhost:4700/";
    const prodURL = "https://master-tasker.herokuapp.com";
    axiosWithAuth()
      .put(`${prodURL}/tasks/${id}`, completedTask)
      .then(res => {
        console.log(res);
        this.setState({
          completedTask: {
            completed: null
          }
        });
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
    return (
      <div className="task-page">
        <nav className="logout-nav">
          <h3>Let's accomplish your goals, {this.state.user}.</h3>
          <button className="logout-btn" onClick={this.logout}>
            logout
          </button>
        </nav>
        <ul>
          {this.state.tasks.map(task => {
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
                  <div className="todo-container">
                    <input
                      type="checkbox"
                      className="completed"
                      onClick={() => this.markComplete(task.id)}
                    />
                    <li key={task.id}>{task.task}</li>
                  </div>
                )}
                <div className="emoji-container">
                  <i
                    className="fas fa-pencil-alt"
                    onClick={
                      this.state.id
                        ? this.handleSubmit
                        : () => this.startEdit(task.id)
                    }
                  />{" "}
                  {this.state.id && this.state.id === task.id ? (
                    <i
                      className="far fa-trash-alt"
                      onClick={() => this.deleteTask(task.id)}
                    />
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
