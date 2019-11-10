import React, { Component } from "react";
import app from "../../components/Firebase/firebase";
import Reservation from "../../components/reservation/index";
import { useSelector } from 'react-redux';
import {
    Button,
    Container, Row, Col
} from 'reactstrap';
import Navbar from '../../components/navbar/index';
import API from "../../utils/api";

class Reservations extends Component {

    state = {
        events: [],
    }

    componentDidMount() {
        this.loadReservations();
    };

    loadReservations = () => {
        API.getEvents()
            .then(res => {
                console.log(res.data);
                this.setState({
                    events: res.data
                });
            })
            .catch(err => console.log(err));
    };

    deleteReservation(id) {
        API.deleteEvent(id)
            .then(res => {
                console.log(res.data);
                this.loadReservations();
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <Row>
                        <Col size="md-12">
                            <h1>Active reservations ({this.state.events.length}):</h1>
                            {!this.state.events ||
                                this.state.events.map(event => (
                                    <div>
                                        <Reservation
                                            key={event._id}
                                            event={event}
                                            onDelete={() => this.deleteReservation(event._id)}
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