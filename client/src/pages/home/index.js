import React, { Component } from "react";
import { Jumbotron, Button, ButtonGroup, Image } from 'reactstrap';
import "./style.css"

const logoImage = require("../../assets/trackmeet-logo-white.svg");

class HomePage extends Component {
    render() {
        return (
            <div id="home-page">
                <Jumbotron>
                    <h1 className="display-3">TrackMeet</h1>
                    <p className="lead">Now you're booking it!</p>
                    <hr className="my-2" />
                    <ButtonGroup  size="lg">
                        <Button color="primary" href="/calendar">Schedule</Button>
                        <Button color="primary" href="/search">Search</Button>
                        <Button color="primary" href="/about">About</Button>
                    </ButtonGroup>
                </Jumbotron>
                <img src={logoImage} className="trackmeet-icon"/>
            </div>
        );
    }
}

export default HomePage;
