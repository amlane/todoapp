import React from "react";
import { Route, NavLink } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <h1>To Do App</h1>
        <nav>
          <NavLink to="/signup">Sign Up</NavLink>{" "}
          <NavLink to="/signin">Sign In</NavLink>{" "}
          <NavLink to="/tasks">Tasks</NavLink>{" "}
        </nav>
      </header>
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <PrivateRoute path="/tasks" component={Tasks} />
      <PrivateRoute path="/tasks" component={AddTask} />
    </div>
  );
}

export default App;
