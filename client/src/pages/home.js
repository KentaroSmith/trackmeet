import React, { Component } from "react";
import { Jumbotron, Button, ButtonGroup } from 'reactstrap';

class HomePage extends Component {
    render() {
        return (
            <div className="Homediv">
                <Jumbotron>
                    <h1 className="display-3">TrackMeet</h1>
                    <p className="lead">Now you're booking it!</p>
                    <hr className="my-2" />
                    <ButtonGroup className="lead" size="lg">
                        <Button color="primary" href="/calendar">Schedule</Button>
                        <Button color="primary" href="/search">Search</Button>
                        <Button color="primary" href="/about">About</Button>
                    </ButtonGroup>
                </Jumbotron>

            </div>
        );
    }
}

export default HomePage;
