import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { Route } from "react-router-dom";
import {} from "jquery.cookie";

class Body extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={LoginForm}></Route>
      </div>
    );
  }
}

export default Body;
