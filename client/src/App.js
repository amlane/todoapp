import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Tasks from "./components/Tasks";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <header />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" component={SignIn} />
      <PrivateRoute path="/tasks" component={Tasks} />
    </div>
  );
}

export default App;
