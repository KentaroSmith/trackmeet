import React, { Component } from "react";
import Navbar from '../components/navbar/index'
import { Jumbotron, Button } from 'reactstrap';

class HomePage extends Component {
    render() {
        return (
            <div className="Homediv">
                <Navbar />
                <Jumbotron>
                    <h1 className="display-3">TrackMeet</h1>
                    <p className="lead">Welcome to TrackMeet! The room scheduling app of the future!</p>
                    <hr className="my-2" />
                    <p className="lead">
                        <Button color="primary" href="/calendar">Schedule</Button>
                    </p>
                </Jumbotron>

            </div>
        );
    }
}

export default HomePage;
