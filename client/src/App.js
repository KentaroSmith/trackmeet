import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./pages/register";
import Calendar from "./pages/calendar";
import HomePage from "./pages/home";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
