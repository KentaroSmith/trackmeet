import React, { useState, useEffect } from "react";
import app from "../../components/Firebase/firebase";
import Reservation from "../../components/reservation/index";
import { useSelector } from 'react-redux';
import {
    Button,
    Container, Row, Col
} from 'reactstrap';
import Navbar from '../../components/navbar/index';
import API from "../../utils/api";

const Reservations = () => {
    const user = useSelector(state => state.user);
    const [events, setEvents] = useState([]);

    console.log("the user is " + user.firstName)

    useEffect(
        () => {
            loadReservations();
        }, 
        []);

    const loadReservations = () => {
        API.getEventsByUser(user._id)
        .then(res => {
            console.log(res.data);
            setEvents(res.data);
        })
        .catch(err => console.log(err));

        /*API.getEvents()
            .then(res => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch(err => console.log(err));*/
    };

    const deleteReservation = (id) => {
        API.deleteEvent(id)
            .then(res => {
                console.log(res.data);
                loadReservations();
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Navbar />
            <Container>
                <Row>
                    <Col size="md-12">
                        <h1>Active reservations ({events.length}):</h1>
                        {!events ||
                            events.map(event => (
                                <div>
                                    <Reservation
                                        key={event._id}
                                        event={event}
                                        onDelete={() => deleteReservation(event._id)}
                                    />
                                </div>
                            ))}
                    </Col>
                </Row>
            </Container>
        </>
    );

};

export default Reservations;