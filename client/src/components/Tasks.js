import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";

class Tasks extends React.Component {
  state = {
    task: "",
    completed: null,
    user_id: null
  };

  componentDidMount() {
    const userId = localStorage.getItem("user_id");

    axiosWithAuth()
      .get(`http://localhost:4700/users/${userId}/tasks`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default Tasks;
