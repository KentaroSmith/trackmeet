import React, { Component } from "react";
import { Jumbotron, Button, ButtonGroup, Container, Row, Col } from 'reactstrap';
import "./style.css"

const logoImage = require("../../assets/trackmeet-logo-green.svg");

class HomePage extends Component {
    render() {
        return (
            <div id="home-page">
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col xs="12" sm="6">
                                <h1 className="display-3">TrackMeet</h1>
                                <p className="lead">Now you're booking it</p>
                                <hr className="my-2" />
                                <div id="homepage-btns">
                                    <ButtonGroup size="lg">
                                        <Button color="primary" href="/calendar">Calendar</Button>
                                        <Button color="primary" href="/search">Search</Button>
                                        <Button color="primary" href="/about">About</Button>
                                    </ButtonGroup>
                                </div>
                            </Col>  
                            <Col xs="12" sm="6">
                                <img src={logoImage} className="trackmeet-icon" alt="Trackmeet Icon"/>
                            </Col>
                        </Row>

                    </Container>
                </Jumbotron>

            </div>
        );
    }
}

export default HomePage;
