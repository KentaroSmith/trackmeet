import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./pages/signup";
//import SignIn from "./pages/signin";
import LogIn from "./pages/login";
import Calendar from "./pages/calendar";
import Confirm from "./pages/confirm";
import HomePage from "./pages/home";
import { AuthProvider } from "./components/Firebase/auth";
import PrivateRoute from "./components/Firebase/PrivateRoute";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/calendar" component={Calendar} />
            <PrivateRoute exact path="/confirm" component={Confirm} />
            <Route exact path="/" component={HomePage} />
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
