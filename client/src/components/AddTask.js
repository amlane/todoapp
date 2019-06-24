import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";

import "../App.scss";

class AddTask extends React.Component {
  render() {
    return (
      <div>
        add a new to do
        <form>
          <input className="add-new-task" />
          <button className="add-btn">+</button>
        </form>
      </div>
    );
  }
}

export default AddTask;
