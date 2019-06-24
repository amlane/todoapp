import React from "react";
import { Route, NavLink } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1>To Do App</h1>
      <nav>
        <NavLink to="/signup">Sign Up</NavLink>{" "}
        <NavLink to="/signin">Sign In</NavLink>{" "}
      </nav>
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
    </div>
  );
}

export default App;
