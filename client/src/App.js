import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from "./pages/calendar"
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Calendar} />
        </div>
      </Router>
    );
  }
}

export default App;
