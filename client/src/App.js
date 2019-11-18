import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import Calendar from "./pages/calendar";
import Confirm from "./pages/confirm";
import HomePage from "./pages/home";
import RoomSearch from "./pages/search";
import Reservations from "./pages/reservations";
import Rooms from "./pages/rooms";
import AboutUs from "./pages/about";
import { AuthProvider } from "./components/Firebase/auth";
import PrivateRoute from "./components/Firebase/PrivateRoute";
import Navbar from './components/navbar';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/calendar" component={Calendar} />
            <PrivateRoute exact path="/confirm" component={Confirm} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/search" component={RoomSearch} />
            <PrivateRoute exact path="/reservations" component={Reservations} />
            <Route exact path="/about" component={AboutUs} />
            <PrivateRoute exact path="/rooms" component={Rooms} />
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
