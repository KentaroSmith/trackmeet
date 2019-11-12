import React, { useState, useEffect, useContext } from "react";
import app from "../../components/Firebase/firebase";
import Reservation from "../../components/reservation/index";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Container, Row, Col
} from 'reactstrap';
import Navbar from '../../components/navbar/index';
import API from "../../utils/api";
import { AuthContext } from "../../components/Firebase/auth";
import { updateUser } from "../../actions";

const Reservations = () => {
    const { currentUser } = useContext(AuthContext);
    const user = useSelector(state => state.user);
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();

    console.log("the user is " + currentUser.email)

    // loads once when the component mounts:
    useEffect(
        () => {
            // load user info into global state (Redux) if we haven't already
            getUserData(currentUser.email, (user) => {
                console.log(user);
                dispatch(updateUser(user));
                console.log(user);
                // load user data from database
                //loadReservations();
                API.getEventsByUser(user._id)
                    .then(res => {
                        console.log(res.data);
                        setEvents(res.data);
                    })
                    .catch(err => console.log(err));
            });
        },
        []);

    const getUserData = (email, callback) => {
        console.log("getting user for email: " + email);
        API.getUser(email)
            .then(res => {
                //console.log(res);
                console.log(res.data[0]);
                // now push the user data into global state
                callback(res.data[0]);
            })
            .catch(err => console.log(err));
    }

    const loadReservations = () => {
        console.log("loadReservations: " + user._id)
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