import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from "./pages/calendar";
import HomePage from "./pages/home";
import RoomSearch from "./pages/search";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search" component={RoomSearch} />
        </div>
      </Router>
    );
  }
}

export default App;
