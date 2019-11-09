import React, { Component } from "react";
import app from "../../components/Firebase/firebase";
import Reservation from "../../components/reservation/index";
import { useSelector } from 'react-redux';
import {
    Button, Form, FormGroup, Input,
    Card, CardImg, CardBody, CardTitle, CardText,
    Container, Row, Col
} from 'reactstrap';
import Navbar from '../../components/navbar/index';
import API from "../../utils/api";

const getReservations = () => {
    console.log("getting all reservations");

    // GET reservations from database
    API.getEvents()
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => console.log(err));
};

class Reservations extends Component {

    state = {
        events: [],
    }

    componentDidMount() {
        /*this.setState({
            events: getReservations()
        })
        console.log("new state");
        console.log(this.state.events);*/

        API.getEvents()
            .then(res => {
                console.log(res.data);
                this.setState({
                    events: res.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <Row>
                        <Col size="md-12">
                            <h1>Active reservations:</h1>
                            {!this.state.events ||
                                this.state.events.map(event => (
                                    <div>
                                        <Reservation
                                            key={event._id}
                                            event={event}
                                        />
                                    </div>
                                ))}
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
};

export default Reservations;